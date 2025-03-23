const express = require("express");
require("dotenv").config();

const router = express.Router();
router.use(express.json());

router.post("/predict-crop", async (req, res) => {
    const { nitrogen, phosphorus, potassium, temperature, humidity, pH, rainfall } = req.body;
    console.log("✅ Received Input:", req.body);

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: "Gemini API key is missing" });
    }

    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${apiKey}`;

    const requestData = {
        contents: [
            {
                role: "user",
                parts: [
                    {
                        text: `Given the following soil and environmental conditions:
                        - Nitrogen: ${nitrogen}
                        - Phosphorus: ${phosphorus}
                        - Potassium: ${potassium}
                        - Temperature: ${temperature}°C
                        - Humidity: ${humidity}%
                        - pH Level: ${pH}
                        - Rainfall: ${rainfall} mm

                        Suggest at least 5 crops that will grow well in these conditions. Return the data in **JSON format** like:
                        {
                            "predicted_crops": ["Wheat", "Rice", "Maize", "Barley", "Soybean"]
                        }
                        Do not include any extra text, just return pure JSON output.`
                    }
                ]
            }
        ]
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Gemini API error: ${JSON.stringify(errorData)}`);
        }

        const responseData = await response.json();
        console.log("🌟 API Response:", responseData);

        if (!responseData.candidates || responseData.candidates.length === 0) {
            return res.status(500).json({ error: "No valid response from AI", details: responseData });
        }

        let rawText = responseData.candidates[0].content.parts[0].text || "";
        console.log("Raw AI Output:", rawText);

        // Remove unnecessary JSON formatting characters
        rawText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();

        let predictedData;
        try {
            predictedData = JSON.parse(rawText);
        } catch (error) {
            return res.status(500).json({ error: "Parsing error", rawResponse: rawText });
        }

        res.json(predictedData);
    } catch (error) {
        console.error("❌ Error Fetching Prediction:", error.message);
        res.status(500).json({ error: "Gemini API error", details: error.message });
    }
});

module.exports = router;
