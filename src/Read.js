import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Read() {
  const [user, setUser] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/users/" + id)
      .then((response) => setUser(response.data))
      .catch((error) => console.log(error));
  }, [id]);

  console.log(user);
  return (
    <>
      <div>
        <h3>Name: {user.name}</h3>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
      </div>
      <div>
        <button onClick={() => navigate(`/update/${id}`)}>Edit</button>
        <button onClick={() => navigate("/")}>Back</button>
      </div>
    </>
  );
}

export default Read;
