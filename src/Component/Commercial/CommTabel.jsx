import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
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
      <div>
        <div style={{ textAlign: 'center', margin: '20px 0px' }}>
          <h1>Commercial Dashboard</h1>
        </div>
        <div>
          <table className="table">
            <thead>
              <tr style={{ textAlign: 'center' }}>
                <th scope="col">Id</th>
                <th scope="col">Project Name</th>
                <th scope="col">Builder</th>
                <th scope="col">Possession Date</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {data && data.map((item) => (
                <tr key={item.id} style={{ textAlign: 'center' }}>
                  <td>{item.id}</td>
                  <td>{item.project_name}</td>
                  <td>{item.builder}</td>
                  <td>{item.possession_date}</td>
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
    </>
  );
}

export default CommTabel;
