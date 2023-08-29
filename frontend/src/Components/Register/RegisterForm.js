import React, {useState, useEffect} from 'react'
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { postRegisterForm } from '../../Services/Api';
import {MDBCard, MDBCardHeader, MDBCardBody, MDBCardTitle, MDBInput, MDBCheckbox, MDBCardFooter, MDBCardText} from 'mdb-react-ui-kit';


export const RegisterForm = () => {
    const navigate= useNavigate()
    
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

        if(!form.acNumber){
            setErr({...err,'acNumber' : 'Account Number is required'})
            return 0;
        }

        
        if(!form.username){
            setErr({...err,'username' : 'Username is required'})
            return 0;
        }
        
        
        if(!form.loginPass){
            setErr({...err,'loginPass' : 'Login Password is required'})
            return 0;
        }
        
        
        if(!form.CLoginPass){
            setErr({...err,'CLoginPass' : 'Confirm Login Password is required'})
            return 0;
        }
        
        
        if(!form.TransPass){
            setErr({...err,'TransPass' : 'Transaction Password is required'})
            return 0;
        }
        
        
        if(!form.CTransPass){
            setErr({...err,'CTransPass' : 'Confirm Transaction Password is required'})
            return 0;
        }
        
        if(!form.otp){
            setErr({...err,'otp' : 'OTP is required'})
            return 0;
        }
        
        if(form.acNumber.length!==14){
            setErr({...err,'acNumber' : '14 Digits Account Number required'})
            return 0;
        }

        return 1;
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        let regisform = {
            
            accountNumber : form.acNumber,
            userName : form.username,
            password : form.loginPass,
        }

        console.log('login: ',regisform)
        if(!isValid(form))return;

        console.log('The form is valid')
        // console.log('login cnfrm: ', form.CLoginPass)
        // console.log((form.loginPass !== form.CLoginPass))
        
        if(form.loginPass !== form.CLoginPass){
            window.alert("Login Password does not match with Confirmation login password")
            
            return;
        }

        if(form.TransPass !== form.CTransPass){
            window.alert("Transaction Password does not match with Confirmation Transaction password")
            
            return;
        }
        
        if(form.otp !== '0000'){
            window.alert("OTP provided is incorrect")

            return;
        }

        postRegisterForm(form.acNumber, regisform)
        .then(res => {
            console.log(res)
            if(!res.ok){
                return res.text()
                .then(data => {
                    console.log(data)
                    throw new Error(data)
                })
            }
            else{
                console.log(res.json())
                navigate('/login')
            }
        })
        .catch(err => {
            console.log(err)
            window.alert(`Registration rejected by server:\n${err.message}`)
        })
        

        
    }


  return (
    <div>
        <MDBCard>
            <MDBCardHeader className='text-center px-2 py-3' as='h3'>Register for Net Banking</MDBCardHeader>
            <MDBCardBody>
                <Form onSubmit={handleSubmit}>
                <div id='AccErr' className='ms-2 mb-2 form-text text-danger' style={{display:(!!err.acNumber)?'':'none'}}>{err.acNumber}</div>
                        <MDBInput
                            type='number' 
                            label='Enter Account Number'
                            value= {form.acNumber}
                            onChange={(e) => setField('acNumber', e.target.value)}
                        
                            
                            className={['m-3', (!!err.acNumber)?'is-invalid':''].join(' ')}
                        />
                        
                        <div id='usernameErr' className='ms-2 mb-2 form-text text-danger' style={{display:(!!err.username)?'':'none'}}>{err.username}</div>
                        <MDBInput
                            type='text'
                           label='Enter Username'
                            value= {form.username}
                            onChange={(e) => setField('username', e.target.value)}
                            isInvalid = {!!err.username}
                            
                            className={['m-3',(!!err.username)?'is-invalid' :''].join(' ')}
                        />
                        <div id = 'loginpassErr' className='ms-2 mb-2 form-text text-danger' style={{display:(!!err.loginPass)?'':'none'}}>{err.loginPass}</div>

                        <MDBInput
                            type='password'
                           label='Enter Login Password'
                            value= {form.loginPass}
                            onChange={(e) => setField('loginPass', e.target.value)}
                            isInvalid = {!!err.loginPass}
                            
                            className={['m-3', (!!err.loginPass)?'is-invalid':''].join(' ')}
                        />
                      
                      <div id='CloginpassErr' className='ms-2 mb-2 form-text text-danger' style={{display:(!!err.CLoginPass)?'':'none'}}>{err.CLoginPass}</div>
                        <MDBInput
                            type='password'
                           label='Confirm Login Password'
                            value= {form.CLoginPass}
                            onChange={(e) => setField('CLoginPass', e.target.value)}
                            isInvalid = {!!err.CLoginPass}
                            
                            className={['m-3', (!!err.CLoginPass)?'is-invalid':''].join(' ')}
                        />
                      
                      <div id='TranspassErr' className='ms-2 mb-2 form-text text-danger' style={{display:(!!err.TransPass)?'':'none'}}>{err.TransPass}</div>
                        <MDBInput
                            type='password'
                           label='Enter Transaction Password'
                            value={form.TransPass}
                            onChange={(e) => setField('TransPass', e.target.value)}
                            
                            className={['m-3',(!!err.TransPass)?'is-invalid':''].join(' ')}
                        />
                       
                       <div id='CtranspassErr' className='ms-2 mb-2 form-text text-danger' style={{display:(!!err.CTransPass)?'':'none'}}>{err.CTransPass}</div>
                        <MDBInput
                            type='password'
                           label='Confirm Transaction Password'
                            value={form.CTransPass}
                            onChange={(e) => setField('CTransPass', e.target.value)}

                            className={['m-3', (!!err.CTransPass)?'is-invalid':''].join(' ')}
                            
                        />
                        
                        <div id='nameErr' className='ms-2 mb-2 form-text text-danger' style={{display:(!!err.otp)?'':'none'}}>{err.otp}</div>
                        <MDBInput
                            type='number'
                           label='Enter OTP'
                            value={form.otp}
                            onChange={(e) => setField('otp', e.target.value)}
                           
                            className={['m-3', (!!err.otp)?'is-invalid':''].join(' ')}
                        />
                  
                    <Button className='mt-4 w-100' type="submit">Register</Button>
                </Form>
            </MDBCardBody>
            <MDBCardFooter>
                <MDBCardText className='text-center' onClick={() => navigate('/login')} style={{cursor:'pointer'}}>Already Registered? Login Here</MDBCardText>
                <MDBCardText className='text-center' onClick={() => navigate('/apply')} style={{cursor:'pointer'}}>Don't have an Account? Apply today</MDBCardText>
            </MDBCardFooter>
        </MDBCard>
    </div>
  )
}
