import React from 'react'
import AdminAccesor from '../AdminAccesor'
import { useNavigate } from 'react-router-dom'

function Advertisment() {
  const navigate = useNavigate();
  return (
    <>
    <div  style={{ display: 'flex', flexDirection: 'row' }}>
        <div >
         <AdminAccesor/>
        </div>
        <div>
            <h1>Advertisment Mangement Section</h1>
            <div id='inquireboxes'>
            <span className='inquiredivision item1' onClick={() => { navigate('/Homeadvertisment') }}>Home Page Advertisement</span>
            <span className='inquiredivision item2' onClick={() => {  navigate('/Homeadvertisment')  }}>Subscription Plan Advertisement</span>
            <span className='inquiredivision item3' onClick={() => {  navigate('/Homeadvertisment') }}>Commercial Advertisment</span>
          
            {/* <span className='inquiredivision'> Commercial</span> */}
          </div>
        </div>
    </div>
    </>
  )
}

export default Advertisment