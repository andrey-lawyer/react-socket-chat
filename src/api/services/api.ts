import axios from "axios";
import { ILogin, IRegister } from "../../types/data.types";


axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

export async function registerMember(
  member: IRegister,
  captchaToken: string
): Promise<string> {
  console.log(member);
  const { data } = await axios.post("auth/register", member, {
    headers: {
      recaptcha: captchaToken,
    },
    withCredentials: true,
  });
  return data;
}

export async function loginMember(member: ILogin) {
  const { data } = await axios.post("auth/login", member);
  return data;
}
