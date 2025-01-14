import React, { useEffect, useState } from 'react'
import AdminAccesor from '../AdminAccesor'
import dummy from './HomeInsurance.json'
import './Inquire.css'
function HomeInsurance() {
    const [data,setdata] = useState(dummy);
    // useEffect(()=>{
    //     setdata(dummy);
    // },[])
    console.log(data);
    const[current,setcurrent] = useState(1);
    const itemsPerPage = 12;
    const lastindex = current*itemsPerPage;
    const firstindex = lastindex-itemsPerPage;
    const filterdata = data.slice(firstindex,lastindex);
    const noofpages = Math.ceil(data.length/itemsPerPage);
    const paginate=(value)=>{
        setcurrent(value);
    }
  return (
    <div style={{
        display:'flex',
        flexDirection:'row'
    }}>
        <div><AdminAccesor/></div>
        <div className='inquireworking'>
        <h1>Home Insurance</h1>
        <table class="table table-striped">
  <thead>
  {/* {
      "name": "sunny",
      "phoneNumber": "8752613132",
      "email": "sunnysingh29122001@gmail.com",
      "pinCode": "121001",
      "city": "Noida",
      "tenure": "5 Years",
      "selectedInsurance": "General Life Insurance",
      "authorized": true
    }, */}
    <tr>
     
    <th scope="col">Id</th>
      <th scope="col">Name</th>
      <th scope="col">PhoneNumber</th>
      <th scope="col">Email</th>
      <th scope="col">Pincode</th>
      <th scope="col">city</th>
      <th scope="col">Tenure</th>
      <th scope="col">Insurance Type</th>
    </tr>
  </thead>
  <tbody>
    {filterdata.map((item,index)=>(
     <tr key={index}>
     <td>{index+1}</td>
     <td>{item.name}</td>
     <td>{item.phoneNumber}</td>
     <td>{item.email}</td>
     <td>{item.pinCode}</td>
     <td>{item.city}</td>
     <td>{item.tenure}</td>
     
     <td>{item.selectedInsurance}</td>
   </tr>   
    ))}
   
   
  </tbody>
</table>
<div className="pagination">
            <button
              onClick={()=>{
                paginate(current-1);
              }}
              disabled={current==1}
              className='btn btn-warning'
            >
              Previous
            </button>
            {[...Array(noofpages)].map((_,index)=>(
                <button
                onClick={()=>{
                    paginate(index+1);
                }}
                className={current === index + 1 ? 'btn btn-primary active' : 'btn btn-primary'}
              >
                {index + 1}

              </button>
            ))}
            <button
              onClick={()=>{
                paginate(current+1);
              }}
              disabled={current==noofpages}
              className='btn btn-warning'
            >
              Next
            </button>
          </div>
        </div>
    </div>
  )
}

export default HomeInsurance