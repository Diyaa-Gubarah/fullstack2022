import "./Logout.css";

import PropTypes from "prop-types";
import React from "react";

function Logout({ user, handleLogout }) {
  return (
    <div className="LogoutContainer">
      <p>{user.username} logged in</p>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
}

Logout.displayName = "Logout";
Logout.propTypes = {
  user: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default Logout;
