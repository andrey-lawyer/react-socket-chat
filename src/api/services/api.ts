import axios from "axios";

// const ENV = import.meta.env.VITE_BACKEND_URL;
// const URL_BACK = ENV || "https://nest-sockets.onrender.com/";
// const URL_BACK = ENV || "http://localhost:3000/";
const URL_BACK = "http://localhost:3000/";

axios.defaults.baseURL = URL_BACK;

interface ILogin {
  email: string;
  password: string;
}

interface IRegister extends ILogin {
  name: string;
  captcha: string;
}

export async function getCaptcha(): Promise<string> {
  console.log(URL_BACK);
  const { data } = await axios.get("captcha", {
    withCredentials: true,
  });
  return data;
}

export async function registerMember(member: IRegister): Promise<string> {
  console.log(member);
  const { data } = await axios.post("auth/register", member, {
    withCredentials: true,
  });
  return data;
}

export async function loginMember(member: ILogin) {
  const { data } = await axios.post("auth/login", member);
  return data;
}
