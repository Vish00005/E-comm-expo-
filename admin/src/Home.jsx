import { Link } from "react-router-dom";

function Home() {
    const url = "https://e-comm-ufx2.onrender.com"
    return (
      <div>
        <h1>home</h1>
        <Link to={`${url}/back`}>Backened</Link>
        <Link to={`${url}/api/admin`}>Admin</Link>
      </div>
    );
  }
  
  export default Home;