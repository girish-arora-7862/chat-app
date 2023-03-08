import { useEffect, useState } from "react";
import cogoToast from "cogo-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoginUsername } from "../../redux/reducer/userSlice";
import "./index.css";

const Register = (props) => {
  const { socket } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    if (username && password) {
      socket.emit("login", {
        username,
        password,
      });
    }
  };

  useEffect(() => {
    socket.on("loginResponse", (data) => {
      if (data.status) {
        cogoToast.success("Login Successful");
        dispatch(setLoginUsername(data.username));
        navigate("/rooms");
      } else {
        cogoToast.error("Invalid Credentails");
      }
    });
  }, []);

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <div className="login-title">Login</div>
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
          onClick={handleRegister}
        >
          Go To Register
        </button>
      </div>
    </div>
  );
};

export default Register;
