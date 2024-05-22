import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Update() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3000/users/" + id)
      .then((response) => setUser(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put("http://localhost:3000/users/" + id, user)
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          type="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <label htmlFor="phone">Phone:</label>
        <input
          id="phone"
          name="phone"
          type="text"
          value={user.phone}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default Update;
