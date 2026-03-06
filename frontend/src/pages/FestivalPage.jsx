import React, { useState } from "react";
import Navbar from "../components/Navbar";

const files = [
{
    id: 1,
    type: "image",
    src: "https://tse3.mm.bing.net/th/id/OIP.1_WNRdkQxhGCCkVVxixKhQHaHa?cb=12&w=960&h=960&rs=1&pid=ImgDetMain&o=7&rm=3",
    name: "Gloriosa superba (Glory lily)",
    benefit: "so it promotes easy flow of menstrual blood and gives relief from abdominal cramps and lower abdominal pain during periods..",
  },
 {
    id: 2,
    type: "image",
    src: "https://5.imimg.com/data5/SELLER/Default/2024/7/436649832/TM/UX/IO/48125098/green-bakul-plant-500x500.jpg",
    name: "Mimusops elengi (Maulsari/bakul)",
    benefit: "potential against gingival bleeding, gastric ulcers, and congestive conditions.",
  },
  {
    id: 3,
    type: "image",
    src: "https://tse4.mm.bing.net/th/id/OIP.ZgYcSNFfMvX-EfMjWa0zNwHaHa?cb=12&w=600&h=600&rs=1&pid=ImgDetMain&o=7&rm=3",
    name: "African Violent",
    benefit: "Sample benefit text.",
  },
  {
    id: 4,
    type: "image",
    src: "https://tse1.mm.bing.net/th/id/OIP.Jm_OeydZ5coNYyP3s2dj7gAAAA?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    name: "Pandanus odoratissimus (Ketaki)",
    benefit: "SAdds aesthetic appeal with its unique spiral leaves and fragrant flowers.",
  },
  {
    id: 5,
    type: "image",
    src: "https://tse1.mm.bing.net/th/id/OIP.q-FYdg7j2Z2hrIqkjZDrTgHaLH?cb=12&w=1000&h=1500&rs=1&pid=ImgDetMain&o=7&rm=3",
    name: "Chrysanthemum sp.",
    benefit: "Traditionally used in teas to reduce fever, inflammation, and for eye health.",
  },
  {
    id: 6,
    type: "image",
    src: "https://i.etsystatic.com/16477306/r/il/5ee61f/6101726858/il_1080xN.6101726858_58bj.jpg",
    name: "Punica granatum (Pomegranate flower)",
    benefit: "Often used in traditional ceremonies and decorations.",
  },
   {
    id: 7,
    type: "image",
    src: "https://tse1.mm.bing.net/th/id/OIP.0CB00nqtocj_29Fq_523rAHaIo?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    name: "Nyctanthes arbor-tristis (Parijat)",
    benefit: "Flowers are often used in Hindu rituals and garlands.",
  },
  {
    id: 8,
    type: "image",
    src: "https://m.media-amazon.com/images/I/71oYdRUVJqL._SL1500_.jpg",
    name: "Michelia champaca (Golden Champa) ",
    benefit: "Flower and bark extracts are traditionally used for treating skin disorders, fever, and inflammation.",
  },
  {
    id: 9,
    type: "image",
    src: "https://tse2.mm.bing.net/th/id/OIP.hANwiXONdmdebW6p7rzvFAAAAA?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    name: "Curcuma pseudomontana (Hill Turmeric)",
    benefit: "In traditional medicine, the plant has been used for treating jaundice, body swelling, and wound healing activities.",
  },
  {
    id: 10,
    type: "image",
    src: "https://cdn.shopify.com/s/files/1/0579/7924/0580/files/126ea6a7d5_480x480.jpg?v=1725445883",
    name: "Impatiens balsamina (Balsam)",
    benefit: "Can help in traditional medicine for treating skin issues and inflammation.",
  },
];

export default function FestivalPage() {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
       <div>
            <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-pink-50 to-yellow-100">
        
      <div className="flex-1 p-6 overflow-auto">
     <div className="flex justify-center mb-8">
          <h1 className="text-3xl text-green-900 font-extrabold text-center">
            Festival Recommended
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
