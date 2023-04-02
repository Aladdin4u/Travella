import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext);
  const handleClick = () => {
    window.localStorage.removeItem("user")
    window.location.href = "/"
  }
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{color: "inherit", textDecoration: "none"}}>
          <span className="logo">Travella</span>
        </Link>
        {user ? (
          <>`welcome ${user.username}` <button onClick={handleClick}>logout</button></>
        ) : (
          <div className="navItems">
            <Link to="/register">
            <button className="navButton">Register</button>
            </Link>
            <Link to="/login">
            <button className="navButton">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
