import React, { useState } from 'react';
import AdminAccesor from '../AdminAccesor';
import agentData from './dummy.json';  // Assuming 'dummy.json' contains the agent data

const AgentFeature = () => {
  const [data, setData] = useState(agentData);  
  const [current, setCurrent] = useState(1);  

  const itemsPerPage = 12;  // Items to display per page
  const lastIndex = current * itemsPerPage; 
  const firstIndex = lastIndex - itemsPerPage;  
  const filteredData = data.slice(firstIndex, lastIndex);  
  const noOfPages = Math.ceil(data.length / itemsPerPage);

  const paginate = (value) => {
    setCurrent(value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div><AdminAccesor /></div>
      <div className="agent-feature" style={{
        width:'100%'
      }}>
        <h1>Agent Feature</h1>  {/* Updated heading for Agent Feature */}
        
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Registration Date</th>
              <th scope="col">Total Listings</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nameSurname}</td>
                <td>{item.address}</td>
                <td>{new Date(JSON.parse(item.agentProfile).registrationDate).toLocaleDateString()}</td>
                <td>{item.totalListingsNum}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button
            onClick={() => paginate(current - 1)}
            disabled={current === 1}
            className="btn btn-warning">
            Previous
          </button>

          {[...Array(noOfPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={current === index + 1 ? 'btn btn-primary active' : 'btn btn-primary'}>
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => paginate(current + 1)}
            disabled={current === noOfPages}
            className="btn btn-warning">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentFeature;
 