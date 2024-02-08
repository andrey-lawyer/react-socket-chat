import axios from "axios";

const ENV = import.meta.env.VITE_BACKEND_URL;
const URL_BACK = ENV || "https://nest-sockets.onrender.com/";

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
  const { data } = await axios.get("captcha", {
    withCredentials: ENV ? true : false,
  });
  return data;
}

export async function registerMember(member: IRegister): Promise<string> {
  const { data } = await axios.post("auth/register", member, {
    withCredentials: ENV ? true : false,
  });
  return data;
}

export async function loginMember(member: ILogin) {
  const { data } = await axios.post("auth/login", member);
  return data;
}
