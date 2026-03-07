import { Link } from "react-router-dom";

function Home() {
    return (
      <div>
        <h1>home</h1>
        <Link to="http://localhost:3000/back">Backened</Link>
      </div>
    );
  }
  
  export default Home;