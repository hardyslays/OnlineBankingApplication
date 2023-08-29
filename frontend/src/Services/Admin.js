import axios from "axios";
import Auth from "./Auth";

import { SERVER_URL } from "../Utils/url";



export const adminLogin = async(loginData) => {
    const res = await fetch(SERVER_URL+'/admin/login', {
        method: 'post',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type':'application/json; charset=utf-8',
        
        },
        body: JSON.stringify(loginData)
    })
    
    return res
}

const authGetOptions = () => ({
    method:'get',
    headers:{
        'Access-Control-Allow-Origin': '*',
        'Content-Type':'application/json; charset=utf-8',
        'Authorization': "batch8group4"
    },
})

const authPostOptions = form => ({
    method:'post',
    headers:{
        'Access-Control-Allow-Origin': '*',
        'Content-Type':'application/json; charset=utf-8',
        'Authorization': "batch8group4"
    },
    body: JSON.stringify(form)
})

export const getCustomers = async() => {
    const res = await fetch(SERVER_URL+'/admin/unapproved/customers', authGetOptions())
    const data = await res.json()
    return data
}

export const getCustomersApproved = async() => {
        const res = await fetch(SERVER_URL+'/admin/approved/customers', authGetOptions())
    const data = await res.json()
    return data

}

export const getCustomersAll = async() => {
    // const res = await instance.get('/all/customers')
    const res = await fetch(SERVER_URL+'/admin/all/customers', authGetOptions())
    const data = await res.json()
    return data;
}

export const getAccounts = async() => {
    // const res = await instance.get('/get/accounts')
    const res = await fetch(SERVER_URL+'/admin/get/accounts', authGetOptions())
    const data = await res.json()

    return data
}


export const getAccountById = async(id) => {
    // const res = await instance.get('/get/account/'+id)
    const res = await fetch(SERVER_URL+'/admin/get/account/'+id, authGetOptions())
    const data = await res.json()

    return data
}

export const getCustomerById = async(id) => {
    // const res = await instance.get('/customer/'+id)
    const res = await fetch(SERVER_URL+'/admin/customer/'+id, authGetOptions())
    const data = await res.json()
    return data
}

export const postAdminApprove = async(id) => {
    const res = await fetch(SERVER_URL+'/admin/approve/' + id, authPostOptions())

    const data = await res.json()
    return data
}

export const postAdminDISABLE = async(id) => {
    // const res = await instance.post('/disable/account/' + id)
    const res = await fetch(SERVER_URL+'/admin/disable/account/'+id, authPostOptions())
    return res
}

export const postAdminEnable = async(id) => {
    // const res = await instance.post('/enable/account/' + id)
    const res = await fetch(SERVER_URL+'/admin/enable/account/'+id, authPostOptions())
    return res
}

export const postAdminCheck = async(id) => {
    // const res = await instance.get('/check/account/' + id)
    const res = await fetch(SERVER_URL+'/admin/check/account/'+id, authGetOptions())
    const data = await res.json()
    console.log("This is the res:", data)
    return data
}