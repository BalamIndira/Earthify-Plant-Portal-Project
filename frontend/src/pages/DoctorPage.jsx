import React, { useState } from "react";
import Navbar from "../components/Navbar";

const files = [
  {
    id: 1,
    type: "image",
    src: "https://fthmb.tqn.com/73CQLOYdEfcG-6MkB7OnD_NiuzM=/960x0/filters:no_upscale()/rosemary-plant-on-a-kitchen-worktop-485748405-5833108a5f9b58d5b11e31dc.jpg",
    name: "Rosemary Plant",
    benefit:
      "Use: Rosemary oil has useful anti-inflammatory and anti-bacterial properties when you apply it topically. In tea form, rosemary is hailed as a valuable memory booster.",
  },
  {
    id: 2,
    type: "image",
    src: "https://plants.thegrowingplace.com/Content/Images/Photos/G150-07.jpg",
    name: "Feverfew (Tanacetum parthenium)",
    benefit:
      "Feverfew, containing parthenolide, may help reduce migraine frequency, but effectiveness varies widely between individuals.",
  },
  {
    id: 3,
    type: "image",
    src: "https://flowercompany.ca/cdn/shop/products/aloe-vera-plant-toronto-flower-co-536753.webp?v=1676627127",
    name: "Aloe vera",
    benefit:
      "Use: Use the slimy gel-like interior to treat a number of conditions from sunburns to stings.",
  },
  {
    id: 4,
    type: "image",
    src: "https://api.plantheritage.org.uk/images/13563l.jpg",
    name: "Aconite (Aconitum)",
    benefit:
      "Use: Aconite has sedative properties, as well as the ability to treat headaches. It is a powerful medicinal plant and should be used with extreme care.",
  },
  {
    id: 5,
    type: "image",
    src: "https://cdn.morningchores.com/wp-content/uploads/2018/11/Sushni.jpg",
    name: "Sushni (Marsilea quadrifolia)",
    benefit:
      "Use: This plant has sedative properties that are helpful for battling insomnia. It has also been shown to lower cholesterol levels.",
  },
  {
    id: 6,
    type: "image",
    src: "https://cdn.morningchores.com/wp-content/uploads/2018/11/inula-2395040_640.jpg",
    name: "Elecampane (Inula helenium)",
    benefit: "Use: Elecampane is useful as a cough suppressant, in addition to providing relief from indigestion.",
  },
  {
    id: 7,
    type: "image",
    src: "https://www.houseplantsexpert.com/wp-content/uploads/2023/01/ZZ-Plant-jpg-webp-webp.webp",
    name: "ZZ plant",
    benefit: "Sample benefit text.",
  },
  {
    id: 8,
    type: "image",
    src: "https://cdn.morningchores.com/wp-content/uploads/2018/11/inula-2395040_640.jpg",
    name: "Elecampane (Inula helenium)",
    benefit: "Use: Elecampane is useful as a cough suppressant, in addition to providing relief from indigestion.",
  },
  {
    id: 9,
    type: "image",
    src: "https://cdn.morningchores.com/wp-content/uploads/2018/11/Allheal-800x598.jpg",
    name: "Allheal (Prunella)",
    benefit: "The name says it all. Once used as a cure-all, the plant has anti-inflammatory and anti-microbial properties.",
  },
  {
    id: 10,
    type: "image",
    src: "https://tse3.mm.bing.net/th/id/OIP.39qVan3nsj9QN4RZPlhGxgHaG6?cb=12&w=860&h=803&rs=1&pid=ImgDetMain&o=7&rm=3",
    name: "Lemon Balm (Melissa officinalis)",
    benefit: "As a tea, lemon balm is a great all-around soother. ",
  },
];

export default function FileManager() {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-pink-50 to-yellow-100">
        <div className="flex-1 p-6 overflow-auto">
          <div className="flex justify-center mb-8">
            <h1 className="text-3xl text-green-900 font-extrabold text-center">
              Doctor Recommended
            </h1>
          </div>

          <div className="columns-2 sm:columns-3 md:columns-4 gap-4 space-y-4">
            {files.map((file) => (
              <div
                key={file.id}
                className={`group break-inside-avoid relative cursor-pointer overflow-hidden rounded-lg border mb-4 ${
                  selectedFile === file.id
                    ? "border-red-500"
                    : "border-gray-200"
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
