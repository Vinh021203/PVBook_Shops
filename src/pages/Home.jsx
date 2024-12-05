import React, { useState, useEffect } from "react";
import Slider from "../components/Slider"; // Nếu Slider nằm trong src/components
import FruitGallery from "../components/FruitGallery"; // Nếu FruitGallery nằm trong src/components
import MemorableProductDisplay from "../components/MemorableProductDisplay";
import BookDisplay from "../components/BookDisplay";

const Home = () => {

  const [currentSlide, setCurrentSlide] = useState(0);


  const slides = [
    {
      image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
      title: "Books Collection",
    },
    {
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
      title: "Reading Time",
    },
    {
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570",
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
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
  };

  return (
    <div className="mt-[120px]">
      <Slider
        slides={slides}
        currentSlide={currentSlide}
        prevSlide={prevSlide}
        nextSlide={nextSlide}
      />
      <FruitGallery />
      <MemorableProductDisplay />
      <BookDisplay />
    </div>
  );
};

export default Home;
