import React from "react";

const ImageBannerGrid = () => {
  const images = [
    {
      id: 1,
    //   src: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
      alt: "Books on wooden shelf"
    },
    {
      id: 2,
    //   src: "https://images.unsplash.com/photo-1524578271613-d550eacf6090",
      alt: "Stack of vintage books"
    },
    {
      id: 3,
    //   src: "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
      alt: "Open book with coffee"
    },
    {
      id: 4,
    //   src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6",
      alt: "Library with rows of books"
    },
    {
      id: 5,
    //   src: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570",
      alt: "Reading corner with books"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-4">
        {/* Top Row */}
        <div className="grid grid-cols-2 gap-4">
          {images.slice(0, 2).map((image) => (
            <div 
              key={image.id} 
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
            </div>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-3 gap-4">
          {images.slice(2).map((image) => (
            <div 
              key={image.id} 
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageBannerGrid;