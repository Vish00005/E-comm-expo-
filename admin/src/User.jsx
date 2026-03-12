import React, { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("https://e-comm-ufx2.onrender.com/check", {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome User {user.name}</h1>
          <p>{user.email}</p>
          <p>{user.id}</p>
        </div>
      ) : (
        <h1>Please login</h1>
      )}
      <p>{JSON.stringify(user)}</p>
    </div>
  );
}

export default Admin;
