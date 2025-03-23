import { useState } from "react";

const PricePrediction = () => {
    const [commodity, setCommodity] = useState("");
    const [currentPrice, setCurrentPrice] = useState("");
    const [predictedPrice, setPredictedPrice] = useState(null);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!commodity || !currentPrice) {
            setError("Please enter both commodity and price.");
            return;
        }

        setError("");
        setPredictedPrice(null);

        try {
            const response = await fetch(
                `http://localhost:9000/api/predict-price?commodity=${commodity}&currentPrice=${currentPrice}`
            );

            const data = await response.json();
            console.log(data);

            if (data.predicted_price) {
                setPredictedPrice(data.predicted_price);
            } else {
                setError("Prediction failed. Try again.");
            }
        } catch (err) {
            setError("Server error. Try again later.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <h2 className="text-2xl font-bold mb-4">Price Prediction</h2>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <div className="mb-4">
                    <label className="block text-gray-700">Commodity:</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded mt-1"
                        value={commodity}
                        onChange={(e) => setCommodity(e.target.value)}
                        placeholder="Enter commodity (e.g., Wheat)"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Current Price (₹):</label>
                    <input
                        type="number"
                        className="w-full p-2 border rounded mt-1"
                        value={currentPrice}
                        onChange={(e) => setCurrentPrice(e.target.value)}
                        placeholder="Enter current price (e.g., 2500)"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
                >
                    Predict Price
                </button>
            </form>

            {predictedPrice !== null && (
                <div className="mt-4 p-4 bg-green-200 text-green-800 rounded">
                    <strong>Predicted Price:</strong> ₹{predictedPrice}
                </div>
            )}

            {error && (
                <div className="mt-4 p-4 bg-red-200 text-red-800 rounded">
                    <strong>Error:</strong> {error}
                </div>
            )}
        </div>
    );
};

export default PricePrediction;
