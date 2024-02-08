import { FormEvent, useState } from "react";
import { loginMember } from "../../api/services/api"; // Подставьте свою функцию для запроса на логин
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = await loginMember(formData);
      const token = data.token;

      // Сохраняем токен в локальном хранилище
      localStorage.setItem("token-member", token);

      console.log(data);
    } catch (error) {
      console.error("Error during login");
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <label className={styles.formLabel}>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={styles.formInput}
        />
      </label>
      <br />
      <label className={styles.formLabel}>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={styles.formInput}
        />
      </label>
      <br />
      <button type="submit" className={styles.submitButton}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
