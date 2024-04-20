import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

const CustomNav = ({ brandName, brandLink, links, isDashboard }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = async (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchQuery}`);
  };
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      data-bs-theme="dark"
      className="bg-body-tertiary justify-content-between"
    >
      <Container>
        <Navbar.Brand href={brandLink}>{brandName}</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="justify-content-end flex-grow-1">
            {isDashboard && (
              <Form className="search" onSubmit={(e) => handleSearch(e)}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Form>
            )}
            {links.map((link, index) => (
              <Nav.Link key={index} href={link.url}>
                {link.label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNav;
