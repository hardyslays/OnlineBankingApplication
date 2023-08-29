import React, { useEffect } from 'react'
import { Col, Container, Row, Card, ListGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import BankImg from '../../assets/home_bg.jpg'
import Auth from '../../Services/Auth'

const HomeCard = () => {
    const navigate = useNavigate();

    return (
        <Card className='text-center mt-5'>
            <Card.Header className='p-3' as='h2'>WELCOME TO HCF BANK LTD.</Card.Header>
            <Card.Body>
                <Card.Text className='px-2 pb-1'>
                Where everyone is treated like family. We are a full service bank offering a wide range of banking services. We are committed to providing our customers with the best possible banking experience. We take pride in being "your" bank.
                </Card.Text>
            </Card.Body>
            <Card.Footer className='p-3'>
                <Card className='mx-3'>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item 
                            style={{cursor:'pointer'}} 
                            onClick={() => navigate('/login')}>
                            Already a Customer? Log In
                        </ListGroup.Item>
                        <ListGroup.Item 
                            style={{cursor:'pointer'}} 
                            onClick={() => navigate('/register')}>
                            New User? Register
                        </ListGroup.Item>
                        <ListGroup.Item 
                            style={{cursor:'pointer'}} 
                            onClick={() => navigate('/apply')}>
                            Apply for a new Account
                        </ListGroup.Item>
                        <ListGroup.Item 
                            style={{cursor:'pointer'}} 
                            onClick={() => navigate('/admin/login')}>
                            Log In as an Admin
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Card.Footer>
            <Card.Body>
            </Card.Body>
        </Card>
    )
}

export const Home = () => {

    const navigate = useNavigate();
    const { getToken } = Auth();
    useEffect(() => {
        //To check if already Logged in
        const token = getToken();
        // console.log('token: ', token)
        // console.log('val:', (!token))
        if(!!getToken()){
            navigate('/dashboard', {replace: true})
        }
    }, [])

  return (
    <div style={{width: '100%', height:'100%'}} className='bgGradient'>
    <Container className='w-100 h-100 m-0 p-0 d-flex justify-content-center align-items-center'>
        <Row className='align-items-center h-100'>
            <Col fluid="xs sm" md={8} className='m-0 p-0 h-100'>
                <div className='bg-image h-100'>
                    <img src={BankImg} className='w-100 h-100' alt='img' style={{objectFit:'cover', height: '100vh'}}></img>
                    <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                        <div className='d-flex justify-content-center align-items-center h-100'>
                            <p className='text-white' style={{fontSize: '2.5rem'}}>HCF Bank Ltd.</p>
                        </div>
                    </div>
                </div>
            </Col>
            <Col fluid="xs sm" md={4} className='my-3'>
                <Container>
                    <HomeCard/>
                </Container>
            </Col>
        </Row>
    </Container>
    </div>
  )
}
