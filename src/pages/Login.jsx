import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import styles from "./Login.module.css";
import { useAuth } from "../context/PlaceHolderAuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const navigate = useNavigate();

  const { isAuthenticated, login } = useAuth();
  console.log(isAuthenticated, "asdsd");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app/", { replace: true });
    }
  }, [isAuthenticated]);

  return (
    <main className={styles.login}>
      <NavBar />
      <form className={styles.form} onSubmit={(e) => handleFormSubmit(e)}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
