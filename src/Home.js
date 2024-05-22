import axios from "axios";
import React, { useEffect, useState } from "react";
// import "./index.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const baseURL = "http://localhost:3000/users";

  useEffect(() => {
    axios
      .get(`${baseURL}`)
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAddClick = () => {
    navigate("/create");
    console.log("Inside created");
  };

  const handleRead = (id) => {
    navigate(`/read/${id}`);
    console.log("Inside read ");
    // console.log(users);
  };

  const handleDelete = (id) => {
    const confirm = window.confirm("Would you like to Delete?");
    if (confirm) {
      axios
        .delete("http://localhost:3000/users/" + id)
        .then((response) => {
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <button onClick={handleAddClick}>Add</button>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
            >
              ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
            >
              Phone
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
          {users.map((data, index) => {
            return (
              <tr
                key={index}
                className="hover:bg-gray-100 dark:hover:bg-neutral-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200"
                >
                  {data.id}
                </th>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                  {data.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                  {data.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                  {data.phone}
                </td>
                <td>
                  <button key={data.id} onClick={(e) => handleRead(data.id)}>
                    Read
                  </button>
                  <button onClick={() => navigate(`/update/${data.id}`)}>
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(data.id);
                    }}
                    className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
