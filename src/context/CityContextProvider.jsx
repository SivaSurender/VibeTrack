import { createContext, useContext, useEffect, useState } from "react";
export const BASE_URL = "http://localhost:9000/";

const CityContext = createContext();

function CityContextProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currCity, setCurrentCity] = useState({});
  const [mapPos, setMapPos] = useState([40, 0]);
  const uniqueCountries = cities?.reduce((accu, curr) => {
    const matchedCountries = accu?.find(
      (each) => each.country === curr.country
    );

    if (!matchedCountries) {
      accu.push(curr);
    }
    return accu;
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const getCity = async () => {
      setIsLoading(true);
      try {
        const fetchData = await fetch(`${BASE_URL}cities`, {
          signal: controller.signal,
        });
        const fetchedData = await fetchData.json();
        console.log(fetchedData, "fetched data");
        setCities(fetchedData);
      } catch (e) {
        console.log(e, "Error from api");
      } finally {
        setIsLoading(false);
      }
    };
    getCity();
    // return () => controller.abort();
  }, []);
  return (
    <CityContext.Provider
      value={{
        cities,
        setCities,
        isLoading,
        setIsLoading,
        currCity,
        setCurrentCity,
        uniqueCountries,
        mapPos,
        setMapPos,
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
