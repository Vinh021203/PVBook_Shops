import React from "react";

const ImageBannerGrid = () => {
  const images = [
    {
      id: 1,
      src: "https://theme.hstatic.net/200000612501/1001045770/14/slider_2.png?v=178",
      alt: "Books on wooden shelf",
      link: "https://www.facebook.com/Ltvinh212"
    },
    {
      id: 2,
      src: "https://theme.hstatic.net/200000612501/1001045770/14/slider_3.png?v=178",
      alt: "Stack of vintage books",
      link: "https://www.facebook.com/Ltvinh212"
    },
    {
      id: 3,
      src: "https://thietkelogo.edu.vn/uploads/images/thiet-ke-do-hoa-khac/banner-sach/13.png",
      alt: "Open book with coffee",
      link: "https://www.facebook.com/Ltvinh212"
    },
    {
      id: 4,
      src: "https://thietkelogo.edu.vn/uploads/images/thiet-ke-do-hoa-khac/banner-sach/14.png",
      alt: "Library with rows of books",
      link: "https://www.facebook.com/Ltvinh212"
    },
    {
      id: 5,
      src: "https://thietkelogo.edu.vn/uploads/images/thiet-ke-do-hoa-khac/banner-sach/20.png",
      alt: "Reading corner with books",
      link: "https://www.facebook.com/Ltvinh212"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-4">
        {/* Top Row */}
        <div className="grid grid-cols-2 gap-4">
          {images.slice(0, 2).map((image) => (
            <a 
              key={image.id} 
              href={image.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-64 w-full object-cover"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1481627834876-b7833e8f5570";
                  e.target.alt = "Fallback image";
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
            </a>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-3 gap-4">
          {images.slice(2).map((image) => (
            <a 
              key={image.id} 
              href={image.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-48 w-full object-cover"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1481627834876-b7833e8f5570";
                  e.target.alt = "Fallback image";
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageBannerGrid;
