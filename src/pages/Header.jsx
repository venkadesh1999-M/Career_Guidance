import { Container,Navbar,Row, Col,} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router';
import { CIcon } from '@coreui/icons-react';
import {cilAccountLogout} from '@coreui/icons';


function Header(){
   
    let val = JSON.parse(localStorage.getItem("userdetails")); 
    const navigate = useNavigate()
    const ShowDetails = ()=>{
       if(val.details == ""){
        navigate("/details")
       }
       else if(val.goals == ""){
        navigate("/goal")
       }else{
        navigate("/show")
       }
    }

    const userDetails = ()=>{
        navigate("/details")
    }

    const Goals = ()=>{
        navigate("/goal")
    }
    return <div>
                <Navbar bg='dark' data-bs-theme="dark">
                    <Container>
                        <Navbar.Brand href="#home"><span style={{ color: "white" }}>Career Assistance</span></Navbar.Brand>
                            <Nav>
                                <NavDropdown title={<span style={{ color: "white" }}>User</span>} style={{ marginLeft: "10px" }}  id="nav-dropdown">
                                <Nav.Link 
                                    onClick={userDetails} 
                                    href="/details" 
                                    style={
                                            {
                                                color:"white",
                                                marginLeft:"10px"
                                            }
                                         }>
                                    <NavDropdown.Item><span style={{ color: "white" }}>User Details</span></NavDropdown.Item>
                                </Nav.Link>
                                <Nav.Link 
                                    onClick={Goals} 
                                    style={
                                            {
                                            color:"white",
                                            marginLeft:"10px"
                                            }
                                        }>
                                    <NavDropdown.Item><span style={{ color: "white" }}>Goals</span></NavDropdown.Item>
                                </Nav.Link>
                                <Nav.Link 
                                    style={
                                            {
                                                color:"white",
                                                marginLeft:"10px"
                                            }
                                          } onClick={ShowDetails}>
                                    <NavDropdown.Item><span style={{ color: "white" }}>Show Details</span></NavDropdown.Item>
                                </Nav.Link>
                                </NavDropdown>
                                    <Nav.Link href="/careerAi" 
                                        style={
                                                {
                                                    color:"white",
                                                    marginLeft:"10px"
                                                }
                                              }>Carrer Guidance
                                    </Nav.Link>
                                    <Nav.Link href="/resume"
                                         style={
                                                  {
                                                    color:"white",
                                                    marginLeft:"10px"
                                                  }
                                                }>Resume
                                    </Nav.Link> 
                                    <Nav.Link href="/quiz" 
                                        style={
                                                {
                                                    color:"white",
                                                    marginLeft:"10px"
                                                }
                                              }>Quiz
                                              </Nav.Link>
                                    <Nav.Link href="/intro" 
                                        style={
                                                {
                                                    color:"white",
                                                    marginLeft:"10px"
                                                }
                                              }>Self Introduction
                                    </Nav.Link>
                                    <Nav.Link href="/login" 
                                        style={
                                                {
                                                    color:"white",
                                                    marginLeft:"10px"
                                                }
                                              }>
                                    <CIcon icon={cilAccountLogout} size="sm"  
                                    style={
                                            { 
                                                width: "15px", 
                                                marginRight: "8px",
                                                color:"white" 
                                            }
                                        } />
                                    Logout</Nav.Link>
                            </Nav>  
                        </Container>
                </Navbar>
            </div>
}

export default Header