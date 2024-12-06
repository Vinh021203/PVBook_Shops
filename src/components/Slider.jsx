import React, { useEffect, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import {asset} from "../assets/assets";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: "Books Collection",
    },
    {
      title: "Reading Time",
    },
    {
      title: "Library",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };
  return (
    <div className="relative w-full h-[300px] md:h-[500px]">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img src={asset.slider1} alt={slide.title} className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 md:p-6">
            <h2 className="text-white text-xl md:text-3xl font-bold">{slide.title}</h2>
          </div>
        </div>
      ))}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 p-1 md:p-2 rounded-full"
      >
        <BsChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 p-1 md:p-2 rounded-full"
      >
        <BsChevronRight className="w-4 h-4 md:w-6 md:h-6 text-white" />
      </button>
    </div>
  );
};

export default Slider;
