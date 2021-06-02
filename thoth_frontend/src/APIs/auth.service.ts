import axios from "axios";
import * as urls from './constants';

class AuthService {
  login(username: any, password: any) {
    return axios
      .post(urls.AUTH_BACKEND_URL + "/signin", { username, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username: string, email: string, password: string) {
    return axios.post(urls.AUTH_BACKEND_URL + "/signup", {
      username,
      email,
      password,
    });
  }
}

export default new AuthService();