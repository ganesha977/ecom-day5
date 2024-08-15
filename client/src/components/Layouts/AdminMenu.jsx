import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Collapse, Navbar, NavbarBrand, Nav, NavItem, NavDropdown, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="d-flex">
      <Navbar bg="light" expand="lg">
        <NavbarBrand href="#home">Admin Menu</NavbarBrand>
        <Button
          onClick={() => setOpen(!open)}
          aria-controls="basic-navbar-nav"
          aria-expanded={open}
          className="ms-auto"
        >
          <span className="navbar-toggler-icon"></span>
        </Button>
        <Collapse in={open}>
          <div id="basic-navbar-nav">
            <Nav className="flex-column">
              <NavItem>
                <Nav.Link as={NavLink} to="/" end>
                  Home
                </Nav.Link>
              </NavItem>
              <NavItem>
                <Nav.Link as={NavLink} to="/admin">
                  Dashboard
                </Nav.Link>
              </NavItem>
              <NavDropdown title="Categories" id="category-dropdown">
                <NavDropdown.Item as={NavLink} to="/admin/create-category">
                  Create Category
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/admin/manage-categories">
                  Manage Categories
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Products" id="product-dropdown">
                <NavDropdown.Item as={NavLink} to="/admin/create-product">
                  Create Product
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/admin/product">
                  Manage Products
                </NavDropdown.Item>

              </NavDropdown>
              <NavItem>
                <Nav.Link as={NavLink} to="/admin/users">
                  Users
                </Nav.Link>
              </NavItem>
            </Nav>
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default AdminMenu;
