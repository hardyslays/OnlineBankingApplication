import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCustomerById, postAdminEnable, getAccountById } from '../../Services/Admin';
import { ButtonGroup, Button, Card } from 'react-bootstrap';

import { postAdminDISABLE, postAdminCheck } from '../../Services/Admin';

export const DisableCustomer = () => {
    console.log("chl pda")
    const navigate = useNavigate()
    const {id} = useParams({});
    const [cust, setCust] = useState()
    const [loaded, setLoaded] = useState(false)
    const [check, setCheck] = useState(true)
    const [account, setAccount] = useState()

    useEffect(() => {
        getAccountById(id)
        .then(data => {
            console.log(data)
            setAccount(data)
            console.log("got something",account);
            getCustomerById(data.customerId)
            .then(data_cust => {
                console.log(data_cust)
                setCust(data_cust)
                setLoaded(true)
            })
            postAdminCheck(data.customerId).then(d=>setCheck(d));
        })
        
        
    }, [])



    const handleDisable = () => {
        console.log('Rejected')
        postAdminDISABLE(account.customerId)
        navigate('/admin/dashboard')
    }


    const handleEnable = () => {
        postAdminEnable(account.customerId)
        navigate('/admin/dashboard')
    }

  return (
    <>{loaded&&
        <Card className='m-3'>
            <Card.Header as='h4'>Customer ID: {cust.customerId}</Card.Header>
    
            <Card.Text className='mx-3 my-2'>Account Number: {account.accountNumber}</Card.Text>
            <Card.Text className='mx-3 my-2'>Username:{account.netBankingUserName}</Card.Text>
            <Card.Text className='mx-3 my-2'>Balance: {account.balance}</Card.Text>
            <Card.Text className='mx-3 my-2'>First Name: {cust.firstName}</Card.Text>
            <Card.Text className='mx-3 my-2'>Middle Name:{cust.middleName==="null"?"":cust.middleName}</Card.Text>
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
                    {check?
                    <Button variant='danger' onClick={handleDisable}>Disable</Button>
                        :
                    <Button variant='primary' onClick={handleEnable}>Enable</Button>
                    }
                    </ButtonGroup>
            </Card.Footer>
        </Card>
    }
    </>
  )
}
