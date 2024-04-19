import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./register.css";

const Register = () => {
  const navigate = useNavigate()
  const [credentials, SetCredentials] = useState({
    username: undefined,
    email: undefined,
    country: undefined,
    phone: undefined,
    password: undefined,
  });
  const { loading, error, dispatch } = useContext(AuthContext);
  
console.log(credentials)
  const handleChange = (e) => {
    SetCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleClick = async(e) => {
    e.preventDefault();
    dispatch({type: "LOGIN_START"})
    try {
      console.log("credentials +++>>>", credentials)
        const res = await axios.post(`${import.meta.env.REACT_APP_API}/auth/register`, credentials);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data});
        navigate("/");
    } catch (error) {
        dispatch({type: "LOGIN_FAILURE", payload: error.response})
        navigate("/login");
    }
  }
  return (
    <div className="register">
        <div className="rContainer">
            <input 
                type="text" 
                placeholder="username"
                id="username"
                onChange={handleChange}
                className="lRegister"
            />
            <input 
                type="email" 
                placeholder="email"
                id="email"
                onChange={handleChange}
                className="lRegister"
            />
            <input 
                type="number" 
                placeholder="phone number"
                id="phone"
                onChange={handleChange}
                className="lRegister"
            />
            <input 
                type="text" 
                placeholder="country"
                id="country"
                onChange={handleChange}
                className="lRegister"
            />
            <input 
                type="password" 
                placeholder="password"
                id="passsword"
                onChange={handleChange}
                className="lRegister"
            />
            <button disabled={loading} onClick={handleClick} className="lButton">Register</button>
            {error && <span>{error.message}</span> }
            <p>Have an account? <Link to="/login">Login</Link></p>
        </div>
    </div>
    );
};

export default Register;
