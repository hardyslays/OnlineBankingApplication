import React, {useState, useEffect} from 'react'
import { Form, Button, Card } from "react-bootstrap";
import { adminLogin } from '../../Services/Admin';
import { useNavigate } from 'react-router-dom';
import { MDBCardText } from 'mdb-react-ui-kit';

export const AdminLoginForm = () => {
    
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
            'password': form.pass
        }
        console.log(formData)

        // if(!isValid(form)) return;
        
        adminLogin(formData)
        .then(res => {
            console.log(res)
            if(!res.ok){
                res.text()
                .then(data => window.alert(data))
            }
            else{
                res.text()
                .then(data => {
                    sessionStorage.setItem('adminSecret',data)

                    navigate('/admin/dashboard')
                })
            }
        })
        
    }


  return (
    <div>
        <Card>
            <Card.Header className='text-center px-2 py-3' as='h3'>Admin Login</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                            type='text'
                            placeholder='Enter username'
                            value= {form.username}
                            onChange={(e) => setField('username', e.target.value)}
                            isInvalid = {!!err.username}
                            required 
                        />
                        <Form.Control.Feedback type='invalid'>
                            Please check the Username
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type='password'
                            placeholder='Enter your password'
                            value= {form.pass}
                            onChange={(e) => setField('pass', e.target.value)}
                            isInvalid = {!!err.pass}
                            required 
                        />
                        <Form.Control.Feedback type='invalid'>
                            Please check your Password
                        </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Button className='mt-4 w-100' type="submit">Login</Button>
                </Form>
            </Card.Body>
            <Card.Footer>
            <MDBCardText className='text-center' onClick={() => navigate('/home')} style={{cursor:'pointer'}}>Go back to HomePage</MDBCardText>
            </Card.Footer>
        </Card>
    </div>
  )
}
