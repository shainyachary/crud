import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams();

  const [udata, getdata] = useState({});

  fetch("http://localhost:5000/users/" + id)
    .then((res) => res.json())
    .then((data) => getdata(data))
    .catch((err) => console.log(err));
  return (
    <div>
      <h4>UserDetails</h4>
      <ul>
        <li>{udata.name}</li>
        <li>{udata.email}</li>
        <Link to="/">Back</Link>
      </ul>
    </div>
  );
};

export default UserDetails;
