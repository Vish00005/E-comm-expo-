import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/dashboard", {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div>{user ? <h1>Welcome {user.name}</h1> : <h1>Please login</h1>}</div>
    </>
  );
}

export default Admin;
