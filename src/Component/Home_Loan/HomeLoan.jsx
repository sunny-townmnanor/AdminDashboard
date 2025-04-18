import React, { useState, useEffect } from 'react';
import AdminAccesor from '../AdminAccesor';
import axios from 'axios';  // Importing axios for API request
import * as XLSX from 'xlsx';

const HomeLoan = () => {
  const [data, setData] = useState([]);  // Set initial data to an empty array
  const [current, setCurrent] = useState(1);  // Page state for pagination
  const [x, setx] = useState();  // Start point for export
  const [y, sety] = useState();  // End point for export

  // Define the items per page
  const itemsPerPage = 12;

  // Calculate the indexes for pagination
  const lastIndex = current * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const filteredData = data.slice(firstIndex, lastIndex);
  const noOfPages = Math.ceil(data.length / itemsPerPage);

  // Paginate function to update the page number
  const paginate = (value) => {
    setCurrent(value);
  };

  // Fetch data from API
  useEffect(() => {
    // Fetch loan applications data from the API
    axios.get('https://www.townmanor.ai/api/api/loan-applications')
      .then((response) => {
        setData(response.data);  // Set the fetched data to state
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);  // Empty dependency array to run the effect only once after the component mounts

  // Export data to Excel function
  const exportToExcel = (x, y) => {
    // Extract selected entries based on user input
    const selectedEntries = filteredData.slice(x, y);

    // Create a worksheet from the selected entries
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
      <div className="home-loan" style={{ width: '100%', margin: '10px' }}>
        <h1>Home Loan</h1>  {/* Updated heading for Home Loan */}
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Loan Amount</th>
              <th scope="col">Net Salary</th>
              <th scope="col">Monthly EMI</th>
              <th scope="col">Tenure</th>
              <th scope="col">City</th>
              <th scope="col">Created At</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.loan_amount}</td>
                <td>{item.net_salary}</td>
                <td>{item.monthly_emi}</td>
                <td>{item.tenure}</td>
                <td>{item.city}</td>
                <td>{new Date(item.created_at).toLocaleString()}</td>
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
          <button className='btn btn-secondary' onClick={() => {
            exportToExcel(x, y);
          }}>Convert to Excel</button>
        </div>
      </div>
    </div>
  );
};

export default HomeLoan;
