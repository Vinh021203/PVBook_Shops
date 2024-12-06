import React, { useState } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

const App = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        isDropdownOpen={isDropdownOpen}
        toggleDropdown={toggleDropdown}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <div className="mt-[70px] w-full">
        <Navbar />
      </div>
      <Home/>
    </div>
  );
};

export default App;
