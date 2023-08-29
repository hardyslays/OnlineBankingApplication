import axios from "axios";
import { useState } from "react";

import { SERVER_URL } from "../Utils/url";

export default function Auth() {
        const saveToken = (user, token) => {
        sessionStorage.setItem('token', JSON.stringify(token));
        sessionStorage.setItem('user', JSON.stringify(user));
    }

    const getToken = () => {
        const tokenString = JSON.parse(sessionStorage.getItem('token'))
        if (tokenString){
            console.log(tokenString);
            return tokenString;
        }
    }
    const getUser = () => {
        const userString = JSON.parse(sessionStorage.getItem('user'))
        return userString;
    }

    const auth = axios.create({
        baseURL: SERVER_URL,
        headers:{
        'Content-Type':'application/json; charset=utf-8'
        }
    })

    const removeToken = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
    }

    return {
        auth,
        getToken,
        getUser,
        'setToken': saveToken,
        removeToken
    }
}