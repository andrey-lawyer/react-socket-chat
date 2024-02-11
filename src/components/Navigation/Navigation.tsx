import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className={styles.nav}>
      <div className="container">
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link
              to="/"
              className={location.pathname === "/" ? styles.active : ""}
            >
              Home
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              to="/registration"
              className={
                location.pathname === "/registration" ? styles.active : ""
              }
            >
              Registration
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              to="/login"
              className={location.pathname === "/login" ? styles.active : ""}
            >
              Login
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              to="/chat"
              className={location.pathname === "/chat" ? styles.active : ""}
            >
              Chat
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
