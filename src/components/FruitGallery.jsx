import React, { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const FruitGallery = () => {
  const [currentFruitIndex, setCurrentFruitIndex] = useState(0);

  const fruits = [
    {
      name: "Apple",
      image: "https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a",
    },
    {
      name: "Orange",
      image: "https://images.unsplash.com/photo-1557800636-894a64c1696f",
    },
    {
      name: "Banana",
      image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224",
    },
    {
      name: "Strawberry",
      image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6",
    },
    {
      name: "Mango",
      image: "https://images.unsplash.com/photo-1553279768-865429fa0078",
    },
    {
      name: "Pineapple",
      image: "https://images.unsplash.com/photo-1560807707-8cc77767d783",
    },
    {
      name: "Watermelon",
      image: "https://images.unsplash.com/photo-1514537099923-e399378c2232",
    },
    {
      name: "Grapes",
      image: "https://images.unsplash.com/photo-1578836537282-3171040b7d71",
    },
    {
      name: "Blueberry",
      image: "https://images.unsplash.com/photo-1514996937319-344454492b37",
    },
    {
      name: "Peach",
      image: "https://images.unsplash.com/photo-1620813091289-5ab8482c7c79",
    },
  ];

  const fruitsToShow = 6; // Number of fruits to display at a time

  const displayedFruits = fruits.slice(
    currentFruitIndex,
    currentFruitIndex + fruitsToShow
  );

  const nextFruit = () => {
    setCurrentFruitIndex(
      (prev) => (prev + fruitsToShow) % fruits.length
    );
  };

  const prevFruit = () => {
    setCurrentFruitIndex(
      (prev) =>
        (prev - fruitsToShow + fruits.length) % fruits.length
    );
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
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={fruit.image}
              alt={fruit.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {fruit.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FruitGallery;
