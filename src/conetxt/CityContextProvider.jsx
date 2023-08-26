import { createContext, useContext, useState } from "react";

const CityContext = createContext();

function CityContextProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <CityContext.Provider
      value={{
        cities,
        setCities,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

function useCity() {
  const getCityContext = useContext(CityContext);
  if (!getCityContext)
    throw new Error("Context had been used out of its scope");

  return getCityContext;
}

export { CityContextProvider, useCity };
