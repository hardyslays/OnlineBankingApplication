import axios from "axios";

import { SERVER_URL } from "../Utils/url";
import Auth from './Auth'

let instance = axios.create({
    baseURL: SERVER_URL + '/api',
    headers:{
        'Access-Control-Allow-Origin': '*',
        'Content-Type':'application/json; charset=utf-8'
    }
})

const unauthGetOptions = () => ({
    method:'get',
    headers:{
        'Access-Control-Allow-Origin': '*',
        'Content-Type':'application/json; charset=utf-8'
    }
})

const unauthPostOptions = form => ({
    method:'post',
    headers:{
        'Access-Control-Allow-Origin': '*',
        'Content-Type':'application/json; charset=utf-8'
    },
    body: JSON.stringify(form)
})

// Unauthenticated API calls
export const postApplyForm = async(formData) => {

    const res = await fetch(SERVER_URL+'/api/customer/apply', unauthPostOptions(formData))

    return res
}

export const postRegisterForm = async(id, formData) => {
    const res = await fetch(SERVER_URL+`/api/netbanking/account/${id}`, unauthPostOptions(formData))

    return res
}

export const login = async(loginData) => {
    const res = await instance.post('/netbanking/login', JSON.stringify(loginData))
    

    return res.data
}


//Authenticated API calls

const authGetOptions = () => ({
    method:'get',
    headers:{
        'Access-Control-Allow-Origin': '*',
        'Content-Type':'application/json; charset=utf-8',
        'Authorization': `Bearer ${Auth().getToken()}`
    },
})

const authPostOptions = form => ({
    method:'post',
    headers:{
        'Access-Control-Allow-Origin': '*',
        'Content-Type':'application/json; charset=utf-8',
        'Authorization': `Bearer ${Auth().getToken()}`
    },
    body: JSON.stringify(form)
})

export const getAccountCustomerDetails = async() => {
    const username = Auth().getUser();
    
    const res = await fetch(SERVER_URL+`/api/netbanking/details/${username}`, authGetOptions())

    return res
}

export const getPayees = async() => {
    const username = Auth().getUser();
    const res = await fetch(SERVER_URL+`/api/netbanking/beneficiary/${username}`, authGetOptions())

    return res
}

export const postAddPayee = async(formData) => {

    const res = await fetch(SERVER_URL+`/api/netbanking/beneficiary/${Auth().getUser()}`, authPostOptions(formData))

    return res
}

export const postTransfer = async(formData) => {
    const res = await fetch(SERVER_URL+`/api/transaction/transfer/${Auth().getUser()}`, authPostOptions(formData))

    return res
}

export const getTransactions = async() => {
    const res = await fetch(SERVER_URL+`/api/transaction/${Auth().getUser()}`, authGetOptions())

    return res
}

export const getTransactionById = async(id) => {
    const res = await fetch(SERVER_URL+`/api/transaction/reference/${id}`, authGetOptions())

    return res
}

export const getAccountNameByAccountNumber = async(acNum) => {
    const res = await fetch(SERVER_URL+`/api/account/accountName/${acNum}`, authGetOptions())

    return res.text()
}
// export const getTransactions = async() => {
//     const res = await Authinstance.get('/netbanking/transactions')

//     return res.data
// }

// export const getRecentTransactions = async(num) => {
//     const res = await Authinstance.get(`/netbanking/transactions/${num}`)

//     return res.data
// }

// export const getRecentCreditTransactions = async(num) => {
//     const res = await Authinstance.get(`/netbanking/transactions/credit/${num}`)

//     return res.data
// }

// export const getRecentDebitTransactions = async(num) => {
//     const res = await Authinstance.get(`/netbanking/transactions/debit/${num}`)

//     return res.data
// }

