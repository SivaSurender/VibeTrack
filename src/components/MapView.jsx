import React from "react";
import styles from "./Map.module.css";
import { useSearchParams } from "react-router-dom";

function MapView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return (
    <div className={styles.mapContainer}>
      MapView
      <h1>
        Position of selected country : {lat}, {lng}
      </h1>
      <button onClick={() => setSearchParams({ lat: 20, lng: 20 })}>
        Change position
      </button>
    </div>
  );
}

export default MapView;
