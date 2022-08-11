import "./Login.css";

import Input from "../Input/Input";
import PropTypes from "prop-types";
import React from "react";

function Login({ handleLogin }) {
  const [username, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin({
      username,
      password,
    });
  };

  return (
    <div className="LoginContainer">
      <form onSubmit={handleSubmit} className="LoginForm">
        <Input
          label="Username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          type={"text"}
          id={"username"}
        />

        <Input
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={"password"}
          id={"password"}
        />
        <button type="submit" id="login-button">Login</button>
      </form>
    </div>
  );
}


Login.displayName = "Login";

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default Login;
