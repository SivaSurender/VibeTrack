import React from "react";
import styles from "./AppLayout.module.css";
import SideBar from "../components/SideBar";
import MapView from "../components/MapView";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className={styles.app}>
      <SideBar />
      <MapView />
    </div>
  );
}

export default AppLayout;
