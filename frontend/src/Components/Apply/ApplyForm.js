import React, { useState } from 'react'
import { Form, Button, Card, Container, FloatingLabel } from 'react-bootstrap';
import {MDBCard, MDBCardHeader, MDBCardBody, MDBCardTitle, MDBInput, MDBCheckbox, MDBCardFooter} from 'mdb-react-ui-kit';
import { ListGroup } from 'react-bootstrap';

import { postApplyForm } from '../../Services/Api';
import { useNavigate } from 'react-router-dom';

export const ApplyForm = () => {
    const navigate = useNavigate()

    const [form, setForm] = useState({})
    const [err, setErr] = useState({})

    const setField = (field, value) =>{
        setForm({
        ...form,
        [field]:value
        })

        if(!!err[field])
        setErr({
            ...err,
            [field]:null
        })
    }

    const isValid = (form) => {
        setErr({})

        if(!form.fname){
            setErr({...err,'fname' : 'Please enter your First Name'})
            return 0;
        }

        if(!form.lname){
            setErr({...err,'lname' : 'Please enter your Last Name'})
            return 0;
        }

        
        if(!form.dob){
            setErr({...err,'dob' : 'Please enter your Date of Birth '})
            return 0;
        }
        
        
        if(!form.email){
            setErr({...err,'email' : 'Please enter your Email ID '})
            return 0;
        }

        
        if(!form.phone){
            setErr({...err,'phone' : 'Please enter your Phone Number '})
            return 0;
        }

        if(form.phone.length !== 10){
            setErr({...err,'phone' : 'Phone number should be of 10 digits '})
            return 0;
        }

        
        if(!form.aadhar){
            setErr({...err,'aadhar' : 'Please enter your Aadhar Number'})
            return 0;
        }
        
        if(form.aadhar.length !== 12){
            setErr({...err,'aadhar' : 'Aadharnumber houd be of 12 digits'})
            return 0;
        }

        if(!form.resiadd){
            setErr({...err,'resiadd' :'Plesae enter your Residential Address '})
            return 0;
        }
        
        if(!form.landmark){
            setErr({...err,'landmark' :'Please enter your Residential Landmark '})
            return 0;
        }

        if(!form.resistate){
            setErr({...err,'resistate' :'Please enter your Residential State '})
            return 0;
        }

        if(!form.pincode){
            setErr({...err,'pincode' :'Please enter your Residential Pincode '})
            return 0;
        }

        if(!form.permadd){
            setErr({...err,'permadd' :'Please enter your Permanent Address '})
            return 0;
        }

        if(!form.perlandmark){
            setErr({...err,'perlandmark' :'Please enter your Permanent Landmark '})
            return 0;
        }

        if(!form.perstate){
            setErr({...err,'perstate' :'Please enter your Permanent State '})
            return 0;
        }   

        if(!form.perpincode){
            setErr({...err,'perpincode' :'Please enter your Permanent Pincode '})
            return 0;
        }
        
        if(!form.occup){
            setErr({...err,'occup' :'Please mention your Occupation'})
            return 0;
        }
        
        if(!form.incomeSource){
            setErr({...err,'incomeSource' :'Please mention your Source of Income'})
            return 0;
        }

        if(!form.income){
            setErr({...err,'income' :'Please mention your Source of Income'})
            return 0;
        }

        return 1;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // const url = SERVER_URL + '/customer/apply'
        
        let formData = {
            title: form.title,
            firstName: form.fname,
            middleName: form.mname,
            lastName: form.lname,
            fatherName:form.frname,
            mobileNumber:form.phone,
            emailId:form.email,
            adharNumber:form.aadhar,
            dob:form.dob,
            residentialLine1:form.resiadd,
            residentialLine2:form.resiadd2,
            residentialLandmark: form.landmark,
            residentialState:form.resistate,
            residentialPincode:form.pincode,
            permanentLine1:form.permadd,
            permanentLine2:form.permadd2,
            permanentLandmark:form.perlandmark,
            permanentState:form.perstate,
            permanentPincode:form.perpincode,
            occupationType: form.occup,
            sourceOfIncome: form.incomeSource,
            grossAnnualIncome: parseInt(form.income),
            debitCardBool: form.debitCard?"1":"0",
            netBankingBool: form.netBanking?"1":"0"
        }

        //Validation
        // if()


        console.log("Form data :", formData)
        if(!isValid(form))  return;

        postApplyForm(formData)
        .then(res => {
            console.log(res)
            if(!res.ok){
                return res.json().then(data => {
                    console.log("Err data:", data)
                    throw new Error(data.errors.join('\n'))
                })
            }
            else{
                console.log(res.json())
                navigate('/apply-success')
            }
        })
        .catch(err => {
            console.log(typeof err)
            window.alert(`Application rejected by server:\n ${err}`)
        })
    }

  return (
    <Container className='p-0 w-100'>
        <MDBCard>
            <MDBCardHeader tag='h2' className='text-center mb-2'>Apply today in HCF Bank LTD.</MDBCardHeader>
            <MDBCardBody>
                <MDBCardTitle tag='h5' className='text-center mb-4'>Please fill the form below to apply for a new account</MDBCardTitle>
                <Form onSubmit = {handleSubmit}>
                        <MDBInput 
                            type='text' 
                            label='Enter Title'
                            value= {form.title}
                            onChange={(e) => setField('title', e.target.value)}
                            isInvalid = {!!err.title} 
                            className='m-3'
                        />

                         <div id='fnameErr' className='ms-2 mb-1 form-text text-danger' style={{display:(!!err.fname)?'':'none'}}>{err.fname}</div>

                        <MDBInput 
                            type='text' 
                            label='Enter First Name'
                            value= {form.fname}
                            onChange={(e) => setField('fname', e.target.value)}
                            isInvalid = {!!err.fname} 
                            className={['m-3', (!!err.fname)?'is-invalid':''].join(' ')}
                        />
                        
                        <MDBInput 
                            type='text' 
                            label='Enter Middle Name'
                            value= {form.mname}
                            onChange={(e) => setField('mname', e.target.value)}

                            isInvalid = {!!err.mname} 

                            className='m-3'
                        />
                    
                        <div id ='lnameEr' className = 'ms-2 mb-1 form-text text-danger' style = {{display:(!!err.lname)?'':'none'}}>{err.lname}</div>
                        <MDBInput 
                            type='text' 
                            label='Enter Last Name'
                            value= {form.lname}
                            onChange={(e) => setField('lname', e.target.value)}
                            isInvalid = {!!err.lname} 
                            className={['m-3', (!!err.lname)?'is-invalid':''].join(' ')}
                        />

                         <div id ='frameEr' className = 'ms-2 mb-1 form-text text-danger' style = {{display:(!!err.frname)?'':'none'}}>{err.frname}</div>
                        <MDBInput 
                            type='text' 
                            label='Enter Father Name'
                            value= {form.frname}
                            onChange={(e) => setField('frname', e.target.value)}
                            isInvalid = {!!err.frname} 
                            className = {['m-3', (!!err.frname)?'is-invalid':''].join(' ')}
                        />

                         <div id ='dobEr' className = 'ms-2 mb-1 form-text text-danger' style = {{display:(!!err.dob)?'':'none'}}>{err.dob}</div>
                       
                        <MDBInput 
                            type='date' 
                            label="Enter Date of Birth"
                            value= {form.dob}
                            onChange={(e) => setField('dob', e.target.value)}
                            isInvalid = {!!err.dob} 
                            className = {['m-3 pe-4', (!!err.dob)?'is-invalid':''].join(' ')}
                        />
                        
                        <div id ='emailEr' className = 'ms-2 mb-1 form-text text-danger' style = {{display:(!!err.email)?'':'none'}}>{err.email}</div>
                        <MDBInput 
                            type='email' 
                            label="Enter Email ID"
                            value= {form.email}
                            onChange={(e) => setField('email', e.target.value)}
                            isInvalid = {!!err.email} 
                            className = {['m-3', (!!err.email)?'is-invalid':''].join(' ')}
                        />
                      
                         
                      <div id ='phonwEr' className = 'ms-2 mb-1 form-text text-danger' style = {{display:(!!err.phone)?'':'none'}}>{err.phone}</div>
                        <MDBInput 
                            type='number' 
                            label="Enter Phone No."
                            value= {form.phone}
                            onChange={(e) => setField('phone', e.target.value)}
                            isInvalid = {!!err.phone} 
                            className = {['m-3', (!!err.phone)?'is-invalid':''].join(' ')}
                        />

                          <div id ='aadharEr' className = 'ms-2 mb-1 form-text text-danger' style = {{display:(!!err.aadhar)?'':'none'}}>{err.aadhar}</div>

                        <MDBInput 
                            type='number' 
                            label="Enter Aadhar Number"
                            value= {form.aadhar}
                            onChange={(e) => setField('aadhar', e.target.value)}
                            isInvalid = {!!err.aadhar} 
                            className =  {['m-3', (!!err.aadhar)?'is-invalid':''].join(' ')}
                        />
                       
                       <div id ='resiaddEr' className = 'ms-2 mb-1 form-text text-danger' style = {{display:(!!err.resiadd)?'':'none'}}>{err.resiadd}</div>
                        <MDBInput 
                            type='text' 
                            label="Residential Address Line 1"
                            value= {form.resiadd}
                            onChange={(e) => setField('resiadd', e.target.value)}
                            isInvalid = {!!err.resiadd} 
                            className = {['m-3', (!!err.resiadd)?'is-invalid':''].join(' ')}
                        />
                    
                        <MDBInput 
                            type='text' 
                            label="Residential Address Line 2"
                            value= {form.resiadd2}
                            onChange={(e) => setField('resiadd2', e.target.value)}
                            isInvalid = {!!err.resiadd2} 
                        />
                       
                       <div id ='landmarkEr' className = 'ms-2 mb-1 form-text text-danger' style = {{display:(!!err.landmark)?'':'none'}}>{err.landmark}</div>
                        <MDBInput 
                            type='text' 
                            label="Residential Landmark"
                            value= {form.landmark}
                            onChange={(e) => setField('landmark', e.target.value)}
                            isInvalid = {!!err.landmark} 
                            className = {['m-3', (!!err.landmark)?'is-invalid':''].join(' ')}
                        />
                      
                      <div id ='stateEr' className = 'ms-2 mb-1 form-text text-danger' style = {{display:(!!err.resistate)?'':'none'}}>{err.resistate}</div>
                        <MDBInput 
                            type='text' 
                            label="Residential State"
                            value= {form.resistate}
                            onChange={(e) => setField('resistate', e.target.value)}
                            isInvalid = {!!err.resistate} 
                            className = {['m-3', (!!err.resistate)?'is-invalid':''].join(' ')}
                        />
                      
                      <div id ='pincodeEr' className = 'ms-2 mb-1 form-text text-danger' style = {{display:(!!err.pincode)?'':'none'}}>{err.pincode}</div>
                        <MDBInput 
                            type='number' 
                            label="Residential Pincode"
                            value= {form.pincode}
                            onChange={(e) => setField('pincode', e.target.value)}
                            isInvalid = {!!err.pincode} 
                            className = {['m-3', (!!err.pincode)?'is-invalid':''].join(' ')}
                        />
                       
                       <div id ='permaddEr' className = 'ms-2 mb-1 form-text text-danger' style = {{display:(!!err.permadd)?'':'none'}}>{err.permadd}</div>
                        <MDBInput 
                            type='text' 
                            label="Permanent Address Line 1"
                            value= {form.permadd}
                            onChange={(e) => setField('permadd', e.target.value)}
                            isInvalid = {!!err.permadd} 
                            className = {['m-3', (!!err.permadd)?'is-invalid':''].join(' ')}
                        />
                    
                        <MDBInput 
                            type='text' 
                            label="Permanent Address Line 2"
                            value= {form.permadd2}
                            onChange={(e) => setField('permadd2', e.target.value)}
                            isInvalid = {!!err.permadd2} 
                            className = 'm-3'
                        />
                       
                       <div id ='perlandmarkEr' className = 'ms-2 mb-1 form-text text-danger' style = {{display:(!!err.perlandmark)?'':'none'}}>{err.perlandmark}</div>
                        <MDBInput 
                            type='text' 
                            label="Permanent Landmark"
                            value= {form.perlandmark}
                            onChange={(e) => setField('perlandmark', e.target.value)}
                            isInvalid = {!!err.perlandmark} 
                            className = {['m-3', (!!err.perlandmark)?'is-invalid':''].join(' ')}
                        />
                      
                      <div id ='perstateEr' className = 'ms-2 mb-1 form-text text-danger' style = {{display:(!!err.perstate)?'':'none'}}>{err.perstate}</div>
                        <MDBInput 
                            type='text' 
                            label="Permanent State"
                            value= {form.perstate}
                            onChange={(e) => setField('perstate', e.target.value)}
                            isInvalid = {!!err.perstate} 
                            className = {['m-3', (!!err.perstate)?'is-invalid':''].join(' ')}
                        />
                        
                        <div id ='perpincodeEr' className = 'ms-2 mb-1 form-text text-danger' style = {{display:(!!err.perpincode)?'':'none'}}>{err.perpincode}</div>
                        <MDBInput 
                            type='number' 
                            label="Permanent Pincode"
                            value= {form.perpincode}
                            onChange={(e) => setField('perpincode', e.target.value)}
                            isInvalid = {!!err.perpincode} 
                            className = {['m-3', (!!err.perpincode)?'is-invalid':''].join(' ')}
                        />
                        
                        <div id ='OccupEr' className = 'ms-2 mb-1 form-text text-danger' style = {{display:(!!err.occup)?'':'none'}}>{err.occup}</div>
                        <MDBInput 
                            type='text' 
                            label="Occupation"
                            value= {form.occup}
                            onChange={(e) => setField('occup', e.target.value)}
                            isInvalid = {!!err.occup} 
                            className = {['m-3', (!!err.occup)?'is-invalid':''].join(' ')}
                        />
                       
                       <div id ='SourceofIncomeEr' className = 'ms-2 mb-1 form-text text-danger' style = {{display:(!!err.incomeSource)?'':'none'}}>{err.incomeSource}</div>
                        <MDBInput 
                            type='text' 
                            label="Source of Income"
                            value= {form.incomeSource}
                            onChange={(e) => setField('incomeSource', e.target.value)}
                            isInvalid = {!!err.incomeSource} 
                            className =  {['m-3', (!!err.incomeSource)?'is-invalid':''].join(' ')}
                        />
                        
                        <div id ='IncomeEr' className = 'ms-2 mb-1 form-text text-danger' style = {{display:(!!err.income)?'':'none'}}>{err.income}</div>
                        <MDBInput 
                            type='number' 
                            label="Gross Annual Income"
                            value= {form.income}
                            onChange={(e) => setField('income', e.target.value)}
                            isInvalid = {!!err.income}  
                            className =  {['m-3', (!!err.income)?'is-invalid':''].join(' ')}
                        />
                        
                        <MDBCheckbox
                            type='checkbox'
                            value= {form.debitCard}
                            label="I want Debit Card services"
                            onChange={(e) => setField('debitCard', e.target.checked)}  
                            isInvalid = {!!err.debitCard}
                            
                        />
                        
                        <MDBCheckbox
                            type='checkbox'
                            value= {form.netBanking}
                            label="Opt for Net Banking Services"
                            onChange={(e) => setField('netBanking', e.target.checked)}  
                            isInvalid = {!!err.netBanking}
                            
                        />
                
                    <Button className='mt-4 w-100' type="submit">Apply for a New Account</Button>
                </Form>
            </MDBCardBody>

            <MDBCardFooter>
            <ListGroup className="list-group-flush text-center">
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
            </ListGroup>
            </MDBCardFooter>
        </MDBCard>
    </Container>
  )
}
