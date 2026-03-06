// src/pages/LandingPage.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Leaf,
  ShoppingCart,
  Gift,
  Sun,
  Truck,
  PlayCircle,
  MapPin,
  Heart,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../components/Footer";

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 1100,
      offset: 80,
      easing: "ease-out-cubic",
    });
  }, []);

  const handleGetStarted = () => {
    navigate("/home");
  };

  return (
    <div className="bg-green-50 min-h-screen font-sans text-green-900 mt-0">
      {/* Navbar */}
      <header
        className="flex flex-col md:flex-row md:justify-between md:items-center px-6 md:px-10 py-3
  bg-[linear-gradient(135deg,rgba(253,250,246,0.8),rgba(181,240,200,0.7),rgba(133,227,164,0.6))]
  backdrop-blur-xl border-b border-green-300/40
  text-emerald-900 font-semibold shadow-lg
  sticky top-0 z-50 transition-all duration-300"
      >
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <Leaf className="text-green-600 w-7 h-7" />
          <h1 className="text-2xl font-bold text-green-700">Earthify</h1>
        </div>
        <nav className="hidden md:flex space-x-8 font-medium text-base">
          <a href="#about" className="hover:text-green-600 transition">
            About
          </a>
          <a href="#features" className="hover:text-green-600 transition">
            Features
          </a>
          <a href="#sustain" className="hover:text-green-600 transition">
            Sustainability
          </a>
          <a href="#getinvolved" className="hover:text-green-600 transition">
            Get Involved
          </a>
        </nav>
        <button
          onClick={handleGetStarted}
          className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition text-base"
        >
          Explore Plants
        </button>
      </header>



      {/* Hero Section with leaf mask visual on right */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-6 md:py-16 bg-white border-b border-green-100 gap-10 md:gap-20">
        <div className="md:w-1/2" data-aos="fade-right">
          {/* <p className="text-green-700 font-semibold">No.1 Online Plant Portal</p> */}
          <h2 className="text-3xl md:text-5xl font-extrabold my-3 leading-tight leading-snug md:leading-tight tracking-wide md:tracking-normal">
            Create a Thriving Environment <br/>
            with Green Companions
          </h2>
          <p className="mt-2 text-lg md:text-xl text-green-800 max-w-xl">
            Plants reduce stress and improve mood, making them ideal for any
            home or workspace. Let's grow a greener future, one plant at a time.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-8">
            <button
              onClick={handleGetStarted}
              className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition w-full sm:w-auto sm:min-w-[170px]"
            >
             Get Started
            </button>
            <a
              href="#features"
              className="px-8 py-3 rounded-full font-semibold border border-green-300 text-green-800 hover:bg-green-50 transition inline-flex items-center gap-2 justify-center w-full sm:w-auto"
            >
              <PlayCircle className="w-5 h-5" /> See Features
            </a>
          </div>

          {/* small trust badges */}
          <div className="mt-10 grid grid-cols-2 gap-4 max-w-md">
            <div className="bg-green-50 border border-green-100 rounded-xl px-4 py-3 flex items-center gap-3">
              <ShieldCheck className="text-green-700 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-green-900">
                  Handpicked, Healthy Plants
                </p>
                <p className="text-xs text-green-700">
                  Curated, nursery-grade quality
                </p>
              </div>
            </div>
            <div className="bg-green-50 border border-green-100 rounded-xl px-4 py-3 flex items-center gap-3">
              <Truck className="text-green-700 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-green-900">
                  Hassle‑Free Delivery
                </p>
                <p className="text-xs text-green-700">
                  Sustainable packaging & care tips
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: leaf-cutout image */}
        <div
          className="md:w-1/2 flex flex-col items-center gap-6 md:mt-0"
          data-aos="fade-left"
        >
          {/* Leaf-like mask using CSS mask-image */}
          <div
            className="w-full max-w-[420px] aspect-square shadow-xl rounded-3xl overflow-hidden"
            style={{
              WebkitMaskImage:
                "radial-gradient(ellipse 60% 55% at 50% 45%, black 60%, transparent 61%)",
              maskImage:
                "radial-gradient(ellipse 60% 55% at 50% 45%, black 60%, transparent 61%)",
              WebkitMaskComposite: "source-over",
              backgroundImage:
                "url('https://arborsage.com/wp-content/uploads/2024/02/optimal_plant_care_techniques.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            aria-label="Leaf cutout visual"
          />
          {/* existing stats */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-[420px] justify-center">
            <div className="bg-green-100 p-5 rounded-xl shadow flex-1 min-w-[140px] flex flex-col items-center">
              <span className="font-bold text-2xl">100%</span>
              <span className="text-sm text-green-700">Satisfied Clients</span>
            </div>
            <div className="bg-green-100 p-5 rounded-xl shadow flex-1 min-w-[140px] flex flex-col items-center">
              <span className="font-bold text-2xl">24,000+</span>
              <span className="text-sm text-green-700">Active Users</span>
            </div>
            <div className="bg-green-100 p-5 rounded-xl shadow flex-1 min-w-[140px] flex flex-col items-center">
              <span className="font-bold text-2xl">70%</span>
              <span className="text-sm text-green-700">Productivity boost</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-6 md:px-10 py-44 bg-green-50">
        <div className="max-w-5xl mx-auto" data-aos="fade-up">
            {/* <section className="mb-10 px-6 md:px-24" data-aos="fade-up"> */}
          <h3 className="text-3xl font-bold text-center mb-6">
            We strive to protect nature for future generations.
          </h3>
             {/* <p className="text-center text-lg max-w-2xl mx-auto text-green-800">
          Welcome to Earthify – Your Green Lifestyle Partner! Discover a wide
          range of fresh, healthy, and sustainable plants to brighten your home
          and purify your surroundings. Shop effortlessly, enjoy exclusive
          festival offers, and bring nature closer with every plant you buy!
        </p> */}
          <p className="text-center text-lg max-w-2xl mx-auto text-green-800">
            Earthify leads impactful projects for reforestation and
            biodiversity, ensuring a sustainable tomorrow. The platform makes
            plant care, gifting, and eco action simple for homes and workplaces.
          </p>
        
        </div>
        
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 md:px-10 py-35 bg-white">
        <h3
          className="text-4xl font-bold text-center mb-14 tracking-tight"
          data-aos="fade-up"
        >
          Our Key Features
        </h3>

        {/* mini tabs feel header */}
        <div className="max-w-6xl mx-auto mb-6 flex items-center justify-center gap-3 text-sm flex-wrap">
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 inline-flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Popular
          </span>
          <span className="px-3 py-1 rounded-full border border-green-200 text-green-700">
            New
          </span>
          <span className="px-3 py-1 rounded-full border border-green-200 text-green-700">
            Essentials
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-7 max-w-6xl mx-auto">
          {/* Buy Plants */}
          <div
            className="bg-green-50 p-7 rounded-3xl shadow hover:shadow-2xl cursor-pointer transform transition group border border-green-100"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="flex justify-center">
              <ShoppingCart className="text-green-600 w-14 h-14 mb-5 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-400" />
            </div>
            <h4 className="font-extrabold text-lg text-green-900 mb-2 text-center">
              Buy Plants
            </h4>
            <p className="text-green-700 text-base text-center">
              Browse and purchase admin-approved healthy plants with ease for
              home or office.
            </p>
            <div className="mt-5 pt-5 border-t border-green-100 text-center text-sm text-green-700">
              Fast checkout • Safe packaging
            </div>
          </div>

          {/* Gift Plants */}
          <div
            className="bg-green-50 p-7 rounded-3xl shadow hover:shadow-2xl cursor-pointer transform transition group border border-green-100"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="flex justify-center">
              <Gift className="text-green-600 w-14 h-14 mb-5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-400" />
            </div>
            <h4 className="font-extrabold text-lg text-green-900 mb-2 text-center">
              Gift Plants
            </h4>
            <p className="text-green-700 text-base text-center">
              Surprise loved ones with eco‑friendly plant gifts and personal
              messages.
            </p>
            <div className="mt-5 pt-5 border-t border-green-100 text-center text-sm text-green-700">
              Custom notes • Scheduled delivery
            </div>
          </div>

          {/* Plant Care Tips */}
          <div
            className="bg-green-50 p-7 rounded-3xl shadow hover:shadow-2xl cursor-pointer transform transition group border border-green-100"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="flex justify-center">
              <Sun className="text-green-600 w-14 h-14 mb-5 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-400" />
            </div>
            <h4 className="font-extrabold text-lg text-green-900 mb-2 text-center">
              Plant Care Tips
            </h4>
            <p className="text-green-700 text-base text-center">
              Get smart, personalized watering, sunlight, and soil care
              instructions.
            </p>
            <div className="mt-5 pt-5 border-t border-green-100 text-center text-sm text-green-700">
              Step-by-step guides • Alerts
            </div>
          </div>

          {/* Track Orders */}
          <div
            className="bg-green-50 p-7 rounded-3xl shadow hover:shadow-2xl cursor-pointer transform transition group border border-green-100"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="flex justify-center">
              <Truck className="text-green-600 w-14 h-14 mb-5 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-400" />
            </div>
            <h4 className="font-extrabold text-lg text-green-900 mb-2 text-center">
              Track Orders
            </h4>
            <p className="text-green-700 text-base text-center">
              Monitor your plant deliveries in real time with helpful status
              updates.
            </p>
            <div className="mt-5 pt-5 border-t border-green-100 text-center text-sm text-green-700">
              Live status • Support chat
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section id="sustain" className="px-6 md:px-10 py-35 bg-green-100">
        <h3 className="text-3xl font-bold text-center mb-10" data-aos="fade-up">
          Events, Campaigns, & Projects
        </h3>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div
            className="bg-white p-6 rounded-xl shadow flex flex-col"
            data-aos="fade-right"
          >
            <h4 className="font-bold text-xl mb-2">Cleaning up the Plant</h4>
            <p>
              We work to clean up urban pollution and restore beauty through
              green drives. Join the journey!
            </p>
            <a
              href="#"
              className="mt-4 inline-block font-semibold text-green-600 hover:underline"
            >
              Read More
            </a>
          </div>
          <div
            className="bg-white p-6 rounded-xl shadow flex flex-col"
            data-aos="fade-left"
          >
            <h4 className="font-bold text-xl mb-2">We Plant Trees</h4>
            <p>
              Tree planting is essential to maintain natural balance and promote
              future health.
            </p>
            <a
              href="#"
              className="mt-4 inline-block font-semibold text-green-600 hover:underline"
            >
              Read More
            </a>
          </div>
        </div>
        <div className="text-center mt-10" data-aos="zoom-in">
          <button className="px-7 py-2 bg-green-700 text-white rounded-full text-lg font-semibold hover:bg-green-900 transition" >
             <a
              href="#sustain"
              // className="px-8 py-3 rounded-full font-semibold border border-green-300 text-green-800 hover:bg-green-50 transition inline-flex items-center gap-2 justify-center w-full sm:w-auto"
            >
            See All Campaigns
            </a>
          </button>
 
        </div>
      </section>

      {/* Tutorials & Tips */}
      <section className="px-6 md:px-10 py-16 bg-white">
        <h3 className="text-3xl font-bold text-center mb-10" data-aos="fade-up">
          Tutorials, Insights, & Everyday Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div
            className="bg-green-50 p-5 rounded-xl shadow flex flex-col items-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <img
              src="https://thumbs.dreamstime.com/b/seedlings-exuberant-abundant-loamy-soils-role-nutrients-plant-life-soil-gital-mineral-icon-nutrient-development-fertilizer-growing-306200446.jpg"
              alt="Plant care tips"
              className="rounded w-full mb-3 h-58"
            />
            <span className="font-semibold text-lg">Plant Care Guide</span>
            <span className="text-sm text-green-700 mt-2">
              Practical tips for healthy plants
            </span>
          </div>
          <div
            className="bg-green-50 p-5 rounded-xl shadow flex flex-col items-center"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <iframe
              width="100%"
              height="230"
              src="https://www.youtube.com/embed/fb3pgKd9kJw"
              title="Plant Care For Beginners"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{borderRadius:"4px",height:"236px"}}
            ></iframe>
            <span className="font-semibold text-lg">Video Instructions</span>
            <span className="text-sm text-green-700 mt-2">
              Visual steps for best results
            </span>
          </div>
          <div
            className="bg-green-50 p-5 rounded-xl shadow flex flex-col items-center"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <img
              src="https://img.freepik.com/premium-photo/digital-image-plant-container-with-numbers-it_741212-910.jpg"
              alt="Future care tips"
              className="rounded w-full mb-3 h-58"
            />
            <span className="font-semibold text-lg">Future Care Tips</span>
            <span className="text-sm text-green-700 mt-2">
              Sustainable everyday actions
            </span>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="px-6 md:px-10 py-30 bg-green-100" id="getinvolved">
        <h3 className="text-3xl font-bold text-center mb-10" data-aos="fade-up">
          Community Efforts in Tree Planting
        </h3>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div data-aos="fade-right">
            <p className="text-lg mb-2">
              Tree planting becomes more effective when it is a community
              effort. Collaborate with schools, organizations, and local clubs!
            </p>
            <button className="mt-3 px-8 py-2 bg-green-700 text-white rounded-full text-lg font-semibold hover:bg-green-900 transition">
          
              <a href="/home">
              Explore More
              </a>
            </button>
          </div>
          <img
            src="https://user-gen-media-assets.s3.amazonaws.com/seedream_images/b9049e40-90ff-400b-a1db-eca068e91cad.png"
            alt="Community Planting"
            className="rounded-xl shadow w-80"
            data-aos="fade-left"
          />
        </div>
      </section>

      {/* Get Involved */}
      <section className="px-6 md:px-10 py-14 bg-white">
        <h3 className="text-3xl font-bold mb-6" data-aos="fade-up">
          Get Involved
        </h3>
        <div className="max-w-3xl mx-auto space-y-4">
          <div
            className="bg-green-100 px-6 py-5 rounded-xl flex justify-between items-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <span className="font-semibold text-green-900">
              Become a Volunteer
            </span>
            <button className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition">
              Join
            </button>
          </div>
          <div
            className="bg-green-100 px-6 py-5 rounded-xl flex justify-between items-center"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <span className="font-semibold text-green-900">
              Make a Donation
            </span>
            <button className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition">
              Donate
            </button>
          </div>
          <div
            className="bg-green-100 px-6 py-5 rounded-xl flex justify-between items-center"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <span className="font-semibold text-green-900">
              Participate in Campaigns
            </span>
            <button className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition">
              Participate
            </button>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}
