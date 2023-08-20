import React from "react";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";

import AppNav from "../components/AppNav";

function HomePage() {
  return (
    <div>
      <NavBar />
      <AppNav />
      <h1>Vibe Track</h1>
      <Link to="/app">Go to App</Link>
    </div>
  );
}

export default HomePage;
