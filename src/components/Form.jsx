// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useMemo, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { BASE_URL, useCity } from "../context/CityContextProvider";
import { useUrlParams } from "../hooks/CustomHooks";
import Spinner from "./Spinner";

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
  }
  async function createCity(createdCity) {
    const bods = JSON.stringify(createdCity);
    console.log(bods, "bods");
    try {
      const init = await fetch(BASE_URL + "cities", {
        method: "POST",
        body: createdCity,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(createdCity, "createdCity");
      console.log(init, "init");
      const data = init && (await init.text());
      console.log(data, "dusdgyhsgd");
    } catch (e) {
      console.log(e, "sdsdsd");
    }
  }

  useEffect(() => {
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
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
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
