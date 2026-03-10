import React, { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("https://e-comm-ufx2.onrender.com/admin/dashboard", {
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
      {user ? <h1>Welcome User {user.name}</h1> : <h1>Please login</h1>}
    </div>
  );
}

export default Admin;
