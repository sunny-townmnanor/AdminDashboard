import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminAccesor from '../AdminAccesor';

function CommTabel() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // State for filtered data
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [itemsPerPage] = useState(10); // Number of items per page
  const [selectedCity, setSelectedCity] = useState(''); // State for selected city

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.townmanor.ai/api/api/commercial/commercial-details');
        setData(response.data);
        setFilteredData(response.data); // Set both data and filtered data initially
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // Filter data based on selected city
  const handleCityFilterChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);

    if (city === '') {
      setFilteredData(data); // Show all data if no city is selected
    } else {
      const filtered = data.filter((item) => item.city.toLowerCase() === city.toLowerCase());
      setFilteredData(filtered); // Filter data by selected city
    }
    setCurrentPage(1); // Reset to first page after filtering
  };

  // Calculate the data to show for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle previous page click
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle next page click
  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Calculate the total number of pages
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Get a list of unique cities
  const cities = [...new Set(data.map((item) => item.city))];

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div>
          <AdminAccesor />
        </div>
        <div>
          <div>
            <div style={{ textAlign: 'center', margin: '20px 0px' }}>
              <h1>Commercial Dashboard</h1>
            </div>
            <div style={{ marginBottom: '20px' }}>
              {/* City Filter */}
              <label htmlFor="city-filter" style={{ marginRight: '10px' }}>
                Filter by City:
              </label>
              <select
                id="city-filter"
                value={selectedCity}
                onChange={handleCityFilterChange}
                style={{ padding: '5px' }}
              >
                <option value="">All Cities</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
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
                    <th scope="col">City</th>
                    <th scope="col">Investment</th>
                    <th scope="col">Return</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems &&
                    currentItems.map((item) => (
                      <tr key={item.id} style={{ textAlign: 'center' }}>
                        <td>{item.id}</td>
                        <td>
                          <img
                            src={
                              'https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/' +
                              item.face_image
                            }
                            style={{
                              width: '10vw',
                              height: '11vh',
                              borderRadius: '7px',
                            }}
                            alt={item.project_name}
                          />
                        </td>
                        <td>{item.project_name}</td>
                        <td>{item.builder}</td>
                        <td>{item.possession_date}</td>
                        <td>{item.city}</td>
                        <td>{item.invest}</td>
                        <td>{item.return_policy}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                              navigate(`/edit/${item.id}`);
                            }}
                          >
                            Edit
                          </button>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handelChange(item.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <nav>
                <ul className="pagination">
                  {/* Previous Button */}
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button onClick={handlePrevPage} className="page-link">
                      Previous
                    </button>
                  </li>

                  {/* Page Numbers */}
                  {pageNumbers.map((number) => (
                    <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                      <button onClick={() => paginate(number)} className="page-link">
                        {number}
                      </button>
                    </li>
                  ))}

                  {/* Next Button */}
                  <li
                    className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}
                  >
                    <button onClick={handleNextPage} className="page-link">
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CommTabel;
