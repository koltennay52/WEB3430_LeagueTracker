import React from 'react'
import { useCookies } from 'react-cookie'

export function SignOut(){
    
    const [cookies, setCookie, removeCookie] = useCookies(['token'])
    document.location = '/login'
    removeCookie('token')
    
    return <></>

}