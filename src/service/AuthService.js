import axios from "axios";
const API_URL = "http://localhost:9090/web-test";


class AuthService {

  async login(email, password) {
    return axios.post(API_URL + "/login", {
      email,
      password
    })
  }

  logout() {
    localStorage.clear()
  }

  saveResponseAuth(info) {
    localStorage.setItem("id", JSON.stringify(info.id));
    localStorage.setItem("email", JSON.stringify(info.email));
    localStorage.setItem('accessToken', info.accessToken);
    localStorage.setItem('refreshToken', info.refreshToken);

  }

  async getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
  async getAccessToken() {
    return localStorage.getItem('accessToken')
  }
}

export default new AuthService();