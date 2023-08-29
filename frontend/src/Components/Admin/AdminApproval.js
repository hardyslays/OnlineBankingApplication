import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCustomerById } from '../../Services/Admin';
import { ButtonGroup, Button, Card } from 'react-bootstrap';

import { postAdminApprove } from '../../Services/Admin';

export const AdminApproval = () => {
    const navigate = useNavigate()
    const [loaded, setLoaded] = useState(false)
    const {id} = useParams({});
    const [cust, setCust] = useState()

    useEffect(() => {
        getCustomerById(id)
        .then(data => {
            console.log(data)
            setCust(data)

            setLoaded(true)
        })
    }, [])

    const handleApprove = () => {
        postAdminApprove(id)
        .then(data => {
            console.log(data)
            navigate('/admin/dashboard')
        })
    }

    const handleReject = () => {
        console.log('Rejected')
        navigate('/admin/dashboard')
    }

  return (
    <>
    {
        loaded?
        <Card className='m-3'>
            <Card.Header as='h4'>Customer ID: {cust.customerId}</Card.Header>
    
            <Card.Text className='mx-3 my-2'>First Name: {cust.firstName}</Card.Text>
            <Card.Text className='mx-3 my-2'>Middle Name:{cust.middleName}</Card.Text>
            <Card.Text className='mx-3 my-2'>Last Name: {cust.lastName}</Card.Text>
            <Card.Text className='mx-3 my-2'>Father's Name: {cust.fatherName}</Card.Text>
            <Card.Text className='mx-3 my-2'>Mobile Number: {cust.mobile}</Card.Text>
            <Card.Text className='mx-3 my-2'>Email ID: {cust.emailId}</Card.Text>
            <Card.Text className='mx-3 my-2'>Aadhar number: {cust.adharNumber}</Card.Text>
            <Card.Text className='mx-3 my-2'>Date of Birth: {cust.dob}</Card.Text>
            <Card.Text className='mx-3 my-2'>Resdential Address: {cust.residentialLine1} {cust.residentialLine2} {cust.residentialLandmark} {cust.residentialState} {cust.residentialPincode}</Card.Text>
            <Card.Text className='mx-3 my-2'>Permanent Address: {cust.permanentLine1} {cust.permanentLine2} {cust.permanentLandmark} {cust.permanentState} {cust.permanentPincode}</Card.Text>
            <Card.Text className='mx-3 my-2'>Occupation Type: {cust.occupationType}</Card.Text>
            <Card.Text className='mx-3 my-2'>Source Of Income: {cust.sourceOfIncome}</Card.Text>
            <Card.Text className='mx-3 my-2'>Gross Annual Income: {cust.grossAnnualIncome}</Card.Text>
            <Card.Text className='mx-3 my-2'>Opted for Net Banking: {cust.netBankingBool?'Yes':'No'}</Card.Text>
            <Card.Text className='mx-3 my-2'>Opted for Debit Card: {cust.debitCardBool?'Yes':'No'}</Card.Text>

            <Card.Footer className='d-flex justify-content-center'>
                <ButtonGroup>
                    {!cust.approvedBool?
                    <Button variant='success' onClick={handleApprove}>Approve</Button>
                    :""}
                    {/* <Button variant='danger' onClick={handleReject}>Reject</Button> */}
                </ButtonGroup>
            </Card.Footer>
        </Card>
        :
        <Card className='m-3'>
            <Card.Header as='h4'>Customer ID</Card.Header>
    
            <Card.Text className='mx-3 my-2'>First Name</Card.Text>
            <Card.Text className='mx-3 my-2'>Middle Name</Card.Text>
            <Card.Text className='mx-3 my-2'>Last Name</Card.Text>
            <Card.Text className='mx-3 my-2'>Father's Name</Card.Text>
            <Card.Text className='mx-3 my-2'>Mobile Number</Card.Text>
            <Card.Text className='mx-3 my-2'>Email ID</Card.Text>
            <Card.Text className='mx-3 my-2'>Aadhar number</Card.Text>
            <Card.Text className='mx-3 my-2'>Date of Birth</Card.Text>
            <Card.Text className='mx-3 my-2'>Resdential Address</Card.Text>
            <Card.Text className='mx-3 my-2'>Permanent Address</Card.Text>
            <Card.Text className='mx-3 my-2'>Occupation Type</Card.Text>
            <Card.Text className='mx-3 my-2'>Source Of Income</Card.Text>
            <Card.Text className='mx-3 my-2'>Gross Annual Income</Card.Text>
            <Card.Text className='mx-3 my-2'>Opted for Net Banking</Card.Text>
            <Card.Text className='mx-3 my-2'>Opted for Debit Card</Card.Text>

            <Card.Footer className='d-flex justify-content-center'>
                <ButtonGroup>
                    <Button variant='success'>Approve</Button>
                    <Button variant='danger'>Reject</Button>
                </ButtonGroup>
            </Card.Footer>
        </Card>
    }
    </>
  )
}
