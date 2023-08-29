import React, {useState, useEffect} from 'react'
import { Form, Button, Card } from "react-bootstrap";
import {MDBCard, MDBCardHeader, MDBCardBody, MDBCardTitle, MDBInput, MDBCardFooter, MDBCardText} from 'mdb-react-ui-kit';

// import {AuthUser} from '../../Services/auth';
import { useNavigate } from 'react-router-dom';
import { login } from '../../Services/Api';
import Auth from '../../Services/Auth';

export const LoginForm = () => {

    const{ setToken } = Auth();

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

        if(!form.username){
            setErr({...err,'username' : 'Username is required'})
            return 0;
        }

        if(!form.password){
            setErr({...err,'password' : 'Password is required'})
            return 0;
        }

        return 1;

    }

    
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        const formData = {
            'userName': form.username,
            'password': form.password
        }
        console.log(formData)

        if(!isValid(form)) return;

        login(formData)
        .then(data => {
            console.log(data)
            if(data === 'error'){
                window.alert("Invalid Credentials")
                return;
            }
            setToken(formData.userName, data)
            navigate('/dashboard')
        })
    }


  return (
    <div>
        <MDBCard>
            <MDBCardHeader className='text-center px-2 py-3' as='h3'>Login for Net Banking</MDBCardHeader>
            <MDBCardBody>
                <Form onSubmit={handleSubmit}>
                        <div id = 'usernameErr' className = 'ms-2 mb-2 form-text text-danger' style = {{display : (!!err.username)?'':'none'}}>{err.username}</div>
                        <MDBInput 
                            type='text'
                            label='Enter username'
                            value= {form.username}
                            onChange={(e) => setField('username', e.target.value)}
                            isInvalid = {!!err.username} 
                            className={['m-3', (!!err.username)?'is-invalid':''].join(' ')}
                        />
                         <div id='PassErr' className='ms-2 mb-2 form-text text-danger' style={{display:(!!err.password)?'':'none'}}>{err.password}</div>
                        <MDBInput
                            type='password'
                            label='Enter your password'
                            value= {form.password}
                            onChange={(e) => setField('password', e.target.value)}
                            isInvalid = {!!err.password} 
                            className={['m-3', (!!err.password)?'is-invalid':''].join(' ')}
                                                  />
                        
                    
                    <Button className='mt-4 w-100' type="submit">Login</Button>
                </Form>
            </MDBCardBody>
            <MDBCardFooter>
                <MDBCardText className='text-center' onClick={() => navigate('/register')} style={{cursor:'pointer'}}>Register For Net Banking Here</MDBCardText>
                <MDBCardText className='text-center' onClick={() => navigate('/apply')} style={{cursor:'pointer'}}>Don't have an Account? Apply today</MDBCardText>
                <MDBCardText className='text-center' onClick={() => navigate('/admin/login')} style={{cursor:'pointer'}}>Log In as an Admin</MDBCardText>
            </MDBCardFooter>
        </MDBCard>
    </div>
  )
}
