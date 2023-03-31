import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const [credentials, SetCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    SetCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  const handleDemo = (e) => {
    SetCredentials((prev) => ({
      ...prev,
      username: "demo",
      password: "demo",
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
  };
  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="passsword"
          onChange={handleChange}
          className="lInput"
        />
        <div className="lBtn">
          <button disabled={loading} onClick={handleClick} className="lButton">
            Login
          </button>
          <button disabled={loading} onClick={handleDemo} className="lButton">
            Demo
          </button>
        </div>
        {error && <span>error.message</span>}
        <p>
          Create an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
