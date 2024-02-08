import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

interface ILogin {
  email: string;
  password: string;
}

interface IRegister extends ILogin {
  name: string;
  captcha: string;
}

export async function getCaptcha(): Promise<string> {
  const { data } = await axios.get("captcha", { withCredentials: true });
  return data;
}

export async function registerMember(member: IRegister): Promise<string> {
  const { data } = await axios.post("auth/register", member, {
    withCredentials: true,
  });
  return data;
}

export async function loginMember(member: ILogin) {
  const { data } = await axios.post("auth/login", member);
  return data;
}
