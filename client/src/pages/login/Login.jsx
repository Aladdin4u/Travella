import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        `${import.meta.env.REACT_APP_BASE_URL}/auth/login`,
        credentials
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      console.log(res.data);
      navigate("/");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
  };
  return (
    <form className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          name="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          name="password"
          onChange={handleChange}
          className="lInput"
        />
        <div>
          <button disabled={loading} onClick={handleSubmit} className="lButton">
            Login
          </button>
        </div>
        {error && <span>{error.message}</span>}
        <p>
          Create an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
