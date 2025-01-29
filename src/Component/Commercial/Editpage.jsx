import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Editpage.css';  // Import CSS for styling
import axios from 'axios';

function Editpage() {
  const { id } = useParams();  // Get the project ID from the URL
  const navigate = useNavigate();  // Use navigate to go back after saving
  const [project, setProject] = useState(null);
  const [imagePreview, setImagePreview] = useState({
    image_banner: [],
    main_image: [],
    floorplan: [],
    office_image: [],
    retail_shop: [],
    restaurant: [],
    other: []
  });
  const [amenities, setAmenities] = useState([]);
  const [distances, setDistances] = useState([]);
  const [floorplan, setfloorplan] = useState([]);

  // Fetch project data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://www.townmanor.ai/api/api/commercial/commercial-details/${id}`);
        setProject(response.data);

        // Parse amenities and distance data from API
        setAmenities(JSON.parse(response.data.amenities || '[]'));
        setDistances(JSON.parse(response.data.distance || '[]'));

        // Initialize image previews from API
        setImagePreview({
          image_banner: response.data.image_banner ? [response.data.image_banner] : [],
          main_image: JSON.parse(response.data.main_image || '[]'),
          floorplan: JSON.parse(response.data.floorplan || '[]'),
          office_image: JSON.parse(response.data.office_image || '[]'),
          retail_shop: JSON.parse(response.data.retail_shop || '[]'),
          restaurant: JSON.parse(response.data.restaurant || '[]'),
          other: JSON.parse(response.data.other || '[]'),
        });
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchData();
  }, [id]);

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;

    setAmenities((prevAmenities) => {
      if (checked) {
        return [...prevAmenities, value];
      } else {
        return prevAmenities.filter((amenity) => amenity !== value);
      }
    });
  };

  // Handle distance input change
  const handleDistanceChange = (e, index) => {
    const { name, value } = e.target;
    const updatedDistances = [...distances];
    updatedDistances[index] = {
      ...updatedDistances[index],
      [name]: value,
    };
    setDistances(updatedDistances);
  };

  // Image upload handler


  const handleImageUpload = async (e, imageType) => {
    const files = Array.from(e.target.files); // Convert the FileList to an array
    // Keep previous images for the given type

    // Optional: Add a file limit (e.g., 10 images)
    // Uncomment this block if you want to enforce a file limit.
    // if (files.length + newImages.length > 10) {
    //   alert('You can upload up to 10 images.');
    //   files.splice(0, files.length - (10 - newImages.length)); // Keep only the allowed files
    // }

    // Prepare FormData for image upload
    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file); // 'images' is the key expected by the backend
    });

    // Generate previews for the new images


    try {
      // Upload images to the backend (replace with your own API endpoint)
      const response = await axios.post('https://www.townmanor.ai/api/image/aws-upload-commercial-images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Check if the upload was successful
      if (response.status === 200) {
        const uploadedImagePaths = response.data.fileUrls;

        // Optionally clean up the image paths if needed
        const trimmedImagePaths = uploadedImagePaths.map(path => {
          return path.replace("https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/", "");
        });

        setImagePreview(prevState => ({
          ...prevState,
          [imageType]: [...prevState[imageType], ...trimmedImagePaths],
        }));
      } else {
        console.error('Error uploading images:', response);
        alert('Failed to upload images');
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('An error occurred while uploading the images');
    }
  };


  // Remove selected image
  const handleImageRemove = (imageType, imageUrl) => {
    setImagePreview((prevState) => ({
      ...prevState,
      [imageType]: prevState[imageType].filter((img) => img !== imageUrl),
    }));
  };

  // Save changes to the project via the API
  const handleSave = async () => {

    const datatosubmit = {
      ...project,
      image_banner: imagePreview.image_banner,
      main_image: imagePreview.main_image,
      floorplan: imagePreview.floorplan,
      office_image: imagePreview.office_image,
      retail_shop: imagePreview.retail_shop,
      restaurant: imagePreview.restaurant,
      other: imagePreview.other
    }
    console.log(datatosubmit)
    try {
      const response = await axios.put(`https://www.townmanor.ai/api/api/commercial/commercial-details/${id}`, datatosubmit)

      if (response.status === 200) {
        alert("Project updated successfully!");
        // You can add navigation here if needed
        // For example, redirect to a different page after success
        // history.push('/your-redirect-page'); // If using react-router
      } else {
        alert("There was an issue updating the project.");
      }// Navigate back to the main page after saving
    } catch (error) {
      console.error("Error saving project data:", error);
      alert("There was an error saving the project.");
    }
  };

  // If no project data is available, show loading state
  if (!project) return <div>Loading...</div>;

  return (
    <div className="edit-page-container">
      <div className="form-containeredit" style={{ textAlign: 'left' }}>
        <div>
          <h3>Edit Project: {project.project_name}</h3>
        </div>

        {/* Basic Details Section */}
        <form>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Project Name</label>
              <input
                type="text"
                className="form-control"
                name="project_name"
                value={project.project_name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label>City</label>
              <input
                type="text"
                className="form-control"
                name="city"
                value={project.city}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Address</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={project.address}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label>Investment</label>
              <input
                type="text"
                className="form-control"
                name="invest"
                value={project.invest}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Builder</label>
              <input
                type="text"
                className="form-control"
                name="builder"
                value={project.builder}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label>Possession Date</label>
              <input
                type="text"
                className="form-control"
                name="possession_date"
                value={project.possession_date}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Other Details Section */}
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Construction Status</label>
              <select value={project.construction_status} className="form-control" name="construction_status" onChange={handleChange}>
                <option value="Under construction">Under construction</option>
                <option value="Ready to Move">Ready to Move</option>
              </select>
            </div>
            <div className="form-group col-md-6">
              <label>Project Unit</label>
              <input type="number" className="form-control" name="project_unit" value={project.project_unit} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Latitude</label>
              <input type="number" step="any" className="form-control" name="lat" value={project.lat} onChange={handleChange} />
            </div>
            <div className="form-group col-md-6">
              <label>Longitude</label>
              <input type="number" step="any" className="form-control" name="lng" value={project.lng} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea className="form-control" name="description" value={project.description} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>RERA ID</label>
            <input type="text" className="form-control" name="rera_id" value={project.rera_id} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Project Area Range</label>
            <input type="text" className="form-control" name="project_area_range" value={project.project_area_range} onChange={handleChange} />
          </div>

          {/* Amenities Section */}

          <div className="form-group">
            <label>Amenities</label>
            <div className="amenities-list">
              {["Air conditioning", "Swimming Pool", "Internet", "Dishwasher", "MicroWave", "Intercomm Facility", "Gas Pipeline", "Gymnasium", "Parking", "Power Backup", "CCTV", "24 x 7 Security", "Court", "ClubHouse", "PlayArea", "GuestParking"].map((amenity, index) => (
                <div key={index} className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    value={amenity}
                    checked={amenities.includes(amenity)} // checks if the amenity is in the list
                    onChange={handleAmenityChange} // call the function on change
                  />
                  <label className="form-check-label">{amenity}</label>
                </div>
              ))}
            </div>
          </div>


          <div className="form-group">
            <label>Distances</label>
            {Array.isArray(distances) && distances.length > 0 ? (
              distances.map((distance, index) => (
                <div key={index} className="distance-item" style={{ display: 'flex', marginBottom: '5px' }}>
                  <input
                    style={{ width: '300px', fontWeight: '500', border: 'none' }}
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Place Name"
                    value={distance.name}
                    onChange={(e) => handleDistanceChange(e, index)}
                  />
                  <input
                    style={{ width: '300px' }}
                    type="text"
                    className="form-control"
                    name="distance"
                    placeholder="Distance"
                    value={distance.distance}
                    onChange={(e) => handleDistanceChange(e, index)}
                  />
                </div>
              ))
            ) : (
              <p>No distances available</p> // Fallback when distances is empty or not an array
            )}
          </div>

          {/* Image Sections */}
          {/* Image Banner */}
          <div className="form-group">
            <label>Upload Image Banner</label>
            <input type="file" accept="image/*" className="form-control" multiple onChange={(e) => handleImageUpload(e, 'image_banner')} />
            <div className="image-preview-container">
              {Array.isArray(imagePreview.image_banner) && imagePreview.image_banner.length > 0 && imagePreview.image_banner.map((imageUrl, index) => (
                <div key={index} className="image-preview-item">
                  <img src={`https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/${imageUrl}`} alt="" className="image-preview" />
                  <span className="image-remove" onClick={() => handleImageRemove('image_banner', imageUrl)}>✖</span>
                </div>
              ))}
            </div>
          </div>

          {/* Main Images */}
          <div className="form-group">
            <label>Upload Main Images</label>
            <input type="file" accept="image/*" className="form-control" multiple onChange={(e) => handleImageUpload(e, 'main_image')} />
            <div className="image-preview-container">
              {Array.isArray(imagePreview.main_image) && imagePreview.main_image.length > 0 && imagePreview.main_image.map((imageUrl, index) => (
                <div key={index} className="image-preview-item">
                  <img src={'https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/' + imageUrl} alt="" className="image-preview" />
                  <span className="image-remove" onClick={() => handleImageRemove('main_image', imageUrl)}>✖</span>
                </div>
              ))}
            </div>
          </div>

          {/* Floorplan Images */}
          <div className="form-group">
            <label>Upload Floorplan Images</label>
            <input type="file" accept="image/*" className="form-control" multiple onChange={(e) => handleImageUpload(e, 'floorplan')} />
            <div className="image-preview-container">
              {Array.isArray(imagePreview.floorplan) && imagePreview.floorplan.length > 0 &&imagePreview.floorplan.map((imageUrl, index) => (
                <div key={index} className="image-preview-item">
                  <img src={'https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/' + imageUrl} alt="" className="image-preview" />
                  <span className="image-remove" onClick={() => handleImageRemove('floorplan', imageUrl)}>✖</span>
                </div>
              ))}
            </div>
          </div>

          {/* Office Images */}
          <div className="form-group">
            <label>Upload Office Images</label>
            <input type="file" accept="image/*" className="form-control" multiple onChange={(e) => handleImageUpload(e, 'office_image')} />
            <div className="image-preview-container">
              {Array.isArray(imagePreview.office_image) && imagePreview.office_image.length > 0 &&imagePreview.office_image.map((imageUrl, index) => (
                <div key={index} className="image-preview-item">
                  <img src={'https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/' + imageUrl} alt="" className="image-preview" />
                  <span className="image-remove" onClick={() => handleImageRemove('office_image', imageUrl)}>✖</span>
                </div>
              ))}
            </div>
          </div>

          {/* Retail Shop Images */}
          <div className="form-group">
            <label>Upload Retail Shop Images</label>
            <input type="file" accept="image/*" className="form-control" multiple onChange={(e) => handleImageUpload(e, 'retail_shop')} />
            <div className="image-preview-container">
              {Array.isArray(imagePreview.retail_shop) && imagePreview.retail_shop.length > 0 &&imagePreview.retail_shop.map((imageUrl, index) => (
                <div key={index} className="image-preview-item">
                  <img src={'https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/' + imageUrl} alt="" className="image-preview" />
                  <span className="image-remove" onClick={() => handleImageRemove('retail_shop', imageUrl)}>✖</span>
                </div>
              ))}
            </div>
          </div>

          {/* Restaurant Images */}
          <div className="form-group">
            <label>Upload Restaurant Images</label>
            <input type="file" accept="image/*" className="form-control" multiple onChange={(e) => handleImageUpload(e, 'restaurant')} />
            <div className="image-preview-container">
              {Array.isArray(imagePreview.restaurant) && imagePreview.restaurant.length > 0 &&imagePreview.restaurant.map((imageUrl, index) => (
                <div key={index} className="image-preview-item">
                  <img src={'https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/' + imageUrl} alt="" className="image-preview" />
                  <span className="image-remove" onClick={() => handleImageRemove('restaurant', imageUrl)}>✖</span>
                </div>
              ))}
            </div>
          </div>
          {/* other */}
          <div className="form-group">
            <label>other Images</label>
            <input type="file" accept="image/*" className="form-control" multiple onChange={(e) => handleImageUpload(e, 'other')} />
            <div className="image-preview-container">
              {Array.isArray(imagePreview.other) && imagePreview.other.length > 0 &&imagePreview.other.map((imageUrl, index) => (
                <div key={index} className="image-preview-item">
                  <img src={'https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/' + imageUrl} alt="" className="image-preview" />
                  <span className="image-remove" onClick={() => handleImageRemove('restaurant', imageUrl)}>✖</span>
                </div>
              ))}
            </div>
          </div>
          {/* Save/Cancel Buttons */}
          <div className="form-row">
            <button type="button" className="btn btn-success" onClick={handleSave}>
              Save
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Editpage;
