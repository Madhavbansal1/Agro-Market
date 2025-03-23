import React, { useEffect, useState } from "react";
import ImageCarousel from "../components/ImageCarousel";
import { CarouselImages } from "../assets/images";
import { apiHelper } from "../utils/utils";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const [uname, setUname] = useState(null);
  const nav = useNavigate();

  const content =
    "Agro Market is a web application that helps farmers and businessmen interact directly without any mediator. This system ensures that farmers receive fair prices for their crops.";

  useEffect(() => {
    apiHelper.get("/api/username").then((res) => setUname(res.data));
  }, []);

  if (uname == null) {
    return <h1 className="text-center text-xl font-semibold">Loading...</h1>;
  }

  return (
    <div className="flex flex-col items-center px-4 md:px-10 lg:px-20 py-10 gap-10 pt-[12vh]">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full">
        {/* Text Section */}
        <div className="w-full md:w-1/2 flex flex-col gap-4 text-center md:text-left">
          <h1 className="text-3xl font-semibold">
            Hi, <span className="text-green-600">{uname.name}</span>
          </h1>
          <h2 className="text-4xl font-semibold">
            Welcome to <span className="text-green-600">Agro Market</span>
          </h2>
          <p className="text-lg">{content}</p>
          <button
            onClick={() => nav("/agroproducts")}
            className="self-center md:self-start px-5 py-3 border border-green-600 rounded-md text-xl font-semibold text-green-600 w-[60%] md:w-[45%] hover:bg-green-600 hover:text-white transition-all"
          >
            Explore Agro Products
          </button>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 mt-6 md:mt-0">
          <ImageCarousel images={CarouselImages} className="h-[300px] md:h-[400px]" />
        </div>
      </div>

      {/* Moral Value Section */}
      <div className="bg-green-100 p-6 md:p-10 rounded-lg text-center shadow-lg w-full">
        <h2 className="text-2xl md:text-3xl font-semibold text-green-700">
          "A farmer is the backbone of a nation."
        </h2>
        <p className="text-lg mt-2 text-gray-700">
          Every seed sown by a farmer is a hope for a better tomorrow. By
          supporting fair trade and direct access to markets, we empower those
          who feed us. Let’s respect their hard work and ensure they get what
          they truly deserve.
        </p>
      </div>

      {/* Why Choose Us? Section */}
      <div className="w-full flex flex-col items-center text-center">
        <h2 className="text-3xl font-semibold text-green-700">
          Why Choose <span className="text-green-600">Agro Market?</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 w-full">
          <div className="p-5 bg-white shadow-md rounded-md">
            <h3 className="text-xl font-semibold text-green-600">Fair Pricing</h3>
            <p className="text-gray-600">
              No middlemen, no unfair cuts. Farmers get the price they truly
              deserve for their hard work.
            </p>
          </div>
          <div className="p-5 bg-white shadow-md rounded-md">
            <h3 className="text-xl font-semibold text-green-600">Direct Selling</h3>
            <p className="text-gray-600">
              Buyers and sellers connect directly, ensuring transparency in
              trade.
            </p>
          </div>
          <div className="p-5 bg-white shadow-md rounded-md">
            <h3 className="text-xl font-semibold text-green-600">Empowering Farmers</h3>
            <p className="text-gray-600">
              Our platform provides farmers with knowledge, support, and
              resources to grow their business.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
