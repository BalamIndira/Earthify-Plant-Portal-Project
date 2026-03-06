import React, { useState, useEffect } from "react";

const images = [
  "/images/plant1.jpg",
  "/images/plant2.jpg",
  "/images/plant3.jpg",
];

export default function ImageSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
   <div className="w-full h-48 sm:h-64 md:h-80 overflow-hidden relative">
  <img
    src={images[index]}
    alt="plants"
    className="w-full h-full object-cover transition-transform duration-500"
  />
</div>
  );
}
