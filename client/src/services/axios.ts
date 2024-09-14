import { TOKENS } from "@/constants/token";
import a from "axios";
import Cookies from "js-cookie";
const axios = a.create();

axios.interceptors.request.use((req) => {
  const userToken = Cookies.get(TOKENS.AUTH_TOKEN_ID);
  const mechanicsToken = Cookies.get(TOKENS.MECHANICS_AUTH_TOKEN_ID);
  let cookies: string;

  if (userToken && mechanicsToken) {
    cookies = `${TOKENS.AUTH_TOKEN_ID}=${userToken}; ${TOKENS.MECHANICS_AUTH_TOKEN_ID}=${mechanicsToken}`;
  } else if (userToken) {
    cookies = `${TOKENS.AUTH_TOKEN_ID}=${userToken}`;
  } else if (mechanicsToken) {
    cookies = `${TOKENS.MECHANICS_AUTH_TOKEN_ID}=${mechanicsToken}`;
  } else {
    cookies = "";
  }

  req.headers = {
    ...req.headers,
    Cookie: cookies,
  } as any;

  return req;
});

export default axios;
