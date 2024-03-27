import React, { useState } from "react";
import axios from "axios";
import "./AddBookForm.css";

const AddBookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to backend with book data
      await axios.post("http://localhost:5001/api/books", {
        title,
        author,
        isbn,
      });
      // Reset form fields after successful submission
      setTitle("");
      setAuthor("");
      setIsbn("");
      alert("Book added successfully");
    } catch (error) {
      console.error("Error adding book:", error);
      alert("An error occurred while adding the book");
    }
  };

  return (
    <form className="add-book-form" onSubmit={handleSubmit}>
      <label>Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Author:</label>
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <label>ISBN:</label>
      <input
        type="text"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
      />
      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBookForm;
