import React, { useState } from 'react';
import dummy from './dummy.json'
import { useParams } from 'react-router-dom';
function PropertyEditForm() {
  
  const initialPropertyData = {
    username: "Admin",
    city: "Noida",
    locality: '',
    property_name: "Trinity Heights",
    address: "Sector 63, Noida",
    configuration: "1,2,3",
    area_detail: "500 - 1450",
    area_type: "Apartment -",
    bathroom: "1",
    balcony: '',
    description: "Trinity Heights in Sector 63, Noida, offers well-designed apartments with 1BHK, 2BHK, and 3BHK configurations. It's a newly launched project with modern amenities and great connectivity to nearby schools, hospitals, and shopping centers.",
    furnish_type: "Unfurnished",
    rera_id: "UPRERAPRJ1234",
    floor_no: "5",
    total_floor: "15",
    construction_status: "Under Construction",
    price: "30 L - 90 L",
    maintenance_charge: "₹2,000/month",
    token_amount: "₹50,000",
    amenities: ["Air conditioning", "Swimming Pool", "Gymnasium", "Parking", "Power Backup", "CCTV", "24 x 7 Security"],
    metro: '',
    school: '',
    hospital: '',
    mall: '',
    restaurant: '',
    bus: '',
    cinema: "2.5",
    country: "India - Noida",
    pincode: "201301",
    property_for: "Sale",
    category: "Residential",
    image_repository: ["trinity_heights.jpg"],
    location: "28.570114, 77.351028",
    floorplan:[],
    one_image_location: "property1.jpg"
  };

  
  const {index}  = useParams();
  const [propertyData, setPropertyData] = useState(dummy[index]);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setPropertyData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleBooleanChange = (e) => {
    const { id, checked } = e.target;
    setPropertyData((prevData) => ({
      ...prevData,
      [id]: checked
    }));
  };
  console.log(dummy[index]);
  const handleAmenitiesChange = (e) => {
    const { id, checked } = e.target;
    setPropertyData((prevData) => {
      const updatedAmenities = checked
        ? [...prevData.amenities, id]
        : prevData.amenities.filter((amenity) => amenity !== id);
      return { ...prevData, amenities: updatedAmenities };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted', propertyData);
    // You can send the data to the server or handle further logic here
  };
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const updatedImageRepository = files.map(file => file.name); // Store file names, or you can store URLs if you want to display previews.
    
    setPropertyData(prevData => ({
      ...prevData,
      image_repository: [...prevData.image_repository, ...updatedImageRepository] // Append the new files
    }));
  };
  const handleFloorplanChange = (e) => {
    const files = Array.from(e.target.files);
    const updatedFloorplan = files.map(file => file.name);

    setPropertyData(prevData => ({
      ...prevData,
      floorplan: [...prevData.floorplan, ...updatedFloorplan]
    }));
  };
  return (
    <div className="container mt-5" >
       <h1 className="mb-4 text-center text-primary">Property Edit Form</h1>
      <form onSubmit={handleSubmit} >
        {/* Username */}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className="form-control" id="username" value={propertyData.username} onChange={handleChange} />
        </div>

        {/* Pincode */}
        <div className="mb-3">
          <label htmlFor="pincode" className="form-label">Pincode</label>
          <input type="text" className="form-control" id="pincode" value={propertyData.pincode} onChange={handleChange} />
        </div>

        {/* Property For */}
        <div className="mb-3">
          <label htmlFor="property_for" className="form-label">Property For</label>
          <select  className="form-control" id="property_for" value={propertyData.property_for} onChange={handleChange} >
            <option value="Sale">Sale </option>
            <option value="Rent">Rent</option>
          </select>
        </div>

        {/* Category */}
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <select type="text" className="form-control" id="category" value={propertyData.category} onChange={handleChange} >
          <option value="Residential">Residential </option>
          <option value="Commericial">Commercial</option>
            </select>
        </div>

        {/* City */}
        <div className="mb-3">
          <label htmlFor="city" className="form-label">City</label>
          <input type="text" className="form-control" id="city" value={propertyData.city} onChange={handleChange} />
        </div>

        {/* Location */}
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location</label>
          <input type="text" className="form-control" id="location" value={propertyData.location} onChange={handleChange} />
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
          <select type="text" className="form-control" id="area_type" value={propertyData.area_type} onChange={handleChange} >
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
          <select  className="form-control" id="furnish_type" value={propertyData.furnish_type} onChange={handleChange} >
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
          <select type="text" className="form-control" id="construction_status" value={propertyData.construction_status} onChange={handleChange} >
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


        {/* Image Repository */}
        <div className="mb-3">
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
            <ul>
              {propertyData.image_repository.map((image, index) => (
                <li key={index}>{image}</li> 
              ))}
            </ul>
          </div>
        </div>
        {/* floorplan */}
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
            <h5>Uploaded Images:</h5>
            <ul>
              {propertyData.floorplan>1 && propertyData.floorplan.map((image, index) => (
                <li key={index}>{image}</li> 
              ))}
            </ul>
          </div>
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default PropertyEditForm;
