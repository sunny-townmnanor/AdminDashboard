import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminAccesor from '../AdminAccesor';
function CommTabel() {

  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get('https://www.townmanor.ai/api/api/commercial/commercial-details')
        setdata(response.data);
        console.log(response.data)
      }
      catch (error) {
        console.log(error)
      }
    }
    fetchdata();
  }, [])

  // const handelChange = (id) => {
  //   setdata(filter(data=>))
  // };
  

  return (
    <>
    <div style={{
        display:'flex',
        flexDirection:'row'
    }}>
      <div>
      <AdminAccesor/>
      </div>
      <div>
      <div>
        <div style={{ textAlign: 'center', margin: '20px 0px' }}>
          <h1>Commercial Dashboard</h1>
        </div>
        <div>
          <table className="table">
            <thead>
              <tr style={{ textAlign: 'center' }}>
                <th scope="col">Id</th>
                <th scope="col">Project Image</th>
                <th scope="col">Project Name</th>
                <th scope="col">Builder</th>
                <th scope="col">Possession Date</th>
                <th scope="col">city</th>
                <th scope="col">Investment</th>
                <th scope="col">Return</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {data && data.map((item) => (
                <tr key={item.id} style={{ textAlign: 'center' }}>
                  <td>{item.id}</td>
                  <td><img src={'https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/'+item.face_image} style={
                    {
                      width:'10vw',
                      height:'11vh',
                      borderRadius:'7px'
                    }
                  }></img></td>
                  <td>{item.project_name}</td>
                  <td>{item.builder}</td>
                  <td>{item.possession_date}</td>
                  <td>{item.city}</td>
                  <td>{item.invest}</td>
                  <td>{item.return_policy}</td>
                  <td>
                    
                      <button type="button" className="btn btn-primary" onClick={()=>{
                        navigate(`/edit/${item.id}`)
                      }}>Edit</button>
                    
                  </td>
                  <td>
                    <button type="button" className="btn btn-danger" onClick={() => handelChange(item.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
      
    </>
  );
}

export default CommTabel;
