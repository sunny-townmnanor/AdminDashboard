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
   <a href='/'><span>Property control</span></a>
   <a href='UserAgent'><span>User Agent</span></a> 
   <a href='/Inquire'> <span >Inquire/lead</span></a>
   <a href='/article'><span>Blog & article</span></a> 
   <a href='/commercialdashboard'><span>Commercial Dashboard</span></a> 
    <span>package & subscription</span>
    <span>Subscription management </span>
    <a href='/agentfeature'><span>Agent Spotlight & featured Agent</span></a> 
    <span>Market Workplace</span>
    <span>Customer Feedback</span>
   </div>
   </>
  )
}

export default AdminAccesor