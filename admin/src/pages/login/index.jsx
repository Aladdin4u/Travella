import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./login.scss";
import { AuthContext } from "../../context/AuthContext";
import { REACT_APP_BASE_URL } from "../../utils/config";

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
  const handleDemo = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    SetCredentials((prev) => ({
      ...prev,
      username: "demo",
      password: "demo",
    }));
    console.log(credentials);
    try {
      const res = await axios.post(
        `${REACT_APP_BASE_URL}/auth/login`,
        credentials
      );
      if(res.data.isAmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        navigate("/");
      } else {
      dispatch({ type: "LOGIN_FAILURE", payload: {message: "you are not allowed!"}, });
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        `${import.meta.env.REACT_APP_API}/auth/login`,
        credentials
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      console.log(res.data);
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
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <div className="lBtn">
          <button disabled={loading} onClick={handleClick} className="lButton">
            Login
          </button>
          <button
            disabled={loading}
            type="submit"
            onClick={handleDemo}
            className="lButton"
          >
            Demo
          </button>
        </div>
        {error && <span>{error.message}</span>}
        <p>
          Create an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
