import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PropertyTable.css';

function PropertyEditFormEnhanced() {
  const { index } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [propertyData, setPropertyData] = useState({
    id: null,
    pincode: '',
    city: '',
    locality: '',
    property_name: '',
    address: '',
    configuration: '',
    area_detail: '',
    area_type: '',
    bathroom: '',
    balcony: '',
    description: '',
    furnish_type: '',
    rera_id: '',
    floor_no: '',
    total_floor: '',
    construction_status: '',
    property_date: '',
    property_facing: '',
    price: '',
    maintenance_charge: '',
    token_amount: '',
    pricerange: 'Crore',
    money_type: 'Rupees',
    amenities: [],
    country: 'india',
    purpose: 'sale',
    category: 'residential',
    residential: 'apartment',
    Commercial: '',
    lat: null,
    lng: null,
    length: null,
    width: null,
    montly_rent: null,
    securitydeposit: null,
    current_lease: null,
    remaining_time: null,
    boundary_wall: null,
    no_of_open_side: null,
    floor_allowed: null,
    modifyinterior: null,
    lock_in_period: null,
    metro: '',
    school: '',
    hospital: '',
    mall: '',
    restaurant: '',
    bus: '',
    cinema: '',
    leased: 'no',
    floorplan: [],
    image_repository: [],
    status: 1,
    username: ''
  });

  const [floorplan, setFloorplan] = useState([]);
  const [photos, setPhotos] = useState([]);

  // Enhanced amenities list based on your data
  const availableAmenities = [
    "Park", "Parking", "Security", "Power Backup", 
    "Multipurpose Hall", "Swimming Pool", "Gym", 
    "Club House", "Lift", "Play Area", "CCTV", 
    "Multipurpose Court", "Guest Parking", "Community Hall", 
    "Kids Play Area", "Sports Facility", "Garden"
  ];

  useEffect(() => {
    fetchPropertyData();
  }, [index]);

  const fetchPropertyData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://www.townmanor.ai/api/owner-property/${index}`);
      const data = response.data;

      // Parse JSON strings
      try {
        if (typeof data.amenities === 'string') {
          data.amenities = JSON.parse(data.amenities);
        }
        if (typeof data.image_repository === 'string') {
          data.image_repository = JSON.parse(data.image_repository);
        }
        if (typeof data.floorplan === 'string') {
          data.floorplan = JSON.parse(data.floorplan);
        }
      } catch (e) {
        console.error('Error parsing JSON data:', e);
      }

      // Ensure arrays are initialized
      data.amenities = Array.isArray(data.amenities) ? data.amenities : [];
      data.image_repository = Array.isArray(data.image_repository) ? data.image_repository : [];
      data.floorplan = Array.isArray(data.floorplan) ? data.floorplan : [];

      setFloorplan(data.floorplan);
      setPhotos(data.image_repository);
      setPropertyData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load property data');
      setLoading(false);
      toast.error('Failed to load property data');
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPropertyData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleNumberChange = (e) => {
    const { id, value } = e.target;
    if (value === '' || !isNaN(value)) {
      setPropertyData(prev => ({
        ...prev,
        [id]: value === '' ? null : Number(value)
      }));
    }
  };

  const handleAmenitiesChange = (e) => {
    const { id, checked } = e.target;
    setPropertyData(prev => {
      const updatedAmenities = checked
        ? [...prev.amenities, id]
        : prev.amenities.filter(amenity => amenity !== id);
      return { ...prev, amenities: updatedAmenities };
    });
  };

  const handleDeletePhoto = (photoToDelete) => {
    setPhotos(prevPhotos => prevPhotos.filter(photo => photo !== photoToDelete));
    toast.success('Photo deleted successfully');
  };

  const handleDeleteFloorplan = (floorplanToDelete) => {
    setFloorplan(prevFloorplans => prevFloorplans.filter(floor => floor !== floorplanToDelete));
    toast.success('Floorplan deleted successfully');
  };

  const handleFloorplanChange = async (event) => {
    const files = Array.from(event.target.files);
    
    if (files.length + floorplan.length > 4) {
      toast.warning('Maximum 4 floorplans allowed');
      return;
    }
    
    const formData = new FormData();
    files.forEach(file => {
      formData.append("images", file);
    });

    try {
      const response = await axios.post('https://www.townmanor.ai/api/image/aws-upload-owner-images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        const uploadedFloorplanPaths = response.data.fileUrls;
        const trimmedFloorplanPaths = uploadedFloorplanPaths.map(path => 
          path.replace("https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/", "")
        );

        setFloorplan(prev => [...prev, ...trimmedFloorplanPaths]);
        toast.success('Floorplans uploaded successfully');
      }
    } catch (error) {
      console.error('Error uploading floorplans:', error);
      toast.error('Failed to upload floorplans');
    }
  };

  const handlePhotosChange = async (event) => {
    const files = Array.from(event.target.files);
    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });

    try {
      const response = await axios.post('https://www.townmanor.ai/api/image/aws-upload-owner-images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        const uploadedImagePaths = response.data.fileUrls;
        const trimmedImagePaths = uploadedImagePaths.map(path => 
          path.replace("https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/", "")
        );

        setPhotos(prev => [...prev, ...trimmedImagePaths]);
        toast.success('Photos uploaded successfully');
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Failed to upload images');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Validate required fields
      const requiredFields = ['property_name', 'city', 'locality', 'pincode', 'address', 'price'];
      const missingFields = requiredFields.filter(field => !propertyData[field]);
      
      if (missingFields.length > 0) {
        toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
        setLoading(false);
        return;
      }

      // Prepare data for submission
      const dataToSubmit = {
        ...propertyData,
        // Ensure proper JSON string format for arrays
        floorplan: Array.isArray(floorplan) ? JSON.stringify(floorplan) : '[]',
        image_repository: Array.isArray(photos) ? JSON.stringify(photos) : '[]',
        amenities: Array.isArray(propertyData.amenities) ? JSON.stringify(propertyData.amenities) : '[]',
        // Handle null values
        property_date: propertyData.property_date || null,
        price: Number(propertyData.price) || 0,
        area_detail: Number(propertyData.area_detail) || 0,
        bathroom: Number(propertyData.bathroom) || 0,
        balcony: Number(propertyData.balcony) || 0,
        floor_no: Number(propertyData.floor_no) || 0,
        total_floor: Number(propertyData.total_floor) || 0
      };

      console.log('Submitting data:', dataToSubmit);

      const response = await axios.put(`https://www.townmanor.ai/api/owner-property/${index}`, dataToSubmit);

      if (response.status === 200) {
        toast.success('Property updated successfully');
        setTimeout(() => {
          navigate('/propertycontrol');
        }, 2000);
      }
    } catch (error) {
      console.error('Error updating property:', error);
      
      // Handle different types of errors
      if (error.response) {
        // Server responded with an error
        const errorMessage = error.response.data?.message || error.response.data?.error || 'Server error occurred';
        toast.error(`Update failed: ${errorMessage}`);
        console.error('Server error details:', error.response.data);
      } else if (error.request) {
        // Request was made but no response received
        toast.error('No response from server. Please check your internet connection.');
      } else {
        // Error in request setup
        toast.error(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-4" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center text-primary">Property Edit Form</h1>
      <form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className="form-control" id="username" value={propertyData.username || ''} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="purpose" className="form-label">Purpose</label>
          <select className="form-control" id="purpose" value={propertyData.purpose} onChange={handleChange}>
            <option value="">Select Purpose</option>
            <option value="sale">Sale</option>
            <option value="rent">Rent</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <select className="form-control" id="category" value={propertyData.category} onChange={handleChange}>
            <option value="">Select Category</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>

        {propertyData.category === 'residential' && (
          <div className="mb-3">
            <label htmlFor="residential" className="form-label">Residential Type</label>
            <select className="form-control" id="residential" value={propertyData.residential} onChange={handleChange}>
              <option value="">Select Type</option>
              <option value="builderfloor">Builder Floor</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="independenthouse">Independent House</option>
            </select>
          </div>
        )}

        {propertyData.category === 'commercial' && (
          <div className="mb-3">
            <label htmlFor="Commercial" className="form-label">Commercial Type</label>
            <select className="form-control" id="Commercial" value={propertyData.Commercial} onChange={handleChange}>
              <option value="">Select Type</option>
              <option value="office">Office</option>
              <option value="retail">Retail</option>
              <option value="warehouse">Warehouse</option>
            </select>
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control" id="description" rows="3" value={propertyData.description || ''} onChange={handleChange}></textarea>
        </div>

        {/* Location Information */}
        <div className="mb-3">
          <label htmlFor="pincode" className="form-label">Pincode</label>
          <input type="text" className="form-control" id="pincode" value={propertyData.pincode || ''} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="city" className="form-label">City</label>
          <input type="text" className="form-control" id="city" value={propertyData.city || ''} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="locality" className="form-label">Locality</label>
          <input type="text" className="form-control" id="locality" value={propertyData.locality || ''} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="property_name" className="form-label">Property Name</label>
          <input type="text" className="form-control" id="property_name" value={propertyData.property_name || ''} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input type="text" className="form-control" id="address" value={propertyData.address || ''} onChange={handleChange} />
        </div>

        {/* Property Details */}
        <div className="mb-3">
          <label htmlFor="configuration" className="form-label">Configuration</label>
          <input type="text" className="form-control" id="configuration" value={propertyData.configuration || ''} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="area_detail" className="form-label">Area Detail</label>
          <input type="number" className="form-control" id="area_detail" value={propertyData.area_detail || ''} onChange={handleNumberChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="area_type" className="form-label">Area Type</label>
          <select className="form-control" id="area_type" value={propertyData.area_type || ''} onChange={handleChange}>
            <option value="">Select Area Type</option>
            <option value="Built-up area">Built-up area</option>
            <option value="Super Built-up area">Super Built-up area</option>
            <option value="Carpet area">Carpet area</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="bathroom" className="form-label">Bathrooms</label>
          <input type="number" className="form-control" id="bathroom" value={propertyData.bathroom || ''} onChange={handleNumberChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="balcony" className="form-label">Balconies</label>
          <input type="number" className="form-control" id="balcony" value={propertyData.balcony || ''} onChange={handleNumberChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="furnish_type" className="form-label">Furnishing Status</label>
          <select className="form-control" id="furnish_type" value={propertyData.furnish_type || ''} onChange={handleChange}>
            <option value="">Select Furnishing</option>
            <option value="Unfurnished">Unfurnished</option>
            <option value="Semi-Furnished">Semi-Furnished</option>
            <option value="Fully-Furnished">Fully-Furnished</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="property_facing" className="form-label">Property Facing</label>
          <select className="form-control" id="property_facing" value={propertyData.property_facing || ''} onChange={handleChange}>
            <option value="">Select Facing</option>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="East">East</option>
            <option value="West">West</option>
            <option value="North-East">North-East</option>
            <option value="North-West">North-West</option>
            <option value="South-East">South-East</option>
            <option value="South-West">South-West</option>
          </select>
        </div>

        {/* Price Information */}
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input type="number" className="form-control" id="price" value={propertyData.price || ''} onChange={handleNumberChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="pricerange" className="form-label">Price Range</label>
          <select className="form-control" id="pricerange" value={propertyData.pricerange} onChange={handleChange}>
            <option value="Lakh">Lakh</option>
            <option value="Crore">Crore</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="money_type" className="form-label">Currency</label>
          <select className="form-control" id="money_type" value={propertyData.money_type} onChange={handleChange}>
            <option value="Rupees">Rupees</option>
            <option value="Dollars">Dollars</option>
          </select>
        </div>

        {/* Additional Details */}
        <div className="mb-3">
          <label htmlFor="rera_id" className="form-label">RERA ID</label>
          <input type="text" className="form-control" id="rera_id" value={propertyData.rera_id || ''} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="floor_no" className="form-label">Floor Number</label>
          <input type="number" className="form-control" id="floor_no" value={propertyData.floor_no || ''} onChange={handleNumberChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="total_floor" className="form-label">Total Floors</label>
          <input type="number" className="form-control" id="total_floor" value={propertyData.total_floor || ''} onChange={handleNumberChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="construction_status" className="form-label">Construction Status</label>
          <select className="form-control" id="construction_status" value={propertyData.construction_status || ''} onChange={handleChange}>
            <option value="">Select Status</option>
            <option value="Ready to Move">Ready to Move</option>
            <option value="Under Construction">Under Construction</option>
            <option value="New Launch">New Launch</option>
          </select>
        </div>

        {/* Amenities */}
        <div className="mb-3">
          <label className="form-label">Amenities</label>
          <div className="row">
            {availableAmenities.map((amenity) => (
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

        {/* Nearby Locations */}
        <div className="mb-3">
          <label htmlFor="metro" className="form-label">Metro Distance (km)</label>
          <input type="number" className="form-control" id="metro" value={propertyData.metro || ''} onChange={handleNumberChange} step="0.1" />
        </div>

        <div className="mb-3">
          <label htmlFor="school" className="form-label">School Distance (km)</label>
          <input type="number" className="form-control" id="school" value={propertyData.school || ''} onChange={handleNumberChange} step="0.1" />
        </div>

        <div className="mb-3">
          <label htmlFor="hospital" className="form-label">Hospital Distance (km)</label>
          <input type="number" className="form-control" id="hospital" value={propertyData.hospital || ''} onChange={handleNumberChange} step="0.1" />
        </div>

        <div className="mb-3">
          <label htmlFor="mall" className="form-label">Mall Distance (km)</label>
          <input type="number" className="form-control" id="mall" value={propertyData.mall || ''} onChange={handleNumberChange} step="0.1" />
        </div>

        <div className="mb-3">
          <label htmlFor="restaurant" className="form-label">Restaurant Distance (km)</label>
          <input type="number" className="form-control" id="restaurant" value={propertyData.restaurant || ''} onChange={handleNumberChange} step="0.1" />
        </div>

        <div className="mb-3">
          <label htmlFor="bus" className="form-label">Bus Stop Distance (km)</label>
          <input type="number" className="form-control" id="bus" value={propertyData.bus || ''} onChange={handleNumberChange} step="0.1" />
        </div>

        <div className="mb-3">
          <label htmlFor="cinema" className="form-label">Cinema Distance (km)</label>
          <input type="number" className="form-control" id="cinema" value={propertyData.cinema || ''} onChange={handleNumberChange} step="0.1" />
        </div>

        {/* Images and Floorplans */}
        <div className="mb-3">
          <label htmlFor="floorplan" className="form-label">Floor Plans (Max 4)</label>
          <input
            type="file"
            className="form-control mb-3"
            id="floorplan"
            multiple
            accept="image/*"
            onChange={handleFloorplanChange}
          />
          <div className="image-gallery">
            {floorplan.map((floor, index) => (
              <div key={index} className="image-preview-container">
                <img 
                  src={`https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/${floor}`}
                  alt={`Floorplan ${index + 1}`}
                  className="preview-image"
                />
                <MdDelete
                  className="delete-icon"
                  onClick={() => handleDeleteFloorplan(floor)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="image_repository" className="form-label">Property Images</label>
          <input
            type="file"
            className="form-control mb-3"
            id="image_repository"
            multiple
            accept="image/*"
            onChange={handlePhotosChange}
          />
          <div className="image-gallery">
            {photos.map((photo, index) => (
              <div key={index} className="image-preview-container">
                <img 
                  src={`https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/${photo}`}
                  alt={`Property ${index + 1}`}
                  className="preview-image"
                />
                <MdDelete
                  className="delete-icon"
                  onClick={() => handleDeletePhoto(photo)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mb-3 d-flex justify-content-between">
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={() => navigate('/propertycontrol')}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default PropertyEditFormEnhanced; 