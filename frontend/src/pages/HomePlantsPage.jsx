import React, { useState } from "react";
import Navbar from "../components/Navbar";

const files = [

  {
    id: 1,
    type: "image",
    src: "https://nouveauraw.com/wp-content/uploads/2020/01/Pothos-Golden-Pothos-plant-800-great-coloring.png",
    name: "Pothos",
    benefit: "Tolerates low light, easy to grow.",
  },
    {
    id: 2,
    type: "image",
    src: "https://snappyliving.com/wp-content/uploads/2023/05/snake-plant.jpg",
    name: "Snake Plant",
    benefit: "Purifies air, thrives on neglect.",
  },
  {
    id: 3,
    type: "image",
    src: "https://tse4.mm.bing.net/th/id/OIP.ZgYcSNFfMvX-EfMjWa0zNwHaHa?cb=12&w=600&h=600&rs=1&pid=ImgDetMain&o=7&rm=3",
    name: "African Violent",
    benefit: "African violets thrive in low to moderate light, making them ideal for offices, even under fluorescent lamps, but avoid direct sunlight.",
  },
  {
    id: 4,
    type: "image",
    src: "https://www.homefortheharvest.com/wp-content/uploads/2021/08/Rex-Begonia-Plant.jpg",
    name: "Rex Begonia",
    benefit: "Sample benefit text.",
  },
  {
    id: 5,
    type: "image",
    src: "https://tse4.mm.bing.net/th/id/OIP.kzr_ykdL7qRlT5Hvo2yEOQHaJ4?cb=12&w=900&h=1200&rs=1&pid=ImgDetMain&o=7&rm=3",
    name: "English Ivay",
    benefit: "It readily adjusts to various lighting conditions but is especially noted for thriving even in low-light spaces which makes it a perfect pick for office desk plants.",
  },
  {
    id: 6,
    type: "image",
    src: "https://viverocastillo.com/wp-content/uploads/2020/11/IMG_20201120_153856.jpg",
    name: "Philodendron",
    benefit: "Sample benefit text.",
  },
   {
    id: 7,
    type: "image",
    src: "https://www.houseplantsexpert.com/wp-content/uploads/2023/01/ZZ-Plant-jpg-webp-webp.webp",
    name: "ZZ plant",
    benefit: "ZZ Plant (Zamioculcas zamiifolia) is low-maintenance, tolerates low light and irregular watering, purifies indoor air, and adds glossy, attractive greenery to any space.",
  },
  {
    id: 8,
    type: "image",
    src: "https://www.ecoterrazas.com/1584-thickbox_default/tillandsia-fasciculata.jpg",
    name: "Tillandsia",
    benefit: "Sample benefit text.",
  },
  {
    id: 9,
    type: "image",
    src: "https://www.planetnatural.com/wp-content/uploads/2024/02/Wood-sorrel-on-a-pot-on-a-white-desk-500x281.jpg",
    name: "Wood Sorrel",
    benefit: "Sample benefit text.",
  },
  {
    id: 10,
    type: "image",
    src: "https://thumbs.dreamstime.com/b/alovera-plant-alovera-plant-green-grass-plant-home-255728692.jpg",
    name: "Aloe Vera",
    benefit: "Heals cuts, easy to care.",
  },
];

export default function HomePlantsPage() {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
       <div>
            <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-pink-50 to-yellow-100">
      <div className="flex-1 p-6 overflow-auto">
     <div className="flex justify-center mb-8">
          <h1 className="text-3xl text-green-900 font-extrabold text-center">
            Home Plant Recommended
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
