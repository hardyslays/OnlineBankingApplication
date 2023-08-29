import React,{useState,useEffect} from 'react'
import { MDBCard, MDBCardHeader,MDBCardBody,MDBBtn,MDBCardFooter } from 'mdb-react-ui-kit'
import { useParams, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { getTransactionById } from '../../Services/Api'

export const TransferSuccess = () => {
    const {id} = useParams({});
    const navigate = useNavigate();
    const [data, setData] = useState({
        amount:0,
        fromAccount:0,
        beneficiaryAccount:0,
        methodOfPayment:0
    });

    useEffect(() => {
        getTransactionById(id)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setData(data)
        })
    }, []);

  return (
    <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
        <MDBCard className='p-2'>
            <MDBCardHeader className='text-center text-success fs-2'>
                TRANSFER SUCCESSFUL
            </MDBCardHeader>
            <MDBCardBody className='text-center'>
            <FontAwesomeIcon className="w-25 h-25" icon={faCircleCheck} style={{color: "#10ea14"}} />
            </MDBCardBody>
            <MDBCardBody className='text-center'>
                <div className='d-flex justify-content-between'>
                    <p className='fs-5 text-left'>Transaction ID</p>
                    <p className='fs-5 text-right'>{id}</p>
                </div>
                <div className='d-flex justify-content-between'>
                    <p className='fs-5 text-left'>From Account</p>
                    <p className='fs-5 text-right'>{data.fromAccount}</p>
                </div>
                <div className='d-flex justify-content-between'>
                    <p className='fs-5 text-left'>To Account</p>
                    <p className='fs-5 text-right'>{data.beneficiaryAccount}</p>
                </div>
                <div className='d-flex justify-content-between'>
                    <p className='fs-4 text-left'>Amount</p>
                    <p className='fs-4 text-right'>{(data.amount).toLocaleString('en-IN', { style: 'currency', currency: 'INR'})}</p>
                </div>
                <div className='d-flex justify-content-between'>
                    <p className='fs-5 text-left'>Transaction Type</p>
                    <p className='fs-5 text-right'>{data.methodOfPayment}</p>
                </div>
            </MDBCardBody>

            <MDBCardFooter className='text-center'>
                <MDBBtn onClick={() => navigate('/dashboard')} >GO BACK TO DASHBOARD</MDBBtn>
            </MDBCardFooter>

        </MDBCard>
    </div>
  )
}
