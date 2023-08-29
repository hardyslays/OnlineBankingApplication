import { MDBCard , MDBCardText, MDBCardTitle, MDBInput, MDBSelect } from 'mdb-react-ui-kit';
import { MDBDropdown,MDBBtn, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';
import React, {useMemo, useState, useEffect} from 'react'
import { Row, Col, Container } from 'react-bootstrap'

import { DetailsCard } from './DetailsCard';
import { SummaryCard } from './SummaryCard';
import { PayeeBoard } from './PayeeBoard';
import { getPayees, postTransfer } from '../../Services/Api';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

const Col2 = () =>
{
    const navigate = useNavigate()
    const [form, setForm] = useState({})
    const [err, setErr] = useState({})
    const [payees, setPayees] = useState([])

    const setField = (field, value) => setForm({...form, [field]:value})
    const clearErr = () => setErr({})
    const setErrField = (field, value) => setErr({...err, [field]:value})

    const options = [
        { id: '1', value: 'rtgs', label: 'RTGS' },
        { id: '2', value: 'imps', label: 'IMPS' },
        { id: '3', value: 'netbanking', label: 'NetBanking' },
    ]

    const handleSelectChange = (val) => {
        setField('method', val)
    }

    const selectPayee = payee => {
        console.log(payee)
        setForm({...form, 'name': payee.beneficiaryName, 'acNumber': payee.beneficiaryAccountNumber})
    }

    const isValid = (form) => {
        setErr({})
        console.log(form)

        if(!form.name){
            setErrField('name', 'Name is required')
            return 0;
        }
        if(!form.acNumber){
            setErrField('acNumber', 'Account Number is required')
            return 0;
        }
        if(form.acNumber.length !== 14){
            setErrField('acNumber', 'Account Number must be 14 digits')
            return 0;
        }
        if(!form.method){
            setErrField('method', 'Transaction method is required')
            return 0;
        }
        if(!form.amount){
            setErrField('amount', 'Amount is required')
            return 0;
        }
        if(parseInt(form.amount) <= 0){
            setErrField('amount', 'Amount must be greater than 0')
            return 0;
        }
        if(parseInt(form.amount) > 10000){
            setErrField('amount', 'Transfer limit is 10,000 INR')
            return 0;
        }

        return 1;
    }

    useEffect(() => {
        getPayees()
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setPayees(data)
        })
    }, []);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(!isValid(form))return;

        const formData = {
            beneficiaryAccountNumber: form.acNumber,
            methodOfPayment: form.method.value,
            amount: form.amount
        }
        console.log(formData)

        postTransfer(formData)
        .then(res => {
            if(!res.ok){
                if(res.status === 500){
                    return res.json()
                    .then(data => {
                        console.log(data)
                        throw new Error(data.errorDescription)
                    })
                }

                return res.text()
                .then(data => {
                    console.log(data)
                    throw new Error(data)
                })
            }
            else{
                res.text()
                .then(data => {
                    console.log('resp: ', data)
                    const tid = data.split(' ')[2]
                    console.log(tid)
                    navigate(`/transaction/${tid}`)
                })
            }
        })
        .catch(err => {
            console.log(err)
            window.alert(err.message)
        })
    }

    return (
        <Container className='mb-3'>
    
        <MDBCardText className='pt-4 px-3 fs-3'>Transfer to</MDBCardText>

        <div className='px-3'>
        <MDBDropdown group className='shadow-0'>
            <MDBDropdownToggle color='light'>Beneficiary</MDBDropdownToggle>

            <MDBDropdownMenu>
                {payees.map(payee => (
                    <MDBDropdownItem key={payee.beneficiaryAccountNumber} onClick={() => selectPayee(payee)} className="p-2">{payee.beneficiaryName}</MDBDropdownItem>
                ))}
            </MDBDropdownMenu>
        </MDBDropdown>

        <div id='acNumberErr' className='ms-2 mb-1 form-text text-danger' style={{display:(!!err.acNumber)?'':'none'}}>{err.acNumber}</div>
        <MDBInput className={['m-2 p-2', (!!err.acNumber)?'is-invalid':''].join(' ')} label='Account Number' type='number' id='acNumber' value={form.acNumber} onChange={e => setField('acNumber', e.target.value)} />

        <div id='nameErr' className='ms-2 mb-2 form-text text-danger' style={{display:(!!err.name)?'':'none'}}>{err.name}</div>
        <MDBInput className={['m-2 p-2', (!!err.name)?'is-invalid':''].join(' ')} label='Beneficiary Name' type='text' id='name' value={form.name} onChange={e => setField('name', e.target.value)} />
        
        <div id='nameErr' className='ms-2 mb-2 form-text text-danger' style={{display:(!!err.method)?'':'none'}}>{err.method}</div>
        <Select className='w-100 p-0 m-0' aria-invalid={true} placeholder="Select transaction method" onChange={handleSelectChange} value={form.method} options={options}/>

        <div id='nameErr' className='ms-2 mb-2 form-text text-danger' style={{display:(!!err.amount)?'':'none'}}>{err.amount}</div>
        <MDBInput className={['m-2 p-2', (!!err.amount)?'is-invalid':''].join(' ')} label='Amount' type='number' value={form.amount} onChange={e => setField('amount', e.target.value)}/>
        <MDBBtn className='me-1' color='success' onClick={handleSubmit}>
        Continue
      </MDBBtn>
      </div>
             
    
</Container>

    )
}
export const Transfer = () => {
  return (
    <div className='w-100 m-0'>
    <Container>
            <Row>
                <Col md={6}>
                  <DetailsCard />
                  <SummaryCard />
                  
                </Col>
                <Col md={6}>
                    {/* Content for the right column */}
                    
                        <Col2/>
                        <PayeeBoard/>
                
                </Col>
            </Row>
        </Container>
        </div>
    
);

}

