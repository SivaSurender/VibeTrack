import React, { useEffect, useState } from "react";
import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useCity } from "../context/CityContextProvider";
import Button from "./Button";
import { useGeolocation } from "../hooks/CustomHooks";

function MapView() {
  const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const { cities, mapPos, setMapPos } = useCity();
  const {
    isLoading: loadingMapPos,
    position: geoPos,
    error,
    getPosition,
  } = useGeolocation();

  useEffect(() => {
    if (lat && lng) setMapPos([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geoPos) {
      const { lat: geoLat, lng: geoLong } = geoPos;
      setMapPos([geoLat, geoLong]);
    }
  }, [geoPos]);

  return (
    <div className={styles.mapContainer}>
      {!geoPos && (
        <Button type="position" onClick={() => getPosition()}>
          {loadingMapPos ? "Loading..." : "Use your current Location"}
        </Button>
      )}
      <MapContainer
        center={mapPos}
        zoom={15}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities?.map((each) => {
          return (
            <Marker
              position={[each.position.lat, each.position.lng]}
              key={each.id}
            >
              <Popup>
                <span>{each.emoji}</span>
                <span>{each.cityName}</span>
              </Popup>
            </Marker>
          );
        })}
        <ChangeCenter position={mapPos} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);

  return null;
}

const DetectClick = () => {
  const navigate = useNavigate();
  useMapEvent({
    click: (event) =>
      navigate(`form?lat=${event.latlng.lat}&lng=${event.latlng.lng}`),
  });
};
export default MapView;
