import React, { useEffect, useRef } from 'react'
import { ApplyForm } from './ApplyForm'

import Auth from '../../Services/Auth'
import { useNavigate } from 'react-router-dom'

export const Apply = () => {
    const navigate = useNavigate();
    const { getToken } = Auth();
    useEffect(() => {
        //To check if already Logged in
        const token = getToken();
        // console.log('token: ', token)
        // console.log('val:', (!token))
        if(!!getToken()){
            navigate('/dashboard', {replace: true})
        }
    }, [])

    return(
    <div style={{width: '100%', height:'100%'}} className='bgGradient px-3 py-4'>
            <ApplyForm/>
        </div>
    )
}
