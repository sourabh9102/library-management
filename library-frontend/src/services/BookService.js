import axios from "axios";

const API_URL = "http://localhost:5001/api/books";

class BookService {
  getAll() {
    return axios.get(API_URL);
  }

  delete(id) {
    return axios.delete(`${API_URL}/${id}`);
  }

  update(id, bookData) {
    return axios.put(`${API_URL}/${id}`, bookData);
  }
}

export default new BookService();
