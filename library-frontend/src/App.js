import React from "react";
import BookList from "./components/BookList";
import UserList from "./components/UserList";
import AddBookForm from "./components/AddBookForm";
import "./components/BookList.css";

function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: "center", fontWeight: "bold" }}>
        Library Management System
      </h1>
      <div className="container">
        <AddBookForm />
        <div className="row">
          <div className="col-6" style={{ borderRight: "1px solid #ccc" }}>
            <BookList />
          </div>
          <div className="col-6">
            <UserList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
