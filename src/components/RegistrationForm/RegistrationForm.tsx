import { useState } from "react";
import { toast } from "react-toastify";
import { registerMember } from "../../api/services/api";
import Validation from "../../validation/validation";

import styles from "./RegistrationForm.module.css";
import ReCAPTCHA from "react-google-recaptcha";

const RegistrationForm = () => {
  console.log(process.env.REACT_APP_CAPTCHA_KEY);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    homePage: "",
  });
  const [tokenCaptcha, setTokenCaptcha] = useState("");

  // const [captchaImage, setCaptchaImage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // const fetchCaptcha = async () => {
  //   try {
  //     const data = await getCaptcha();
  //     setCaptchaImage(data);
  //   } catch (error) {
  //     toast.error("Error fetching captcha");
  //   }
  // };

  // useEffect(() => {
  //   fetchCaptcha();
  // }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleCaptchaRefresh = async () => {
  //   const data: string = await getCaptcha();
  //   setCaptchaImage(data);
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!Validation.validateEmail(formData.email)) {
      setEmailError("Please enter a valid email address");
      return;
    } else {
      setEmailError("");
    }

    if (!Validation.validatePassword(formData.password)) {
      setPasswordError("Password must be between 4 and 8 characters");
      return;
    } else {
      setPasswordError("");
    }

    try {
      await registerMember(formData, tokenCaptcha);
      toast.success("You have successfully registered");
      setFormData({
        name: "",
        email: "",
        password: "",
        homePage: "",
      });
      setTokenCaptcha("");
    } catch (error) {
      toast.error("Error during registration");
    }
  };

  function onChange(value: string) {
    setTokenCaptcha(value);
  }

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h2 className={styles.formTitle}>Registration Form</h2>

      <label className={styles.formLabel}>
        Full Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={styles.formInput}
          placeholder="Enter your full name"
          required
        />
      </label>

      <label className={styles.formLabel}>
        Email Address:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={styles.formInput}
          placeholder="Enter your email address"
          required
        />
        {emailError && <span className={styles.error}>{emailError}</span>}
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

      <label className={styles.formLabel}>
        Website:
        <input
          type="text"
          name="homePage"
          value={formData.homePage}
          onChange={handleChange}
          className={styles.formInput}
          placeholder="Enter your website URL"
        />
      </label>

      {/* <label className={styles.formLabel}>
        <p className={styles.formSubtitle}>
          Please confirm that you are not a robot.
        </p>
        <div className={styles.captcha_block}>
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
        </div>
        <input
          type="text"
          name="captcha"
          value={formData.captcha}
          onChange={handleChange}
          className={styles.formInput}
          placeholder="Enter the captcha"
          required
        />
      </label> */}
      <div
        className={styles.recaptcha}
        style={{ transform: "scale(0.85)", transformOrigin: "0 0" }}
      >
        <ReCAPTCHA
          sitekey={process.env.REACT_APP_CAPTCHA_KEY!}
          onChange={onChange as ((token: string | null) => void) | undefined}
        />
      </div>

      <button type="submit" className={styles.submitButton}>
        Sign Up
      </button>
    </form>
  );
};

export default RegistrationForm;
