import React from "react";
import styles from "./CityItem.module.css";
import { Link, useParams } from "react-router-dom";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function CityItem({ city }) {
  const { cityName, emoji, date, id } = city;
  return (
    <Link className={styles.cityItem} to={`${id}`}>
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
