import React from "react";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCity } from "../context/CityContextProvider";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function CityItem({ city }) {
  const {
    cityName,
    emoji,
    date,
    id,
    position: { lat, lng },
  } = city;
  const { currCity } = useCity();

  return (
    <Link
      className={`${styles.cityItem} ${
        currCity.id === id && styles["cityItem--active"]
      }`}
      to={`${id}?lat=${lat}&lng=${lng}`}
    >
      <li>
        <span className={styles.emoi}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>&times; </button>
      </li>
    </Link>
  );
}

export default CityItem;
