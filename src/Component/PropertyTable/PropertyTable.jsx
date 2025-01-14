import React, { useEffect, useState } from 'react'
import AdminAccesor from '../AdminAccesor'
import './PropertyTable.css'
import { MdPreview } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import dummydata from './dummy.json'
function PropertyTable() {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const navigate = useNavigate();
  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProperties = dummydata.slice(indexOfFirstItem, indexOfLastItem);
  console.log(currentProperties);
  // Function to change pages
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total number of pages
  const totalPages = Math.ceil(dummydata.length / itemsPerPage);
  const Editnavigate = (value) => {
    navigate(`/editform/${value}`);
  }
  return (
    <div className='propertytable'>
      <div>
        <AdminAccesor />
      </div>
      <div className='propertycontrol'>
        <span id='proptablehead'>Property Listing Management Portal</span>
        <div id='navigation'>
          <span>sort by id</span>
          <span>sort by city</span>
          <span>Sort by category</span>
          <span>Sort by Property </span>
        </div>
        <div id='content'>
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">property_image</th>
                <th scope="col">property name</th>
                <th scope="col">city</th>
                <th scope="col">Address</th>
                <th scope="col">Category</th>
                <th scope="col">Property Type</th>
                <th scope="col">Listed By</th>
                <th scope="col">price</th>
                <th scope="col">preview</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {currentProperties.map((item, key) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td><img src={item.one_image_location} id='propertyimg' alt={item.property_name} /></td>
                    <td>{item.property_name}</td>
                    <td>{item.city}</td>
                    <td>{item.address}</td>
                    <td>{item.category}</td>
                    <td>{item.area_type}</td>
                    <td>{item.username}</td>
                    <td>{item.price}</td>
                    <td><button className='iconcontainer'><img src="/preview.png" className='propertyicon' alt="" /></button></td>
                    <td><button className='iconcontainer'><img src="/edit.png" className='propertyicon' onClick={() => Editnavigate(key)} alt="" /></button></td>
                    <td><button className='iconcontainer'><img src="/delete.png" className='propertyicon' alt="" /></button></td>
                  </tr>
                );
              })}


            </tbody>
          </table>
          <div className="pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className='btn btn-warning'
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? 'btn btn-primary active' : 'btn btn-primary'}
              >
                {index + 1}

              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className='btn btn-warning'
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyTable