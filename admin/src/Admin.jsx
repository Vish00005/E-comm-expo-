import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("https://e-comm-ufx2.onrender.com/check", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.id !== import.meta.env.VITE_ADMIN_ID) {
          console.log(res.data);
          console.log("Not an admin, redirecting...");
          navigate("/");
          return;
        }
        setUser(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Access Denied (Not an admin)", err);
        navigate("/");
      });
  }, [navigate]);

  const logout = () => {
    axios
      .post(
        "https://e-comm-ufx2.onrender.com/logout",
        {},
        { withCredentials: true },
      )
      .then((res) => {
        console.log(res.data);
        setUser(null);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome Admin {user.name}</h1>
          <p>{user.email}</p>
          <p>{user.id}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <h1>Please login</h1>
      )}
    </div>
  );
}

export default Admin;
