import React from 'react'
import './AdminAcessor.css'
import { Link } from "react-router";
import InquireMain from './Inquirelead/InquireMain';
function AdminAccesor() {
  return (
   <>
   <div id='Controlflow'>
    <div style={{
        marginBottom:"10vh"
    }}>
        <img src='/navbarlogo.png'></img>
    </div>
    <span>Property control</span>
    <span>User Agent</span>
   <Link to='Inquire'> <span >Inquire/lead</span></Link>
    <span>Blog & article</span>
    <span>package & subscription</span>
    <span>Subscription management </span>
    <span>Agent Spotlight & featured Agent</span>
    <span>Market Workplace</span>
    <span>Customer Feedback</span>
   </div>
   </>
  )
}

export default AdminAccesor