import React, { useState } from 'react';
import AdminAccesor from '../AdminAccesor';
import dummy from './dummy.json';  
import * as XLSX from 'xlsx';

const Commercial = () => {
  const [data, setData] = useState(dummy);  
  const [current, setCurrent] = useState(1);  

  const itemsPerPage = 12;  
  const lastIndex = current * itemsPerPage; 
  const firstIndex = lastIndex - itemsPerPage;  
  const filteredData = data.slice(firstIndex, lastIndex);  
  const noOfPages = Math.ceil(data.length / itemsPerPage);

  const paginate = (value) => {
    setCurrent(value);
  };
      const [x,setx] = useState();
      const [y,sety] = useState();
      const exportToExcel = (x,y) => {
             // Extract entries from 6 to 10 (adjust for zero-based index)
             const selectedEntries = filteredData.slice(x, y); // Entries 6 to 10 (index 5 to 9)
         
             // Create a worksheet from selected entries
             const ws = XLSX.utils.json_to_sheet(selectedEntries);
         
             // Create a workbook and append the worksheet
             const wb = XLSX.utils.book_new();
             XLSX.utils.book_append_sheet(wb, ws, 'Selected Properties');
         
             // Export the workbook as an Excel file
             XLSX.writeFile(wb, 'selected_properties.xlsx');
           };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div><AdminAccesor /></div>
      <div className="inquireworking">
        <h1>Commercial Loan</h1>  
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Username</th>
              <th scope="col">Loan Details</th>
              <th scope="col">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.username}</td>
                <td>{item.text}</td>
                <td>{item["phone number"]}</td>
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
        <div>
          <input
      type='number'
      value={x || ''}
      onChange={(e) => setx(e.target.value)} 
      placeholder="Enter start point"
    />
    <input
      type='number'
      value={y || ''}
      onChange={(e) => sety(e.target.value)} 
      placeholder="Enter end point"
    />
    <button className='btn btn-secondary' onClick={()=>{
      exportToExcel(x,y);
    }}>convert to excel</button>
          </div>
      </div>
    </div>
  );
};

export default Commercial;
