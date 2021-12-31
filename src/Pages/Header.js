import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="header-nav">
      <div className="container">
        <Button variant="outline-light" className="btn common-btn">
          Logout
        </Button>
        <Link to="/editProfile">
          <Button variant="outline-light" className="common-btn">
            Edit Profile
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
