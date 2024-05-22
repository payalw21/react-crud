import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Create() {
  const random = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

  const [newUser, setNewUser] = useState({
    id: random,
    name: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/users", newUser)
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={(e) => {
            setNewUser({ ...newUser, name: e.target.value });
          }}
        />
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="text"
          onChange={(e) => {
            setNewUser({ ...newUser, email: e.target.value });
          }}
        />
        <label htmlFor="phone">Phone:</label>
        <input
          id="phone"
          name="phone"
          type="text"
          onChange={(e) => {
            setNewUser({ ...newUser, phone: e.target.value });
          }}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default Create;
