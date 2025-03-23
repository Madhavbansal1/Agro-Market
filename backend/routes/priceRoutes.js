const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const router = express.Router();

router.get("/predict-price", async (req, res) => {
    const { commodity, currentPrice } = req.query;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!commodity || !currentPrice) {
        return res.status(400).json({ error: "Please provide both commodity and currentPrice." });
    }

    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${apiKey}`;

    const requestData = {
        contents: [
            {
                parts: [
                    {
                        text: `Predict the price of ${commodity} for next month based on the current price of ₹${currentPrice}. Return only the estimated price in JSON format like: {"predicted_price": 2600}. No extra text.`
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

        const data = await response.json();

        if (!data.candidates || data.candidates.length === 0) {
            return res.status(500).json({ error: "Failed to generate prediction", details: data });
        }

        // Extract raw response text
        let rawText = data.candidates[0].content.parts[0].text;

        // Clean up JSON (Remove backticks and whitespace)
        rawText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();

        // Parse the cleaned response
        let predictedData;
        try {
            predictedData = JSON.parse(rawText);
        } catch (error) {
            return res.status(500).json({ error: "Failed to parse price prediction", rawResponse: rawText });
        }

        res.json(predictedData); // Send structured response
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch price prediction", details: error.message });
    }
});

module.exports = router;
