import React from "react";
import Spinner from "./Spinner";
import styles from "./CityList.module.css";

import Message from "./Message";
import CountryItem from "./CountryItem";
import { useCity } from "../context/CityContextProvider";

function CountryList() {
  const { uniqueCountries, isLoading } = useCity();

  if (isLoading) return <Spinner />;
  if (!uniqueCountries || uniqueCountries.length <= 0)
    return (
      <Message message="Add your first city by clicking on a city from the map" />
    );
  return (
    <div className={styles.countryList}>
      {uniqueCountries.map((each) => {
        return <CountryItem country={each} key={each.id} />;
      })}
    </div>
  );
}

export default CountryList;
