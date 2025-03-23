import { useState } from "react";
import axios from "axios";

const CropPredictor = () => {
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: "",
    pH: "",
    rainfall: "",
  });

  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePredict = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("http://localhost:9000/api/predict-crop", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.predicted_crops) {
        setPredictions(response.data.predicted_crops);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("❌ Error fetching prediction:", error);
      setError("Failed to get predictions. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">🌾 Crop Prediction </h2>

      {/* Input Fields */}
      {Object.keys(formData).map((key) => (
        <input
          key={key}
          type="number"
          name={key}
          value={formData[key]}
          onChange={handleChange}
          placeholder={`Enter ${key}`}
          className="w-full p-2 border rounded-md mb-2"
        />
      ))}

      {/* Predict Button */}
      <button
        onClick={handlePredict}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full"
      >
        {loading ? "Predicting..." : "Predict Crop"}
      </button>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Prediction Results */}
      {predictions.length > 0 && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <p className="text-lg font-semibold">🌱 Suggested Crops:</p>
          <ul className="list-disc ml-4">
            {predictions.map((crop, index) => (
              <li key={index} className="text-green-700 font-medium">{crop}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CropPredictor;
