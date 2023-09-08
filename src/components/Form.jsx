// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useMemo, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { BASE_URL, useCity } from "../context/CityContextProvider";
import { useUrlParams } from "../hooks/CustomHooks";
import Spinner from "./Spinner";
import Message from "./Message";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export function convertToEmoji(countryCode) {
  const navigate = useNavigate();
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const pos = useUrlParams();

  const lat = pos[0];
  const lng = pos[1];
  const { isLoading, setIsLoading, setCities } = useCity();
  const navigate = useNavigate();

  function handleCreateCity(event) {
    event.preventDefault();

    const createdCity = {
      id: Date.now(),
      date: Date.now(),
      cityName,
      country,
      notes,
      position: {
        lat,
        lng,
      },
      emoji: "🇩🇪",
      country: cityName,
    };
    // createCity(createdCity);
    setCities((city) => [...city, createdCity]);
    navigate("/app/cities");
    createCity(createdCity);
  }
  async function createCity(createdCity) {
    const myHeader = new Headers();
    myHeader.append("Content-Type", "application/json");
    try {
      const init = await fetch(`${BASE_URL}cities/`, {
        method: "POST",
        body: JSON.stringify(createdCity),
        headers: myHeader,
      });
      if (init.ok) {
        const responseArray = await init.json(); // Parse the response as JSON
        console.log(responseArray); // This will be an array of objects
      } else {
        // Handle the error response here
        const errorResponse = await init.text(); // Parse the error response as text
        console.error("Request failed with status: " + init.status);
        console.error("Error response: " + errorResponse);
      }
    } catch (e) {
      console.log(e, "sdsdsd");
    }
  }

  useEffect(() => {
    if (!lat || !lng) return;
    async function fetchData() {
      setIsLoading(true);
      try {
        const init = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${pos[0]}&longitude=${pos[1]}`
        );
        const data = await init.json();
        console.log(data);
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName || "");
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [lat, lng]);

  if (isLoading) return <Spinner />;
  if (!lat || !lng)
    return (
      <Message message="Add your first city by clicking on a city from the map" />
    );
  console.log(notes);
  return (
    <form className={styles.form} onSubmit={(event) => handleCreateCity(event)}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd-MM-yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
