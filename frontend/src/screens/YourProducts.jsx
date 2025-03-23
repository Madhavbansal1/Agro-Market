import React, { useEffect, useState } from "react";
import { apiHelper } from "../utils/utils";
import YourProductsCard from "../components/YourProductsCard";

function YourProducts() {
  const [msg, setMsg] = useState("Loading...");
  const [agro, setAgro] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    apiHelper
      .get("/api/products/myproducts")
      .then((response) => {
        setAgro(response.data);
        if (response.data.length === 0) {
          setMsg("No Products Found...");
        }
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setMsg("Failed to fetch products. Please try again.");
      });
  };

  if (agro.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <h1 className="text-2xl font-semibold text-gray-700">{msg}</h1>
      </div>
    );

  return (
    <div className="px-4 md:px-10 lg:px-40 mt-5 mb-10">
      <h1 className="text-3xl font-semibold text-center text-green-700 mb-6">
        Your Listed Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {agro.map((agrol) => (
          <YourProductsCard
            key={agrol._id}
            agrol={agrol}
            onDelete={fetchProducts} // Directly passing fetchProducts for refresh
          />
        ))}
      </div>
    </div>
  );
}

export default YourProducts;
