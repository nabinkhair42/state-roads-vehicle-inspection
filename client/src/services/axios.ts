import { TOKENS } from "@/constants/token";
import a from "axios";
import Cookies from "js-cookie";

const axios = a.create();

// axios.interceptors.request.use((req) => {
//   const userToken = Cookies.get(TOKENS.AUTH_TOKEN_ID);
//   const mechanicsToken = Cookies.get(TOKENS.MECHANICS_AUTH_TOKEN_ID);

//   // Set the tokens in custom headers
//   if (userToken) {
//     req.headers["X-User-Token"] = userToken; // User token in X-User-Token header
//   }

//   if (mechanicsToken) {
//     req.headers["X-Mechanics-Token"] = mechanicsToken; // Mechanics token in X-Mechanics-Token header
//   }

//   return req;
// });

export default axios;
