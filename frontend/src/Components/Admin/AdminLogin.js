import React from 'react'
import {AdminLoginForm} from '../Admin/AdminLoginForm'
import { Col, Container, Row } from 'react-bootstrap'

import BankImg from '../../assets/home_bg.jpg'

export const AdminLogin = () => {
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
                    <AdminLoginForm/>
                </Container>
            </Col>
        </Row>
    </Container>
    </div>
)
}
