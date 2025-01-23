import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import './PropertyTable.css'
function PropertyEditForm() {
  const { index } = useParams();
  const [propertyData, setPropertyData] = useState(null);
  const [floorplan, setfloorplan] = useState([]);
  const [photos, setphotos] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://www.townmanor.ai/api/owner-property/${index}`);
        const data = response.data;

        // Parse JSON strings for amenities, image_repository, and floorplan if they are strings
        if (typeof data.amenities === 'string') data.amenities = JSON.parse(data.amenities);
        if (typeof data.image_repository === 'string') data.image_repository = JSON.parse(data.image_repository);
        if (typeof data.floorplan === 'string') data.floorplan = JSON.parse(data.floorplan);
        setfloorplan(data.floorplan || []);
        setphotos(data.image_repository || []);
        setPropertyData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [index]);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setPropertyData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleBooleanChange = (e) => {
    const { id, checked } = e.target;
    setPropertyData((prevData) => ({
      ...prevData,
      [id]: checked,
    }));
  };

  const handleAmenitiesChange = (e) => {
    const { id, checked } = e.target;
    setPropertyData((prevData) => {
      const updatedAmenities = checked
        ? [...prevData.amenities, id]
        : prevData.amenities.filter((amenity) => amenity !== id);
      return { ...prevData, amenities: updatedAmenities };
    });
  };
  const handleDeletePhoto = (photoToDelete) => {
    // Update the state after deleting the photo
    setphotos(prevPhotos => prevPhotos.filter(photo => photo !== photoToDelete));
  };

  // Handle Deleting a Floorplan
  const handleDeleteFloorplan = (floorplanToDelete) => {
    // Update the state after deleting the floorplan
    setfloorplan(prevFloorplans => prevFloorplans.filter(floor => floor !== floorplanToDelete));
  };
  const handleFloorplanChange = async (event) => {
    const files = Array.from(event.target.files);
    
    // Check if the current floorplans plus the new files exceed the limit
    if (files.length + floorplan.length > 4) {
      alert('You can upload up to 4 floorplans.');
      files.splice(4 - floorplan.length); // Limit the number of files
    }
    
    // Prepare the FormData to send to the backend
    const formData = new FormData();
    files.forEach(file => {
      formData.append("images", file); // 'floorplans' is the key expected by the backend
    });

    try {
      // Upload the floorplans to the backend
      const response = await axios.post('https://www.townmanor.ai/api/image/aws-upload-owner-images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Check if the upload was successful
      if (response.status === 200) {
        const uploadedFloorplanPaths = response.data.fileUrls;
        const trimmedFloorplanPaths = uploadedFloorplanPaths.map((path) => {
          return path.replace("https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/", ""); // Adjust path
        });

        setfloorplan((prevFloorPlans) => [...prevFloorPlans, ...trimmedFloorplanPaths]);
      } else {
        console.error('Error uploading floorplans:', response);
        alert('Failed to upload floorplans');
      }
    } catch (error) {
      console.error('Error uploading floorplans:', error);
      alert('An error occurred while uploading the floorplans');
    }
  };

  const handlePhotosChange = async (event) => {
    const files = Array.from(event.target.files);
    
    // Check if the current photos plus the new files exceed the limit
    // if (files.length + photos.length > 10) {
    //   alert('You can upload up to 10 photos.');
    //   files.splice(10 - photos.length); // Limit the number of files
    // }

    // Prepare the FormData to send to the backend
    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file); // 'images' is the key expected by the backend
    });

    try {
      // Upload the photos to the backend
      const response = await axios.post('https://www.townmanor.ai/api/image/aws-upload-owner-images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Check if the upload was successful
      if (response.status === 200) {
        const uploadedImagePaths = response.data.fileUrls;
        const trimmedImagePaths = uploadedImagePaths.map((path) => {
          return path.replace("https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/", "");
        });

        setphotos((prevPhotos) => [...prevPhotos, ...trimmedImagePaths]);
      } else {
        console.error('Error uploading images:', response);
        alert('Failed to upload images');
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('An error occurred while uploading the images');
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const datatosubmit ={
      ...propertyData,
      floorplan:floorplan,
      image_repository:photos
    }
    console.log("datatosubmit",datatosubmit);
    try{
      const response = axios.put(`https://www.townmanor.ai/api/owner-property/${index}`,datatosubmit, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('submitted SucessFully')
      console.log(response);
      
    }
    catch(error){
    console.log(error)
    }
  };
  
  

  if (!propertyData) {
    return <div>Loading...</div>; // Show loading indicator until data is fetched
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center text-primary">Property Edit Form</h1>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="city" className="form-label">Pincode</label>
          <input type="text" className="form-control" id="pincode" value={propertyData.pincode} onChange={handleChange} />
        </div>
        {/* Property For */}
        <div className="mb-3">
          <label htmlFor="property_for" className="form-label">Property For</label>
          <select className="form-control" id="property_for" value={propertyData.purpose} onChange={handleChange}>
            <option value="Sale">Sale</option>
            <option value="Rent">Rent</option>
          </select>
        </div>

        {/* Category */}
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <select className="form-control" id="category" value={propertyData.category} onChange={handleChange}>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
          </select>
        </div>

        {/* City */}
        <div className="mb-3">
          <label htmlFor="city" className="form-label">City</label>
          <input type="text" className="form-control" id="city" value={propertyData.city} onChange={handleChange} />
        </div>

        {/* Location */}
        {/* <div className="mb-3">
          <label htmlFor="city" className="form-label">City</label>
          <input type="text" className="form-control" id="city" value={propertyData.city} onChange={handleChange} />
        </div> */}
        <div className="mb-3">
          <label htmlFor="city" className="form-label">Latitude</label>
          <input type="text" className="form-control" id="lat" value={propertyData.lat} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">longtitude</label>
          <input type="text" className="form-control" id="lng" value={propertyData.lng} onChange={handleChange} />
        </div>

        {/* Locality */}
        <div className="mb-3">
          <label htmlFor="locality" className="form-label">Locality</label>
          <input type="text" className="form-control" id="locality" value={propertyData.locality || 'N/A'} onChange={handleChange} />
        </div>

        {/* Property Name */}
        <div className="mb-3">
          <label htmlFor="property_name" className="form-label">Property Name</label>
          <input type="text" className="form-control" id="property_name" value={propertyData.property_name} onChange={handleChange} />
        </div>

        {/* Address */}
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input type="text" className="form-control" id="address" value={propertyData.address} onChange={handleChange} />
        </div>

        {/* Configuration */}
        <div className="mb-3">
          <label htmlFor="configuration" className="form-label">Configuration</label>
          <input type="text" className="form-control" id="configuration" value={propertyData.configuration} onChange={handleChange} />
        </div>

        {/* Area Details */}
        <div className="mb-3">
          <label htmlFor="area_detail" className="form-label">Area Details (sq. ft.)</label>
          <input type="text" className="form-control" id="area_detail" value={propertyData.area_detail} onChange={handleChange} />
        </div>

        {/* Area Type */}
        <div className="mb-3">
          <label htmlFor="area_type" className="form-label">Area Type</label>
          <select className="form-control" id="area_type" value={propertyData.area_type} onChange={handleChange}>
            <option value="Super Built-up">Super Built-up</option>
            <option value="Built-up">Built-up</option>
            <option value="Carpet Area">Carpet Area</option>
          </select>
        </div>

        {/* Bathroom */}
        <div className="mb-3">
          <label htmlFor="bathroom" className="form-label">Bathroom</label>
          <input type="text" className="form-control" id="bathroom" value={propertyData.bathroom} onChange={handleChange} />
        </div>

        {/* Balcony */}
        <div className="mb-3">
          <label htmlFor="balcony" className="form-label">Balcony</label>
          <input type="text" className="form-control" id="balcony" value={propertyData.balcony || 'N/A'} onChange={handleChange} />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control" id="description" rows="3" value={propertyData.description} onChange={handleChange}></textarea>
        </div>

        {/* Furnish Type */}
        <div className="mb-3">
          <label htmlFor="furnish_type" className="form-label">Furnish Type</label>
          <select className="form-control" id="furnish_type" value={propertyData.furnish_type} onChange={handleChange}>
            <option value="Unfurnished">Unfurnished</option>
            <option value="Semi-furnished">Semi-furnished</option>
            <option value="Fully-Furnished">Fully-Furnished</option>
          </select>
        </div>

        {/* RERA ID */}
        <div className="mb-3">
          <label htmlFor="rera_id" className="form-label">RERA ID</label>
          <input type="text" className="form-control" id="rera_id" value={propertyData.rera_id} onChange={handleChange} />
        </div>

        {/* Floor No */}
        <div className="mb-3">
          <label htmlFor="floor_no" className="form-label">Floor No.</label>
          <input type="text" className="form-control" id="floor_no" value={propertyData.floor_no} onChange={handleChange} />
        </div>

        {/* Total Floors */}
        <div className="mb-3">
          <label htmlFor="total_floor" className="form-label">Total Floors</label>
          <input type="text" className="form-control" id="total_floor" value={propertyData.total_floor} onChange={handleChange} />
        </div>

        {/* Construction Status */}
        <div className="mb-3">
          <label htmlFor="construction_status" className="form-label">Construction Status</label>
          <select className="form-control" id="construction_status" value={propertyData.construction_status} onChange={handleChange}>
            <option value="New Launch">New Launch</option>
            <option value="Ready To Move">Ready To Move</option>
            <option value="Under Construction">Under Construction</option>
          </select>
        </div>

        {/* Price */}
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input type="text" className="form-control" id="price" value={propertyData.price} onChange={handleChange} />
        </div>

        {/* Maintenance Charge */}
        <div className="mb-3">
          <label htmlFor="maintenance_charge" className="form-label">Maintenance Charge</label>
          <input type="text" className="form-control" id="maintenance_charge" value={propertyData.maintenance_charge} onChange={handleChange} />
        </div>

        {/* Token Amount */}
        <div className="mb-3">
          <label htmlFor="token_amount" className="form-label">Token Amount</label>
          <input type="text" className="form-control" id="token_amount" value={propertyData.token_amount} onChange={handleChange} />
        </div>

        {/* Length */}
        <div className="mb-3">
          <label htmlFor="length" className="form-label">Length</label>
          <input type="text" className="form-control" id="length" value={propertyData.length || 'N/A'} onChange={handleChange} />
        </div>

        {/* Width */}
        <div className="mb-3">
          <label htmlFor="width" className="form-label">Width</label>
          <input type="text" className="form-control" id="width" value={propertyData.width || 'N/A'} onChange={handleChange} />
        </div>

        {/* Monthly Rent */}
        <div className="mb-3">
          <label htmlFor="monthly_rent" className="form-label">Monthly Rent</label>
          <input type="text" className="form-control" id="monthly_rent" value={propertyData.monthly_rent || 'N/A'} onChange={handleChange} />
        </div>

        {/* Security Deposit */}
        <div className="mb-3">
          <label htmlFor="security_deposit" className="form-label">Security Deposit</label>
          <input type="text" className="form-control" id="security_deposit" value={propertyData.security_deposit || 'N/A'} onChange={handleChange} />
        </div>

        {/* Amenities */}
        <div className="mb-3">
          <label className="form-label">Amenities</label>
          <div className="row">
            {["Air conditioning", "Swimming Pool", "Internet", "Dishwasher", "MicroWave", "Intercomm Facility", "Gas Pipeline", "Gymnasium", "Parking", "Power Backup", "CCTV", "24 x 7 Security", "Court", "ClubHouse", "PlayArea", "GuestParking"].map((amenity) => (
              <div key={amenity} className="col-4 mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={amenity}
                    checked={propertyData.amenities.includes(amenity)}
                    onChange={handleAmenitiesChange}
                  />
                  <label className="form-check-label" htmlFor={amenity}>
                    {amenity}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floor Allowed */}
        <div className="mb-3">
          <label htmlFor="floor_allowed" className="form-label">Floor Allowed</label>
          <input type="text" className="form-control" id="floor_allowed" checked={propertyData.floor_allowed === "true"} onChange={handleBooleanChange} />
        </div>

        {/* Metro Distance */}
        <div className="mb-3">
          <label htmlFor="metro" className="form-label">Metro Distance (km)</label>
          <input type="text" className="form-control" id="metro" value={propertyData.metro} onChange={handleChange} />
        </div>

        {/* School Distance */}
        <div className="mb-3">
          <label htmlFor="school" className="form-label">School Distance (km)</label>
          <input type="text" className="form-control" id="school" value={propertyData.school} onChange={handleChange} />
        </div>

        {/* Restaurant Distance */}
        <div className="mb-3">
          <label htmlFor="restaurant" className="form-label">Restaurant Distance (km)</label>
          <input type="text" className="form-control" id="restaurant" value={propertyData.restaurant} onChange={handleChange} />
        </div>

        {/* Bus Distance */}
        <div className="mb-3">
          <label htmlFor="bus" className="form-label">Bus Distance (km)</label>
          <input type="text" className="form-control" id="bus" value={propertyData.bus} onChange={handleChange} />
        </div>

        {/* Cinema Distance */}
        <div className="mb-3">
          <label htmlFor="cinema" className="form-label">Cinema Distance (km)</label>
          <input type="text" className="form-control" id="cinema" value={propertyData.cinema} onChange={handleChange} />
        </div>

        
        {/* <div className="mb-3">
          <label htmlFor="image_repository" className="form-label">Images</label>
          <input
            type="file"
            className="form-control"
            id="image_repository"
            multiple
            onChange={handleImageChange}
          />
          <div className="mt-3">
            <h5>Uploaded Images:</h5>
            <ul style={{
              display:'flex',
              gap:'10px',
              overflowX:'scroll'
            }}>
              {propertyData.image_repository.map((image, index) => (
                <>

               
                <div key={index}><img  id='displayimg' src={'https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/'+image}></img>
                <li key={index}>{image}</li>
               <i class="bi bi-trash3-fill"><MdDelete style={{
                height:'3vh',
                width:'3vw',
                textAlign:'center',
                cursor:'pointer'
               }} /></i>
                </div>
               
                </>
              ))}
            </ul>
          </div>
        </div>

      
        <div className="mb-3">
          <label htmlFor="floorplan" className="form-label">Floor plan</label>
          <input
            type="file"
            className="form-control"
            id="floorplan"
            multiple
            onChange={handleFloorplanChange}
          />
          <div className="mt-3">
            <h5>Uploaded Floorplans:</h5>
            <ul>
              {propertyData.floorplan.map((image, index) => (
                <li key={index}>{image}</li>
              ))}
            </ul>
          </div>
        </div> */}
           <div className="mb-3">
          <label htmlFor="floorplan" className="form-label">Floor plan</label>
          <input
            type="file"
            className="form-control"
            id="floorplan"
            multiple
            onChange={handleFloorplanChange}
          />
          <div className="mt-3">
            <h5>Uploaded Floorplans:</h5>
            <ul  style={{
              display:'flex',
              gap:'10px',
              overflowX:'scroll'
            }}>
              {floorplan.map((floor, index) => (
                   <>

               
                   <div key={index}><img  id='displayimg' src={'https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/'+floor}></img>
                   <li key={index}>{floor}</li>
                   <i class="bi bi-trash3-fill"><MdDelete 
                 onClick={()=>{handleDeleteFloorplan(floor)}}
                 style={{
                  height:'3vh',
                  width:'3vw',
                  textAlign:'center',
                  cursor:'pointer'
                 }} /></i>
                   </div>
                  
                   </>
              ))}
            </ul>
          </div>
        </div>

        {/* Photos */}
        <div className="mb-3">
          <label htmlFor="image_repository" className="form-label">Images</label>
          <input
            type="file"
            className="form-control"
            id="image_repository"
            multiple
            onChange={handlePhotosChange}
          />
          <div className="mt-3">
            <h5>Uploaded Images:</h5>
            <ul style={{
              display:'flex',
              gap:'10px',
              overflowX:'scroll'
            }}>
              {photos.map((photo, index) => (
                  <>

               
                  <div key={index}><img  id='displayimg' src={'https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/'+photo}></img>
                  <li key={index}>{photo}</li>
                 <i class="bi bi-trash3-fill"><MdDelete 
                 onClick={()=>{handleDeletePhoto(photo)}}
                 style={{
                  height:'3vh',
                  width:'3vw',
                  textAlign:'center',
                  cursor:'pointer'
                 }} /></i>
                  </div>
                 
                  </>
              ))}
            </ul>
          </div>
        </div>
        {/* Submit Button */}
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default PropertyEditForm;
