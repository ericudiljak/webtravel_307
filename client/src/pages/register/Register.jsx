import { Link } from "react-router-dom";
import { useState } from "react";
import "./register.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8800/api/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setErr(err.response.data.message); // Set error state to the error message
      } else {
        setErr("Registration failed. Please try again."); // Fallback error message
      }
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>TravelTales Register</h1>
          <p>
            Register to access the beautiful world of TravelTales website and experience the world in a beautiful way and find your perfect trip!
          </p>
          <span>Already have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input type="text" placeholder="Username" name="username" onChange={handleChange} />
            <input type="email" placeholder="Email" name="email" onChange={handleChange} />
            <input type="password" placeholder="Password" name="password" onChange={handleChange} />
            {err && <div className="error">{err}</div>} {/* Render error message */}
            <button type="submit" onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
