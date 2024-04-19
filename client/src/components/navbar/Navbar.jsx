import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import "./navbar.css";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const handleClick = () => {
    window.localStorage.removeItem("user");
    window.location.href = "/";
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Travella</span>
        </Link>
        <div className="navItems">
          {user ? (
            <>
              {user.img ? (
                <image src={user.img} alt={user.username} className="img"/>
              ) : (
                <FontAwesomeIcon
                  icon={faCircleUser}
                  size="2x"
                  className="arrow"
                />
              )}
              <button onClick={handleClick}>logout</button>
            </>
          ) : (
            <>
              <Link to="/register">
                <button className="navButton">Register</button>
              </Link>
              <Link to="/login">
                <button className="navButton">Login</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
