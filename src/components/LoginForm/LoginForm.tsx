import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import Validation from "../../validation/validation";
import { loginMember } from "../../api/services/api";

import styles from "./../RegistrationForm/RegistrationForm.module.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!Validation.validatePassword(formData.password)) {
      setPasswordError("Password must be between 4 and 8 characters");
      return;
    } else {
      setPasswordError("");
    }

    try {
      const data = await loginMember(formData);
      const token = data.token;
      toast.success("ou have successfully logged in");
      localStorage.setItem("token-member", token);
      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      toast.error("Error during login");
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h2 className={styles.formTitle}>Login Form</h2>

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

      <label className={styles.formLabel}>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={styles.formInput}
          placeholder="Enter your password"
          required
        />
        {passwordError && <span className={styles.error}>{passwordError}</span>}
      </label>

      <button type="submit" className={styles.submitButton}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
