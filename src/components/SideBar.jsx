import React from "react";
import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";

function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <p>List of cities</p>
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy;
          <a
            className="twitter-link"
            target="_blank"
            href="https://sivasurender.github.io/BalaPortfolio/"
          >
            <b>Bala SS</b>
          </a>
          . Done in India with love ♥.
        </p>
      </footer>
    </div>
  );
}

export default SideBar;
