import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const UserEdit = () => {
  const { uid } = useParams();
  const [id, idset] = useState("");
  const [name, nameset] = useState("");
  const [email, emailset] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/users/" + uid)
      .then((response) => response.json())
      .then((data) => {
        idset(data.id);
        nameset(data.name);
        emailset(data.email);
      })
      .catch((err) => {
        console.log("Error fetching user: ", err.message);
      });
  }, [uid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { id, name, email };

    fetch(`http://localhost:5000/users/` + uid, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => {
        window.alert("Saved Successfully");
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <h4>UserEdit</h4>
      <form
        action=""
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "200px",
          gap: "1em",
        }}
      >
        <input value={id} disabled />
        <input
          value={name}
          onChange={(e) => nameset(e.target.value)}
          placeholder="Name"
        />
        <input
          value={email}
          onChange={(e) => emailset(e.target.value)}
          placeholder="email"
        />
        <button type="submit">Save</button>
        <button>
          <Link to="/">Back</Link>
        </button>
      </form>
    </div>
  );
};

export default UserEdit;
