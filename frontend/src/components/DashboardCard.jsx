import React from "react";
import { Link } from "react-router-dom";

export default function DashboardCard({ title, link }) {
  return (
   <Link 
  to={link} 
  className="bg-white shadow-lg rounded-xl p-4 sm:p-6 text-center 
             hover:scale-105 transition-transform text-sm sm:text-base"
>
  <h2 className="text-lg sm:text-xl font-bold">{title}</h2>
</Link>
  );
}
