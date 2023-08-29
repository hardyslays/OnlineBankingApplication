import React, {useState, useEffect} from "react";
import { MDBCard, MDBCardBody, MDBCardText, MDBBtn, MDBCardFooter, MDBModal, MDBModalTitle, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBInput, MDBValidation, MDBValidationItem } from 'mdb-react-ui-kit';

import { Row, Col, Container } from 'react-bootstrap'
import AvatarImg from '../../assets/default-avatar.png'
import { DetailsCard } from './DetailsCard';


const CustomerDetails = () => {

    useEffect(() => {
        
    },[])
  return (
    <Container>
      <MDBCard className='text-center'>
        <MDBCardText className='fs-4 pt-3 ps-5'><b>Personal Details</b></MDBCardText>
        <MDBCardBody className='d-flex justify-content-around'>
          <div>
            <p><b>Name:</b> Vaishnavi Deshpande</p>
            <p><b>Age:</b> 21</p>
            <p><b>DOB:</b> January 25, 2001</p>
            <p><b>Aadhar Number:</b> 1234 5678 9012</p>
            <p><b>Phone Number:</b> 9890765123</p>
            <p><b>Email Id:</b> vaish@gmail.com</p>
            <p><b>Address:</b> Wakad, Pune-411057</p>
          </div>
        </MDBCardBody>
        <hr style={{ borderTop: '1px solid white', width: '80%', margin: '0 auto' }} />
      </MDBCard>
    </Container>
  );
}




const ProfileImageCard = () =>
{
  return(
<Container>
    <MDBCard className='text-center'>
        <MDBCardText className='fs-4 pt-3'><b>Your Profile</b></MDBCardText>
        <div>
            <img className='shadow-4'
            src={AvatarImg}
            alt='avatar'
            style={{width: '80px'}}
            />
            <p><b>Vaishnavi</b></p>
        </div>
    </MDBCard>
</Container>

    
  )
}


export const AcDetails = () => {
  return (
        <Container>
            <Row>
            {/* Left Column */}
            <Col md={6}>
                <ProfileImageCard />
                <DetailsCard />
            </Col>

            {/* Right Column */}
            <Col md={6}>
                <div className="h-100 d-flex flex-column justify-content-center">
                <CustomerDetails />
                </div>
            </Col>
            </Row>
        </Container>
    );
};

