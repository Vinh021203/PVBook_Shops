import React, { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { logos } from "../assets/assets";

const FruitGallery = () => {
  const [currentFruitIndex, setCurrentFruitIndex] = useState(0);

  const fruits = [
    {
      name: "Apple",
      image: logos.apple,
    },
    {
      name: "Orange",
      image: logos.orange,
    },
    {
      name: "Banana",
      image: logos.apple,
    },
    {
      name: "Strawberry",
      image: logos.orange,
    },
    {
      name: "Mango",
      image: logos.apple,
    },
    {
      name: "Pineapple",
      image: logos.orange,
    },
    {
      name: "Watermelon",
      image: logos.apple,
    },
    {
      name: "Grapes",
      image: logos.orange,
    },
    {
      name: "Blueberry",
      image: logos.apple,
    },
    {
      name: "Peach",
      image: logos.apple,
    },
  ];

  const fruitsToShow = 6; // Number of fruits to display at a time

  const displayedFruits = fruits.slice(currentFruitIndex, currentFruitIndex + fruitsToShow);

  const nextFruit = () => {
    setCurrentFruitIndex((prev) => (prev + fruitsToShow) % fruits.length);
  };

  const prevFruit = () => {
    setCurrentFruitIndex((prev) => (prev - fruitsToShow + fruits.length) % fruits.length);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Title and Navigation */}
      <div className="flex items-center justify-between mb-6 border-b-2 border-gray-300 pb-2">
        <h1 className="text-3xl font-bold text-gray-800">Fresh Fruits</h1>
        <div className="flex space-x-2">
          <button
            onClick={prevFruit}
            className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-transform transform hover:scale-110"
          >
            <BsChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextFruit}
            className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-transform transform hover:scale-110"
          >
            <BsChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Fruit Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4 overflow-hidden">
        {displayedFruits.map((fruit, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={fruit.image} alt={fruit.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{fruit.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FruitGallery;
