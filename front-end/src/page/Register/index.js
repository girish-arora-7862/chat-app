import { useEffect, useState } from "react";
import cogoToast from "cogo-toast";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Register = (props) => {
  const { socket } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    if (username && password) {
      socket.emit("register", {
        username,
        password,
      });
    }
  };

  useEffect(() => {
    socket.on("resgisterResponse", (data) => {
      if (data.status) {
        cogoToast.success("User Registration Successful");
        navigate("/");
      } else {
        cogoToast.error("User Registration Failed");
      }
    });
  }, []);

  const handleLoginRedirect = () => {
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-title">Register</div>
      <div className="login-form-wrapper">
        <div className="field-wrapper">
          <span className="login-form-title">Username : </span>
          <span>
            <input
              className="form-control field"
              value={username}
              onChange={handleUsernameChange}
            />
          </span>
        </div>
        <div className="field-wrapper">
          <span className="login-form-title">Password : </span>
          <span>
            <input
              className="form-control field"
              value={password}
              onChange={handlePasswordChange}
            />
          </span>
        </div>
        <div className="btn-wrapper">
          <button
            className="btn btn-lg btn-primary btn-custom"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>

      <div className="btn-wrapper">
        <button
          className="btn btn-lg btn-secondary btn-custom"
          onClick={handleLoginRedirect}
        >
          Back To Login
        </button>
      </div>
    </div>
  );
};

export default Register;
