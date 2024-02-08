import { useState, useEffect } from "react";
import { getCaptcha, registerMember } from "../../api/services/api";
import styles from "./RegistrationForm.module.css";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    captcha: "",
  });

  const [captchaImage, setCaptchaImage] = useState("");

  const fetchCaptcha = async () => {
    try {
      const data = await getCaptcha();
      setCaptchaImage(data);
    } catch (error) {
      console.error("Error fetching captcha:", error);
    }
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCaptchaRefresh = async () => {
    const data = await getCaptcha();
    setCaptchaImage(data);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    try {
      const data = await registerMember(formData);

      console.log(data);
    } catch (error) {
      console.error("Error during registration");
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <label className={styles.formLabel}>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={styles.formInput}
        />
      </label>
      <br />
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
      <label className={styles.formLabel}>
        Captcha:
        <img
          className={styles.captchaImage}
          src={`data:image/svg+xml;utf8,${encodeURIComponent(captchaImage)}`}
          alt="Captcha"
        />
        <button
          type="button"
          className={styles.refreshButton}
          onClick={handleCaptchaRefresh}
        >
          Refresh Captcha
        </button>
        <input
          type="text"
          name="captcha"
          value={formData.captcha}
          onChange={handleChange}
          className={styles.formInput}
        />
      </label>
      <br />
      <button type="submit" className={styles.submitButton}>
        Register
      </button>
    </form>
  );
};

export default RegistrationForm;
