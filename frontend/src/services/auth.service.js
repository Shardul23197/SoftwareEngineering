import axios from "axios";

const API_URL = "http://localhost:5000/auth/";

class AuthService {
  async login(email, password) {
    const response = await axios.post(API_URL + "login", {
        email,
        password
    });
    console.log(response);
    if (response.data.token) {
        localStorage.setItem("token", response.data.token);
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem("token");
  }

  register(username, email, password) {
    return axios.post(API_URL + "register", {
      username,
      email,
      password
    });
  }

  getCurrentToken() {
    return JSON.parse(localStorage.getItem('token'));;
  }
}

export default new AuthService();