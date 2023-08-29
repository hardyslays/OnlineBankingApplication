import React, {useState, useEffect} from 'react'
import { MDBCard , MDBCardText, MDBCardBody, MDBInput} from 'mdb-react-ui-kit'
import { getAccountCustomerDetails, getBalance } from '../../Services/Api'

export const DetailsCard = () => {
    const [balance, setBalance] = useState(1000000)
    const [acNumber, setAcNumber] = useState(10203040506070)
    const [acOwner, setAcOwner] = useState('Mr. Abc Xyz')

    useEffect(() => {
        //To fetch data from backend
        getAccountCustomerDetails()
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setAcNumber(data.accountNumber)
            setAcOwner(`${data.title} ${data.firstName} ${data.middleName} ${data.lastName}`)
            setBalance(data.balance)
        })
    }, []);

    return (
        <MDBCard className='m-3 mt-4 p-2 bg-dark shadow-1-strong text-white'>
            <MDBCardText className='pt-3 px-4 fs-2 '>Savings Account</MDBCardText>
            <MDBCard className='m-1 pt-3'>
            
                <div className='d-flex justify-content-around align-items-center'>
                <p className='fs-3'>A/C balance</p>
                <p className='fs-2'>INR {balance}</p>
                </div>
            <div className="border-bottom border-secondary border-2 mb-3"></div>
            <div className="d-flex justify-content-around" >
                <div className="account-number text-right" >
                    <MDBCardText className='pt-1 fs-5' style={{ marginTop: '0', marginBottom: '0', padding: '0' }}>A/C Number</MDBCardText>
                    <MDBCardText className='pt-0 fs-6 ' style={{ marginTop: '0', marginBottom: '0', padding: '0' }}>{acNumber}</MDBCardText>

                </div>
                <div className="account-owner text-right pb-2">
                    <MDBCardText className='pt-1 fs-5' style={{ marginTop: '0', marginBottom: '0', padding: '0' }}>A/C Owner</MDBCardText>
                    <MDBCardText className='pt-0 fs-6' style={{ marginTop: '0', marginBottom: '0', padding: '0' }}>{acOwner}</MDBCardText>
                </div>
            </div>
            </MDBCard>
        </MDBCard>
    )
}
