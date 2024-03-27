import React, { useState, useEffect } from "react";
import UserService from "../services/UserService";
import "./BookList.css";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    retrieveUsers();
  }, []);

  const retrieveUsers = () => {
    UserService.getAll()
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div className="book-list-container">
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
