// src/pages/Home.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import MiddleBar from "../components/Middlebar";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../components/Footer";

export default function Home({ loggedInUser }) {
  const slides = [
    // {
    //   src: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1350&q=80",
    //   caption: "Earthify Plant Portal",
    // },
    { src: "/1.jpg" },
    { src: "/2.jpg" },
    { src: "/3.jpg" },
    { src: "/4.jpg" },
    { src: "/5.jpg" },
    { src: "/6.jpg" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ once: true, duration: 1500, easing: "ease-out-cubic" });
    const t = setInterval(() => {
      setCurrentIndex((i) => (i === slides.length - 1 ? 0 : i + 1));
    }, 4000);
    return () => clearInterval(t);
  }, [slides.length]);

  const railRef1 = useRef(null);
  const railRef2 = useRef(null);

  const getStep = (ref) => {
    const firstCard = ref.current.querySelector(".card");
    const gap = parseFloat(window.getComputedStyle(ref.current).gap) || 0;
    return firstCard.getBoundingClientRect().width + gap;
  };

  const scrollLeft = (ref) => {
    ref.current.scrollBy({ left: -getStep(ref), behavior: "smooth" });
  };

  const scrollRight = (ref) => {
    ref.current.scrollBy({ left: getStep(ref), behavior: "smooth" });
  };

  const handleNavigate = (role) => {
    if (role === "buyer") {
      navigate("/buyer");
    } else if (role === "seller") {
      navigate("/seller");
    } else if (role === "admin") {
      navigate("/admin");
    } else if (role === "delivery") {
      navigate("/delivery");
    }
  };

  const images = [
    "https://www.thespruce.com/thmb/DClM9hq6TUs3wSRPQ2L20NOBOQw=/2121x0/filters:no_upscale():max_bytes(150000):strip_icc()/saguarocactus-GettyImages-506103644-9d881bd28f144ba4be61c2b32e0ff124.jpg",
    "https://images.homedepot-static.com/productImages/87730a03-eba7-48a5-bf52-9b2576d18edc/svn/nearly-natural-artificial-foliage-6989-64_1000.jpg",
    "https://tse4.mm.bing.net/th/id/OIP.qOKRqeNoy9HZJyC-jEgZnQHaJ4?rs=1&pid=ImgDetMain&o=7&rm=3",
    "https://thumbs.dreamstime.com/b/plant-saplings-new-life-being-grow-pot-222416791.jpg",
    "https://media.karousell.com/media/photos/products/2021/11/17/anthurium_lilli_1637160004_f5bd8e1c_progressive.jpg",
    "https://5.imimg.com/data5/YQ/VN/MY-23870991/brinjal-vegetable-plant-1000x1000.jpg",
    "https://tse4.mm.bing.net/th/id/OIP.kCeem6VPVLSHbuSkPZ39swAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
    "https://thumbs.dreamstime.com/b/cactus-pot-4559012.jpg",
    "https://5.imimg.com/data5/NQ/UV/MY-40574958/rose-flower-plant-500x500.jpg",
    "https://i.pinimg.com/originals/54/c9/68/54c968e8a3c49650403929899b5ab654.jpg",
  ];

  const images1 = [
    "https://tse1.explicit.bing.net/th/id/OIP.90Rg-jlfohwNQ8lM-sUTHgAAAA?w=400&h=400&rs=1&pid=ImgDetMain&o=7&rm=3",
    "https://i.pinimg.com/736x/92/fa/fb/92fafb9baf3edf2850fbf509dd517829.jpg",
    "https://cdn.shopify.com/s/files/1/0552/5644/9180/products/greenparadise_strawberry.jpg?v=1616322603",
    "https://tse4.mm.bing.net/th/id/OIP.kCeem6VPVLSHbuSkPZ39swAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
    "https://m.media-amazon.com/images/I/61PKxOhrAuL._SL1080_.jpg",
    "https://tse4.mm.bing.net/th/id/OIP.sx3mPQweflZgW9BfktA0DwHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
    "https://thumbs.dreamstime.com/b/fresh-green-mint-plant-black-pot-herbal-aromatic-plant-generative-ai-design-royalty-free-image-fresh-green-mint-plant-black-359128384.jpg",
    "https://tse1.explicit.bing.net/th/id/OIP.xLJ9VgEPkibLudNcfH4s6gHaFj?rs=1&pid=ImgDetMain&o=7&rm=3",
    "https://plantsafari.com.au/wp-content/uploads/2023/07/rose-1-scaled.jpeg",
    "https://media.karousell.com/media/photos/products/2021/11/17/anthurium_lilli_1637160004_f5bd8e1c_progressive.jpg",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#b6d0c4]">
      <Navbar />
      {/* <MiddleBar /> */}

      {/* Slideshow Header */}
      <header
        className="relative w-full h-[75vh] overflow-hidden text-center mb-8"
        data-aos="fade-in"
      >
        <img
          src={slides[currentIndex].src}
          alt={slides[currentIndex].caption || "slide"}
          className="w-full h-full object-cover transition-transform duration-[1000ms] ease-in-out mt-0"
          loading="lazy"
        />
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 rounded px-3 py-1 text-white text-sm backdrop-blur-md">
          {slides[currentIndex].caption}
        </div>
        {/* Slide Indicators */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-4 h-4 rounded-full border border-white transition ${
                idx === currentIndex
                  ? "bg-white shadow-xl"
                  : "bg-white/50 hover:bg-white"
              }`}
              aria-label={`Slide ${idx + 1}`}
              type="button"
            />
          ))}
        </div>
      </header>

      {/* Action Buttons */}
      <div
        className="flex flex-wrap justify-center gap-4 mb-8 px-4"
        data-aos="fade-up"
      >
        <button
          onClick={() => handleNavigate("buyer")}
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-full text-base sm:text-lg shadow-lg shadow-green-600/50 transition transform hover:scale-105"
        >
         Buy Plants
        </button>
        <button
          onClick={() => handleNavigate("seller")}
          className="bg-gray-200 hover:bg-gray-300 text-black px-6 py-3 rounded-full text-base sm:text-lg shadow-md transition transform hover:scale-105"
        >
          I&apos;m a Seller
        </button>
      </div>

      {/* About Section */}
      {/* <section className="mb-10 px-6 md:px-24" data-aos="fade-up">
        <h2 className="text-5xl font-fantasy text-green-800 mb-6 text-left drop-shadow-md">
          About
        </h2>
        <p className="text-lg text-green-900 text-justify max-w-5xl mx-auto leading-relaxed">
          Welcome to Earthify – Your Green Lifestyle Partner! Discover a wide
          range of fresh, healthy, and sustainable plants to brighten your home
          and purify your surroundings. Shop effortlessly, enjoy exclusive
          festival offers, and bring nature closer with every plant you buy!
        </p>
      </section> */}

      {/* Plant Sections with glassmorphism cards */}
      <section
        className="mb-16 px-6 md:px-16 flex flex-wrap justify-center gap-8"
        data-aos="fade-up"
      >
        {[...Array(5)].map((_, idx) => {
          const data = [
            {
              heading: "Doctor's Recommended Plants",
              desc: "Breathe better, live healthier! Doctors suggest these plants for purifying the air, boosting immunity, and keeping your environment fresh and stress-free.",
              images: [
                "https://plantmartuae.com/cdn/shop/products/BasilPersian_Rayhan_2_c81ec381-733b-449d-b475-6c3f06313a43.jpg?v=1664704489&width=360",
                "https://www.birdsandblooms.com/wp-content/uploads/2022/11/bloomscape-peace-lily_large_stone.jpg?fit=680%2C816",
                "https://i.ytimg.com/vi/DOcWDHg-P2E/maxresdefault.jpg",
              ],
              route: "/doctor",
            },
            {
              heading: "Yoga Recommended Plants",
              desc: "Create a calm and peaceful atmosphere for your yoga and meditation with plants that enhance focus, positivity, and relaxation.",
              images: [
                "https://i.pinimg.com/originals/e0/f8/fd/e0f8fda5a3c0038c91a2e0d102e52858.jpg",
                "https://media.istockphoto.com/photos/bamboo-bunch-with-leaves-picture-id157675798?b=1&k=20&m=157675798&s=170667a&w=0&h=p8qlsA7j7WwcB1rsyb1cNcxaco5XaeG_NDpN9epQbzg=",
                "https://tse3.mm.bing.net/th/id/OIP.w04pxhLiXAn8kQ95ixTpTwHaHZ?cb=thfc1&rs=1&pid=ImgDetMain&o=7&rm=3",
              ],
              route: "/yoga",
            },
            {
              heading: "Office Desk Plants",
              desc: "Boost productivity and reduce stress at work with easy-to-maintain plants that keep your desk vibrant and full of energy.",
              images: [
                "https://tse4.mm.bing.net/th/id/OIP.qcktv6KIdsUFVZ424WBbTAHaHa?cb=thfc1&w=800&h=800&rs=1&pid=ImgDetMain&o=7&rm=3",
                "https://tse1.mm.bing.net/th/id/OIP.ZNNDFWZNDvCxT6Vwdvq_LwHaGV?cb=thfc1&w=1200&h=1026&rs=1&pid=ImgDetMain&o=7&rm=3",
                "https://tse1.mm.bing.net/th/id/OIP.Sfo-XuXO0a9yhFtJI70_qAHaJP?cb=thfc1&rs=1&pid=ImgDetMain&o=7&rm=3",
              ],
              route: "/desk",
            },
            {
              heading: "Home Décor Plants",
              desc: "Make your living space stylish and refreshing with indoor plants that add beauty, freshness, and positivity to your home.",
              images: [
                "https://tse1.mm.bing.net/th/id/OIP.u4hJuMpNXpJ6Ty7jjUfhiQAAAA?cb=thfc1&rs=1&pid=ImgDetMain&o=7&rm=3",
                "https://www.birdsandblooms.com/wp-content/uploads/2022/11/bloomscape-peace-lily_large_stone.jpg?fit=680%2C816",
                "https://d1dxs113ar9ebd.cloudfront.net/225batonrouge/2015/11/succulent-stockphoto.jpg",
              ],
              route: "/homeplants",
            },
            {
              heading: "Festival & Gift Plants",
              desc: "Celebrate special moments by gifting plants that symbolize love, prosperity, and long life — a perfect way to share green happiness.",
              images: [
                "https://www.birdsandblooms.com/wp-content/uploads/2022/11/bloomscape-peace-lily_large_stone.jpg?fit=680%2C816",
                "https://tse1.mm.bing.net/th/id/OIP.ZNNDFWZNDvCxT6Vwdvq_LwHaGV?cb=thfc1&w=1200&h=1026&rs=1&pid=ImgDetMain&o=7&rm=3",
                "https://5.imimg.com/data5/SELLER/Default/2023/4/298962174/FR/EP/DJ/152886550/plants-500x500.jpg",
              ],
              route: "/festival",
            },
          ][idx];
          return (
            <div
              key={idx}
              onClick={() => navigate(data.route)}
              className="flex flex-col max-w-sm border border-green-300 bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-6 shadow-lg transition transform hover:scale-[1.05]"
              data-aos="fade-up"
              data-aos-delay={150 * idx}
            >
              <h3 className="text-xl font-semibold mb-3 text-green-900 drop-shadow-sm">
                {data.heading}
              </h3>
              <p className="text-gray-800 mb-5 text-justify">{data.desc}</p>
              <div className="flex justify-center gap-4">
                {data.images.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`${data.heading} plant ${i + 1}`}
                    className="w-24 h-24 object-cover rounded-md border border-green-300"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Festival Offer */}
      <section className="px-4 py-10" data-aos="fade-up">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Festival Offer
        </h2>
        <div className="relative">
          <div
            ref={railRef1}
            className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar px-2"
          >
            {images.map((src, i) => (
              <div
                key={i}
                className="card min-w-[200px] flex-shrink-0 shadow-lg rounded-lg overflow-hidden"
              >
                <img
                  src={src}
                  alt={`Slide ${i + 1}`}
                  className="h-40 w-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 px-3 py-1 rounded-full shadow-md"
            onClick={() => scrollLeft(railRef1)}
            aria-label="Scroll festival offer left"
          >
            ◀
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 px-3 py-1 rounded-full shadow-md"
            onClick={() => scrollRight(railRef1)}
            aria-label="Scroll festival offer right"
          >
            ▶
          </button>
        </div>
      </section>

      {/* Best Seller */}
      <section className="px-4 py-10" data-aos="fade-up">
        <h2 className="text-xl font-semibold mb-4 text-center">Best Seller</h2>
        <div className="relative">
          <div
            ref={railRef2}
            className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar px-2"
          >
            {images1.map((src, i) => (
              <div
                key={i}
                className="card min-w-[200px] flex-shrink-0 shadow-lg rounded-lg overflow-hidden"
              >
                <img
                  src={src}
                  alt={`Slide ${i + 1}`}
                  className="h-40 w-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 px-3 py-1 rounded-full shadow-md"
            onClick={() => scrollLeft(railRef2)}
            aria-label="Scroll best seller left"
          >
            ◀
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 px-3 py-1 rounded-full shadow-md"
            onClick={() => scrollRight(railRef2)}
            aria-label="Scroll best seller right"
          >
            ▶
          </button>
        </div>
      </section>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Services */}
      <section className="py-12 bg-gray-100" data-aos="fade-up">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-800 mb-8">
          Our Services
        </h2>
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              title: "Seller",
              role: "seller",
              icon: "https://cdn-icons-png.flaticon.com/512/2331/2331849.png",
              desc: "Upload & manage your plants",
            },
            {
              title: "Buyer",
              role: "buyer",
              icon: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",
              desc: "Browse & purchase plants",
            },
            {
              title: "Admin",
              role: "admin",
              icon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
              desc: "Approve & manage listings",
            },
            {
              title: "Delivery",
              role: "delivery",
              icon: "https://cdn-icons-png.flaticon.com/512/2344/2344219.png",
              desc: "Track & deliver orders",
            },
          ].map((s, i) => (
            <button
              key={i}
              onClick={() => handleNavigate(s.role)}
              className="p-6 bg-white shadow rounded-xl text-center hover:scale-105 transition transform"
            >
              <img
                src={s.icon}
                alt={s.title}
                className="w-14 h-14 mx-auto mb-4"
              />
              <h3 className="font-semibold text-green-700">{s.title}</h3>
              <p className="text-gray-600 text-sm">{s.desc}</p>
            </button>
          ))}
        </div>
      </section>
      <Footer/>
    </div>
  );
}
