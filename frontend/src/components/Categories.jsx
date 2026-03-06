import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../components/Categories.css";

const categories = [
  { key: "fruits-vegetable", label: "Fruits/Vegetable" },
  { key: "flowering-plants", label: "Flowering Plants" },
  { key: "indoor-plants", label: "Indoor Plants" },
  { key: "herbs-medicinal", label: "Herbs & Medicinal" },
  { key: "ornamental-foliage", label: "Ornamental/Foliage" },
  { key: "succulents-cacti", label: "Succulents & Cacti" },
  { key: "creepers-climbers", label: "Creepers & Climbers" },
  { key: "seeds", label: "Seeds" },
  { key: "pots", label: "Pots" }
];

export default function Categories() {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`); 
      setShowSearch(false);
      setQuery("");
    }
  };
return (
  <nav className="navbar">
    <div className="navbar-links">
      {categories.map((cat) => (
        <NavLink
          key={cat.key}
          to={`/category/${cat.key}`}
           className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          {cat.label}
        </NavLink>
      ))}
    </div>
  </nav>
);

}
