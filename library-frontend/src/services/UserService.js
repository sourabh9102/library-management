import axios from "axios";

const API_URL = "http://localhost:5001/api/users";

class UserService {
  getAll() {
    return axios.get(API_URL);
  }

  // Add other methods as needed
}

export default new UserService();
