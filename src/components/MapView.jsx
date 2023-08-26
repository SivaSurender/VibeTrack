import React from "react";
import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";

function MapView() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
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
