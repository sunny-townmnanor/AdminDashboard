import React, { useEffect, useState } from 'react'
import AdminAccesor from '../AdminAccesor'
import './PropertyTable.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function PropertyTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [dummydata, setdummydata] = useState([])
  const [filters, setFilters] = useState({
    projectname: '',
    city: '',
    category: '',
    propertytype: ''
  })
  const itemsPerPage = 7
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.townmanor.ai/api/owner-property/')
        const updatedData = response.data.map((item) => {
          // Parse the image_repository string into an array if it's a string
          if (typeof item.image_repository === 'string') {
            item.image_repository = JSON.parse(item.image_repository)
          }
          return item
        })
        setdummydata(updatedData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])
  const deleteproperty= async (id)=>{
    alert("Are Sure want to delete??");
    try{
      const response = await axios.delete(`https://www.townmanor.ai/api/owner-property/${id}`)
      alert("Property delete SucessFully");
      setdummydata((prevData) => prevData.filter((item) => item.id !== id));

      // Optionally, handle pagination
      if (currentPage > 1 && (dummydata.length - 1) % itemsPerPage === 0) {
        setCurrentPage(currentPage - 1);  // Adjust page if last item was deleted
      }
    }
    catch(error){
      alert(error);
    }
  }
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    })
  }

  const filteredProperties = dummydata.filter((item) => {
    return (
      (filters.projectname ? item.property_name.toLowerCase().includes(filters.projectname.toLowerCase()) : true) &&
      (filters.city ? item.city.toLowerCase().includes(filters.city.toLowerCase()) : true) &&
      (filters.category ? item.category.toLowerCase().includes(filters.category.toLowerCase()) : true) &&
      (filters.propertytype ? item.area_type.toLowerCase().includes(filters.propertytype.toLowerCase()) : true)
    )
  })

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentProperties = filteredProperties.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  const totalPages = dummydata.length ? Math.ceil(filteredProperties.length / itemsPerPage) : 0

  const Editnavigate = (id) => {
    navigate(`/editform/${id}`)
  }
 
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
                <th>Property Type</th>
                <th>Listed By</th>
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
      src={`https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/${item.image_repository[0]}`} 
      id="propertyimg" 
      alt={item.property_name} 
    />
  ) : (
    <img 
      src="/default-image.jpg" // Default fallback image URL
      id="propertyimg" 
      alt="Default property" 
    />
  )}
</td>
                  <td>{item.property_name}</td>
                  <td>{item.city}</td>
                  <td>{item.address}</td>
                  <td>{item.category}</td>
                  <td>{item.area_type}</td>
                  <td>{item.username || 'N/A'}</td>
                  <td>{item.price}{item.pricerange}</td>
                  <td><button className='iconcontainer'><img src="/preview.png" className='propertyicon' alt="" /></button></td>
                  <td><button className='iconcontainer'><img src="/edit.png" className='propertyicon' onClick={() => Editnavigate(item.id)} alt="" /></button></td>
                  <td><button className='iconcontainer'><img src="/delete.png" className='propertyicon' onClick={() => deleteproperty(item.id)} alt="" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className='btn btn-warning'>Previous</button>
            {[...Array(totalPages)].map((_, index) => (
              <button key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'btn btn-primary active' : 'btn btn-primary'}>
                {index + 1}
              </button>
            ))}
            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className='btn btn-warning'>Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyTable
