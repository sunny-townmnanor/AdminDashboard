import React from 'react'
import AdminAccesor from '../AdminAccesor'
import './Inquire.css'
import { useNavigate } from 'react-router-dom'
function InquireMain() {
  const navigate= useNavigate();
  return (
  <>
  <div style={{
    display:'flex',
    flexDirection:'row'
  }}>
 <div>
   <AdminAccesor/>
 </div>
 <div className='inquireworking'>
  <h1 >Inquire Handle Page</h1>
   <div id='inquireboxes'>
    <span className='inquiredivision' onClick={()=>{
        navigate('/HomeInsurance');
    }}>Home Insurance</span>
    <span className='inquiredivision'>Home loan</span>
    <span className='inquiredivision'>Home Interior</span>
    <span className='inquiredivision'> Home Shift</span>
    <span className='inquiredivision'> Commercial</span>
   </div>
 </div>
  </div>
  </>
  )
}

export default InquireMain