import React, {useState, useEffect} from 'react'

function Person({firstName, lastName, email}){
    if(!firstName){
        return null
    }
    return (
     <ul>
        <li>First name: {firstName}</li>
        <li>Last name: {lastName}</li>
        <li>Email: {email}</li>
     </ul>
    )
}


export default Person;