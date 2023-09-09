import React from "react";
import styles from "./AppLayout.module.css";
import SideBar from "../components/SideBar";
import MapView from "../components/MapView";
import User from "../components/User";
import { useAuth } from "../context/PlaceHolderAuthContext";

function AppLayout() {
  const { isAuthenticated } = useAuth();
  return (
    <div className={styles.app}>
      <SideBar />
      <MapView />
      <User />
    </div>
  );
}

export default AppLayout;
