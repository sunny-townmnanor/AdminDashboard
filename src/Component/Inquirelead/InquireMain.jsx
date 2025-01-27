import React from 'react'
import AdminAccesor from '../AdminAccesor'
// import './Inquire.css'
import { useNavigate } from 'react-router-dom'
import './InquireMain.css'



function InquireMain() {
  const navigate = useNavigate();
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
            <span className='inquiredivision item1' onClick={() => { navigate('/HomeInsurance') }}>Home Insurance</span>
            <span className='inquiredivision item2' onClick={() => { navigate('/HomeLoan') }}>Home loan</span>
            <span className='inquiredivision item3' onClick={() => { navigate('/HomeInterior') }}>Home Interior</span>
            <span className='inquiredivision item4' onClick={() => { navigate('/HomeShift') }}> Home Shift</span>
            <span className='inquiredivision item5' onClick={() => { navigate('/Commercial') }}> Commercial</span>
            {/* <span className='inquiredivision'> Commercial</span> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default InquireMain