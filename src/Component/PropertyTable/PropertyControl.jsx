import React, { useEffect, useState } from 'react';
import AdminAccesor from '../AdminAccesor';
import './PropertyTable.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function PropertyControl() {
  const [currentPage, setCurrentPage] = useState(1);
  const [dummydata, setdummydata] = useState([]);
  const [filters, setFilters] = useState({
    projectname: '',
    city: '',
    category: '',
    propertytype: ''
  });
  const itemsPerPage = 7;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.townmanor.ai/api/property');
        console.log(response)
       
        setdummydata(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const deleteproperty = async (id) => {
    alert("Are Sure want to delete??");
    try {
      const response = await axios.delete(`https://www.townmanor.ai/api/owner-property/${id}`);
      alert("Property delete Successfully");
      setdummydata((prevData) => prevData.filter((item) => item.id !== id));

      // Optionally, handle pagination
      if (currentPage > 1 && (dummydata.length - 1) % itemsPerPage === 0) {
        setCurrentPage(currentPage - 1); // Adjust page if last item was deleted
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const filteredProperties = dummydata.filter((item) => {
    return (
      (filters.projectname ? item.property_name.toLowerCase().includes(filters.projectname.toLowerCase()) : true) &&
      (filters.city ? item.city.toLowerCase().includes(filters.city.toLowerCase()) : true) &&
      (filters.category ? item.category.toLowerCase().includes(filters.category.toLowerCase()) : true) &&
      (filters.propertytype ? item.area_type.toLowerCase().includes(filters.propertytype.toLowerCase()) : true)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  const Editnavigate = (id) => {
    navigate(`/editform/${id}`);
  };

  // New pagination logic
  const getPaginationNumbers = () => {
    const maxPagesToShow = 5; // Max number of pages to show at once
    const pageNumbers = [];
    
    if (totalPages <= maxPagesToShow) {
      // If the total pages are less than the max, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // If more than max pages, show first page, last page, and current page with ellipsis
      const start = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
      const end = Math.min(totalPages, currentPage + Math.floor(maxPagesToShow / 2));

      if (start > 1) pageNumbers.push(1);
      if (start > 2) pageNumbers.push('...'); // Ellipsis for skipped pages

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      if (end < totalPages - 1) pageNumbers.push('...'); // Ellipsis for skipped pages
      if (end < totalPages) pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className='propertytable'>
      <div><AdminAccesor /></div>
      <div className='propertycontrol'>
        <span id='proptablehead'>Property Listing Management Portal</span>
        <div id='navigation'>
          <input type='text' name='projectname' value={filters.projectname} onChange={handleFilterChange} />
          <button className='btn btn-primary'>Project Name</button>
          <input type='text' name='city' value={filters.city} onChange={handleFilterChange} />
          <button className='btn btn-primary'>Sort by City</button>
          <select name='category' value={filters.category} onChange={handleFilterChange}>
            <option value="">Select Category</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
          </select>
          <button className='btn btn-primary'>Sort by Category</button>
          <input type='text' name='propertytype' value={filters.propertytype} onChange={handleFilterChange} />
          <button className='btn btn-primary'>Search by Property Type</button>
        </div>

        <div id='content'>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>id</th>
                <th>property_image</th>
                <th>property name</th>
                <th>city</th>
                <th>Address</th>
                <th>Category</th>
                <th>Construction Status</th>
                <th>configuration</th>
                <th>price</th>
                <th>preview</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {currentProperties.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                  {item.image_repository && item.image_repository.length > 0 ? (
  <img 
    src={item.image_repository.split(',')[0].trim()}  // Get the first image URL
    id="propertyimg" 
    alt={item.property_name} 
  />
) : (
  <img 
    src="/default-image.jpg" 
    id="propertyimg" 
    alt="Default property" 
  />
)}

                  </td>
                  <td>{item.property_name}</td>
                  <td>{item.city}</td>
                  <td>{item.address}</td>
                  <td>{item.category}</td>
                  <td>{item.construction_status}</td>
                  <td>{item.configuration}</td>
                  <td>{item.price}{item.pricerange}</td>
                  <td><button className='iconcontainer'><img src="/preview.png" className='propertyicon' alt="" /></button></td>
                  <td><button className='iconcontainer'><img src="/edit.png" className='propertyicon' onClick={() => Editnavigate(item.id)} alt="" /></button></td>
                  <td><button className='iconcontainer'><img src="/delete.png" className='propertyicon' onClick={() => deleteproperty(item.id)} alt="" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="pagination">
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className='btn btn-warning'>Previous</button>

            {getPaginationNumbers().map((number, index) => (
              <button
                key={index}
                onClick={() => number !== '...' && paginate(number)}
                className={number === currentPage ? 'btn btn-primary active' : 'btn btn-primary'}
                disabled={number === '...'}
              >
                {number}
              </button>
            ))}

            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className='btn btn-warning'>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyControl;
