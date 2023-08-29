import React, { useState, useEffect } from 'react'
import { Row, Col, Nav, Navbar } from 'react-bootstrap';
import {faRightToBracket} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

import { Dashboard } from './Dashboard';
import {Statement} from './Statement';
import {Transfer} from './Transfer';
import {AcDetails} from './AcDetails';


import Auth from '../../Services/Auth'
import { MDBBtn } from 'mdb-react-ui-kit';

export const DashboardPage = () => {
    const [page, setPage] = useState('dashboard');
    const [user, setUser] = useState('');
    const [loaded, setLoaded] = useState(false)
    const navigate = useNavigate();
    const { getToken } = Auth();

    useEffect(() => {
        //To check if already Logged in
        if(!getToken()){
            navigate('/login', {replace: true})
        }
        setUser(Auth().getUser());
    }, [])
    
    const Logout = () => {
        Auth().removeToken();
        navigate('/home', {replace: true})
    }

  return (
    <Row className='m-0 p-0 h-100' style={{backgroundColor: 'white'}}>
        <Col md={2} className='p-0 dashboard-sidebar'>
            <Navbar bg="dark" data-bs-theme="dark" className='align-items-center justify-content-between flex-column text-white  dashboard-sidebar'>
                <Navbar.Brand className='text-center text-white fs-3 mt-2'>Hello, {user.charAt(0).toUpperCase() + user.slice(1)}</Navbar.Brand>
                
                <Navbar.Toggle />
                <Navbar.Collapse className='justify-content-end'>
                <Nav className='flex-column text-white' defaultActiveKey={'dashboard'} onSelect={key => setPage(key)}>
                    <Nav.Link className={['w-100 mx-1 px-3 text-center text-white',(page==='dashboard'?'fw-bold':'')].join(' ')} eventKey={'dashboard'}>
                        DashBoard</Nav.Link>
                    <Nav.Link className={['w-100 mx-1 px-3 text-center text-white',(page==='statement'?'fw-bold':'')].join(' ')} eventKey={'statement'}>A/C Statements</Nav.Link>
                    <Nav.Link className={['w-100 mx-1 px-3 text-center text-white',(page==='transfer'?'fw-bold':'')].join(' ')} eventKey={'transfer'}>Transfer Funds</Nav.Link>
                    {/* <Nav.Link className={['w-100 mx-1 px-3 text-center text-white',(page==='details'?'fw-bold':'')].join(' ')} eventKey={'details'}>Account Details</Nav.Link> */}
                </Nav>
                </Navbar.Collapse>
                <MDBBtn color='light' rippleColor='dark' onClick={Logout}>
                <FontAwesomeIcon icon={faRightToBracket} />
                    &nbsp;&nbsp;Logout
                    </MDBBtn>
            </Navbar>
        </Col>
        <Col className='p-0 d-flex justify-content-center align-items-center'>
            {loaded == true && 
            ((page==='dashboard')&&<Dashboard/>)
            ((page==='statement')&&<Statement/>)
            ((page==='transfer')&&<Transfer/>)
            /* {(page==='details')&&<AcDetails/> */
            }
        </Col>
    </Row>
  )
}
