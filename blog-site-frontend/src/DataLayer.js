import React, { createContext, useState } from "react";

export const DataLayer = createContext();

const DataLayerProvider = (props) => {
  let data = localStorage.getItem("userData");
  data = JSON.parse(data);
  const [user, setUser] = useState(data || "");

  return (
    <DataLayer.Provider value={{ user, setUser }}>
      {props.children}
    </DataLayer.Provider>
  );
};

export default DataLayerProvider;
