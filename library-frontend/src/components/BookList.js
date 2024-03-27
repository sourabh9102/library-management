import React, { useState, useEffect } from "react";
import BookService from "../services/BookService";
import "./BookList.css";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  // useEffect(() => {
  //   retrieveBooks();
  // }, []);

  const retrieveBooks = () => {
    BookService.getAll()
      .then((response) => {
        setBooks(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleShowBook = () => {
    retrieveBooks();
  };

  const handleUpdate = (id) => {
    const updatedBook = books.find((book) => book.id === id);
    setSelectedBook(updatedBook);
  };

  const handleInputChange = (event) => {
    if (selectedBook) {
      const { name, value } = event.target;
      setSelectedBook({ ...selectedBook, [name]: value });
    }
  };

  const handleSaveUpdate = () => {
    BookService.update(selectedBook.id, selectedBook)
      .then(() => {
        retrieveBooks();
        setSelectedBook(null);
      })
      .catch((error) => {
        console.error("Error updating book:", error);
      });
  };

  const handleDelete = (id) => {
    // Implement delete functionality
    console.log("Delete book with ID:", id);
    BookService.delete(id)
      .then(() => {
        // Remove the deleted book from the state
        setBooks(books.filter((book) => book.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
      });
  };

  return (
    <div className="book-list-container">
      <h2>Book List</h2>
      <button className="show-list-button" onClick={handleShowBook}>
        Show Book List
      </button>
      <ul className="book-list">
        {books.map((book) => (
          <li key={book.id} className="book-item">
            {selectedBook && selectedBook.id === book.id ? (
              <div className="book-details">
                <input
                  type="text"
                  name="title"
                  value={selectedBook.title}
                  onChange={handleInputChange}
                  className="book-input"
                />
                <input
                  type="text"
                  name="author"
                  value={selectedBook.author}
                  onChange={handleInputChange}
                  className="book-input"
                />
                <input
                  type="text"
                  name="isbn"
                  value={selectedBook.isbn}
                  onChange={handleInputChange}
                  className="book-input"
                />
                <button onClick={handleSaveUpdate} className="save-button">
                  Save
                </button>
              </div>
            ) : (
              <div className="book-details">
                <span className="book-info">
                  {book.title} - {book.author}
                </span>
                <div className="button-group">
                  <button
                    onClick={() => handleUpdate(book.id)}
                    className="update-button"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
