import { auth } from "./firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const provider = new GoogleAuthProvider();

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const loggedInUser = result.user;
      setUser(loggedInUser);

      console.log("Name:", loggedInUser.displayName);
      console.log("Email:", loggedInUser.email);
      console.log("Photo:", loggedInUser.photoURL);
      console.log("UID:", loggedInUser.uid);

      const res = await axios.post(
        "https://e-comm-ufx2.onrender.com/api/auth/google",
        {
          name: loggedInUser.displayName,
          email: loggedInUser.email,
          photo: loggedInUser.photoURL,
          uid: loggedInUser.uid,
        },
        { withCredentials: true }
      );

      console.log("Backend response:", res.data);

      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/userPage");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Google Login</h1>

      {!user ? (
        <button onClick={login}>Sign in with Google</button>
      ) : (
        <div style={{ marginTop: "20px" }}>
          <h2>Welcome, {user.displayName}</h2>
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt="User Profile"
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
          )}
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
}

export default App;
