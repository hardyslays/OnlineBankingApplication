import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export const HeaderLogout = () => {
    const navigate = useNavigate();

  return (
    <Navbar expand='lg' className="bg-body-tertiary m-0">
        <Container>
            <Navbar.Brand onClick={() => navigate('/home')} style={{cursor:'pointer', fontSize:'1.75em', fontWeight:"600"}}>
                ONLINE BANKING SYSTEM
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className='justify-content-end'>
            <Nav onSelect={(link) => navigate('/'+link)}>
            <Navbar.Brand className='me-5'>
                Hello There
            </Navbar.Brand>
            <Nav.Link className='me-2' eventKey={'login'}>
                Login
            </Nav.Link>
            <Nav.Link className='me-2' eventKey={'register'}>
                Register
            </Nav.Link>
            <Nav.Link className='me-2' eventKey={'apply'}>
                Apply for a new Account
            </Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}
