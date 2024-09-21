import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector } from 'react-redux';
import { updaterole } from '../slices/userroleslice.js'
import { useNavigate } from 'react-router-dom';


function Navbars() {
  const role = useSelector((state) => state.userRole?.role);
  console.log(role)
  const navigate = useNavigate();

  // If role is undefined, provide a fallback or handle accordingly
  const shopName = localStorage.getItem('namechange');


  return (
    <Navbar collapseOnSelect expand="lg" className="navbar">
      <Container>
        <Navbar.Brand href="/dashboard">{shopName}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {role == 'admin' ?  <> <Nav.Link href="#features">{role}</Nav.Link> 
            <Nav.Link href="/addproduct">Add Product</Nav.Link>
            <Nav.Link href="/setting">Setting</Nav.Link>
            
            </>
            : '' }
            <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link onClick={(e)=>{navigate('/myorders')}}>My Orders</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;