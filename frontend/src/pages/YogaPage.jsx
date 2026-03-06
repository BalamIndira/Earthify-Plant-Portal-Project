import React, { useState } from "react";
import Navbar from "../components/Navbar";

const files = [
  {
    id: 1,
    type: "image",
    src: "https://studiogrowth.com/wp-content/uploads/2020/03/Areca-Palm.webp",
    name: "Areca Palm ",
    benefit: "It’s an upright plant that’s perfect for studio conditions and thrives in humid environments. ",
  },
  {
    id: 2,
    type: "image",
    src: "https://studiogrowth.com/wp-content/uploads/2020/03/Rubber-Plant.webp",
    name: "Rubber Plant",
    benefit: "It needs plenty of water when it grows, and you’ll need to prune it every once in a while.",
  },
  {
    id: 3,
    type: "image",
    src: "https://studiogrowth.com/wp-content/uploads/2020/03/Dracaena-996x1024.webp",
    name: "Dracaena",
    benefit: "And even though it’s pretty big, it’s not that hard to grow and maintain.",
  },
  {
    id: 4,
    type: "image",
    src: "https://studiogrowth.com/wp-content/uploads/2020/03/Flowering-Maple.webp",
    name: "Flowering Maple",
    benefit: "It’s a perfect plant to add a pop of color, and it thrives in bright sunshine and evenly moist ground. ",
  },
  {
    id: 5,
    type: "image",
    src: "https://studiogrowth.com/wp-content/uploads/2020/03/Philodendron.webp",
    name: "Philodendron",
    benefit: " It will last you a long time too, so it’s a good, durable plant for a studio. ",
  },
  {
    id: 6,
    type: "image",
    src: "https://tse4.mm.bing.net/th/id/OIP.kzr_ykdL7qRlT5Hvo2yEOQHaJ4?cb=12&w=900&h=1200&rs=1&pid=ImgDetMain&o=7&rm=3",
    name: "English Ivay",
    benefit: "It readily adjusts to various lighting conditions but is especially noted for thriving even in low-light spaces which makes it a perfect pick for office desk plants.",
  },
  {
    id: 7,
    type: "image",
    src: "https://studiogrowth.com/wp-content/uploads/2020/03/Peace-Lily.webp",
    name: "Peace Lily",
    benefit: "The Peace lily is also an excellent air purifier.",
  },
  {
    id: 8,
    type: "image",
    src: "https://studiogrowth.com/wp-content/uploads/2020/03/Pony-Tail-Palm-1024x1024.webp",
    name: "Ponytail Palm",
    benefit: "Ponytail palm is a succulent, so it doesn’t need a lot of care to flourish in any space.",
  },
  {
    id: 9,
    type: "image",
    src: "https://studiogrowth.com/wp-content/uploads/2020/03/Chinese-Jade-Plant-1024x1024.webp",
    name: "Chinese Jade Plant",
    benefit: "This is why it’s believed that it brings good luck and money.",
  },
  {
    id: 10,
    type: "image",
    src: "https://studiogrowth.com/wp-content/uploads/2020/03/Rosemary.webp",
    name: "Rosemary",
    benefit: "o grow well, it will need plenty of light. ",
  },
    {
    id: 11,
    type: "image",
    src: "https://thumbs.dreamstime.com/b/alovera-plant-alovera-plant-green-grass-plant-home-255728692.jpg",
    name: "Aloe Vera",
    benefit: "Heals cuts, easy to care.",
  },
];

export default function YogaPage() {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
       <div>
            <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-pink-50 to-yellow-100">
      <div className="flex-1 p-6 overflow-auto">
     <div className="flex justify-center mb-8">
          <h1 className="text-3xl text-green-900 font-extrabold text-center">
            Yoga Recommended
          </h1>
        </div>

        <div className="columns-2 sm:columns-3 md:columns-4 gap-4 space-y-4">
          {files.map((file) => (
            <div
              key={file.id}
              className={`group break-inside-avoid relative cursor-pointer overflow-hidden rounded-lg border mb-4 ${
                selectedFile === file.id ? "border-red-500" : "border-gray-200"
              }`}
              onClick={() => setSelectedFile(file.id)}
            >
              {file.type === "image" ? (
                <img
                  src={file.src}
                  alt=""
                  className="w-full h-auto object-cover"
                />
              ) : (
                <div className="w-full h-64 bg-gray-300 flex items-center justify-center text-gray-700">
                  Video File
                </div>
              )}

              {/* Hover overlay sliding from bottom */}
              <div
                className="absolute bottom-0 left-0 w-full bg-black bg-opacity-70 text-white p-2 
                 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
              >
                <h3 className="font-bold text-lg">{file.name}</h3>
                <p className="text-sm">
                  {file.benefit || "No details available"}
                </p>
              </div>

              {file.type === "video" && (
                <span className="absolute bottom-1 right-1 bg-black text-white text-xs px-1 rounded">
                  211.9 Mb
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
