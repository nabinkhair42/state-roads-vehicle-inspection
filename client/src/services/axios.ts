import { TOKENS } from "@/constants/token";
import a from "axios";
import Cookies from "js-cookie";

const axios = a.create();

axios.interceptors.request.use((req) => {
  const userToken = Cookies.get(TOKENS.AUTH_TOKEN_ID);
  const mechanicsToken = Cookies.get(TOKENS.MECHANICS_AUTH_TOKEN_ID);

  // Set the tokens in custom headers
  if (userToken) {
    req.headers[TOKENS.AUTH_HEADER_ID] = userToken; // User token in X-User-Token header
  }

  if (mechanicsToken) {
    req.headers[TOKENS.MECHANICS_AUTH_HEADER_ID] = mechanicsToken; // Mechanics token in X-Mechanics-Token header
  }

  req.withCredentials = false;

  return req;
});

export default axios;
