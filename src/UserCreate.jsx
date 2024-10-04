import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserCreate = () => {
  const [id, idset] = useState(null); // ID initialized to null
  const [name, nameset] = useState("");
  const [email, emailset] = useState("");
  const navigate = useNavigate();

  // Fetch existing users and set the next available ID
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => {
        // Find the highest existing ID and increment by 1 for the new ID
        const maxId = data.reduce((acc, curr) => Math.max(acc, curr.id), 0);
        idset(maxId + 1);
      })
      .catch((err) => {
        console.log("Error fetching users: ", err.message);
      });
  }, []); // Empty dependency array to fetch users only once when component mounts

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { id, name, email }; // Create user object with dynamic ID

    // Save the new user
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => {
        window.alert("Saved Successfully");
        navigate("/"); // Redirect to home or users list
      })
      .catch((err) => {
        console.log("Error saving user: ", err.message);
      });
  };

  return (
    <div>
      <h4>UserCreate</h4>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "200px",
          gap: "1em",
        }}
      >
        <input
          value={id || ""}
          disabled
          placeholder="ID will be auto-generated"
        />
        <input
          value={name}
          onChange={(e) => nameset(e.target.value)}
          placeholder="Name"
        />
        <input
          value={email}
          onChange={(e) => emailset(e.target.value)}
          placeholder="Email"
        />
        <button type="submit">Save</button>
        <button>
          <Link to="/">Back</Link>
        </button>
      </form>
    </div>
  );
};

export default UserCreate;
