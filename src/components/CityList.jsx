import React from "react";
import Spinner from "./Spinner";
import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Message from "./Message";

function CityList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;
  if (!cities || cities.length <= 0)
    return (
      <Message message="Add your first city by clicking on a city from the map" />
    );
  return (
    <div className={styles.cityList}>
      {cities.map((each) => {
        return <CityItem city={each} key={each.id} />;
      })}
    </div>
  );
}

export default CityList;
