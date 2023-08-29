import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'

export const Header = () => {
  return (
    <Navbar expand='lg' className="bg-body-tertiary">
        <Container>
            <Navbar.Brand>ONLINE BANKING SYSTEM</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className='justify-content-end'>
            <Nav>
            <Navbar.Text className='me-5'>
                Hello, <strong>Ramesh</strong>
            </Navbar.Text>
            <Nav.Link className='me-2'>Dashboard</Nav.Link>
            <Nav.Link className='me-2'>Transactions</Nav.Link>
            <Nav.Link>Log Out</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}
