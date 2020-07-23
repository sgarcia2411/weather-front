import React from 'react';

// Bootstrap
import { Navbar } from 'react-bootstrap';

const NavbarComponent = () => {
    return <Navbar bg="dark">
    <Navbar.Brand href="#home">
      <img
        src={require("../logo.svg")}
        width="30"
        height="30"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      />
      <span className="text-light">Weather App</span>
    </Navbar.Brand>
  </Navbar>
}

export default NavbarComponent;
