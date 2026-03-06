import React, { createContext, useState } from "react";

export const PlantContext = createContext();

export const PlantProvider = ({ children }) => {
  const [plants, setPlants] = useState([]); // All plants uploaded by sellers

  return (
    <PlantContext.Provider value={{ plants, setPlants }}>
      {children}
    </PlantContext.Provider>
  );
};
