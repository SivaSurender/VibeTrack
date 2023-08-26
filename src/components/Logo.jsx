import styles from "./Logo.module.css";
import logo from "../logo.png";
import { useNavigate } from "react-router-dom";
function Logo() {
  const navigate = useNavigate();
  return (
    <img
      onClick={() => navigate("/")}
      src={logo}
      alt="WorldWise logo"
      className={styles.logo}
    />
  );
}

export default Logo;
