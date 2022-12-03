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
  
 async getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
  async getAccessToken(){
    return localStorage.getItem('accessToken')
  }
}

export default new AuthService();