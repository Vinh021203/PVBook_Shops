import React, { useState, useEffect } from "react";
import Slider from "../components/Slider"; // Nếu Slider nằm trong src/components
import Categories from "../components/Categories"; // Nếu FruitGallery nằm trong src/components
import MemorableProductDisplay from "../components/MemorableProductDisplay";
import BookDisplay from "../components/BookDisplay";
import FeaturedBooks from "../components/FeaturedBooks";
import ProgrammingBooks from "../components/ProgrammingBooks"
import SkillBooks from "../components/SkillBooks"
import ScienceBooks from "../components/ScienceBooks";

const Home = () => {
  return (
    <div className="">
      <Slider />
      <Categories />
      <MemorableProductDisplay />
      <FeaturedBooks />
      <BookDisplay />
      <ProgrammingBooks/>
      <div className="container mx-auto px-4 py-8"> {/* Điều chỉnh padding */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SkillBooks />
          <ScienceBooks />
        </div>
      </div>
    </div>
  );
};

export default Home;
