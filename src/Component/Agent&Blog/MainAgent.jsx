import React from 'react'
import AdminAccesor from '../AdminAccesor'
// import './Inquire.css'
import { useNavigate } from 'react-router-dom'
function MainAgent() {
  return (
    <>
    <div style={{
        display: 'flex',
        flexDirection: 'row'
      }}>
        <div>
          <AdminAccesor />
        </div>
        <div className='inquireworking' >
          <h1>Inquire Handle Page</h1>
          <div id='inquireboxes'>
            <span className='inquiredivision item1' onClick={() => { navigate('/HomeInsurance') }}>Blog Mangement </span>
            <span className='inquiredivision item2' onClick={() => { navigate('/HomeLoan') }}>Article Management</span>
            
            {/* <span className='inquiredivision'> Commercial</span> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default MainAgent