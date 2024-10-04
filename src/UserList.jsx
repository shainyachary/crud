import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserList = () => {
  const [lists, listset] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/users`)
      .then((res) => res.json())
      .then((data) => {
        listset(data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const handleEdit = (id) => {
    navigate("/user/edituser/" + id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      fetch(`http://localhost:5000/users/` + id, {
        method: "DELETE",
      })
        .then((res) => {
          alert("Removed Successfully");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const handleDetails = (id) => {
    navigate("/user/details/" + id);
  };

  return (
    <div>
      <h4>UserList:</h4>
      <button>
        <Link to="/user/create">Add +</Link>
      </button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {lists?.map((list, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{list?.name}</td>
              <td>{list?.email}</td>
              <td>
                <button onClick={() => handleEdit(list?.id)}>Edit</button>
                <button onClick={() => handleDelete(list?.id)}>Remove</button>
                <button onClick={() => handleDetails(list?.id)}>Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
