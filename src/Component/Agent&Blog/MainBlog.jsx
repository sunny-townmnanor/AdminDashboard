import React from 'react'

import AdminAccesor from '../AdminAccesor'
import { useNavigate } from 'react-router-dom'
function MainBlog() {
     const navigate = useNavigate();
  return (
    <>
    <div  style={{ display: 'flex', flexDirection: 'row' }}>
        <div >
         <AdminAccesor/>
        </div>
        <div style={{
          width:'100%'
        }}>
            <h1 style={{
              textAlign:'center',
              marginTop:'15px'

            }}>Property Control Mangement Section</h1>
            <div id='inquireboxes'>
            <span className='inquiredivision item1' onClick={() => { navigate('/proptech') }}>New  & Article </span>
            <span className='inquiredivision item2' onClick={() => {  navigate('/article')  }}>Blog</span>
          
          </div>
        </div>
    </div>
    </>
  )
}

export default MainBlog