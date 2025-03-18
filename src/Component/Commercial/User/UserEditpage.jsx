import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UserEditpage.css'; 
import axios from 'axios';

function UserEditpage() {
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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [activeSection, setActiveSection] = useState('basic');
  const [formErrors, setFormErrors] = useState({});

  // Fetch project data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://www.townmanor.ai/api/api/commercial/commercial-details/${id}`);
        setProject(response.data);

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
        alert("Failed to load project data. Please try again.");
      } finally {
        setLoading(false);
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
    
    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };

  // Image upload handler
  const handleImageUpload = async (e, imageType) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Initialize progress for this upload
    setUploadProgress({
      ...uploadProgress,
      [imageType]: 0
    });

    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });

    try {
      const response = await axios.post(
        'https://www.townmanor.ai/api/image/aws-upload-commercial-images', 
        formData, 
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress({
              ...uploadProgress,
              [imageType]: percentCompleted
            });
          }
        }
      );

      if (response.status === 200) {
        const uploadedImagePaths = response.data.fileUrls;

        const trimmedImagePaths = uploadedImagePaths.map(path => {
          return path.replace("https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/", "");
        });

        setImagePreview(prevState => ({
          ...prevState,
          [imageType]: [...prevState[imageType], ...trimmedImagePaths],
        }));
        
        // Clear progress after successful upload
        setTimeout(() => {
          setUploadProgress({
            ...uploadProgress,
            [imageType]: null
          });
        }, 1000);
      } else {
        console.error('Error uploading images:', response);
        alert('Failed to upload images');
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('An error occurred while uploading the images');
      
      // Clear progress on error
      setUploadProgress({
        ...uploadProgress,
        [imageType]: null
      });
    }
  };

  // Remove selected image
  const handleImageRemove = (imageType, imageUrl) => {
    setImagePreview((prevState) => ({
      ...prevState,
      [imageType]: prevState[imageType].filter((img) => img !== imageUrl),
    }));
  };

  // Validate form before submission
  const validateForm = () => {
    const errors = {};
    
    if (!project.address || project.address.trim() === '') {
      errors.address = 'Address is required';
    }
    
    if (!project.invest || project.invest.trim() === '') {
      errors.invest = 'Investment information is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Navigate to payment plan
  const goToPaymentPlan = () => {
    navigate(`/paymentplan/${id}`);
  };

  // Save changes to the project via the API
  const handleSave = async () => {
    if (!validateForm()) {
      // Scroll to the first error
      const firstError = document.querySelector('.error-message');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setSaving(true);
    
    // Prepare data with proper JSON formatting for arrays
    const dataToSubmit = {
      ...project,
      image_banner: imagePreview.image_banner.length > 0 ? imagePreview.image_banner[0] : null,
      main_image: JSON.stringify(imagePreview.main_image),
      floorplan: JSON.stringify(imagePreview.floorplan),
      office_image: JSON.stringify(imagePreview.office_image),
      retail_shop: JSON.stringify(imagePreview.retail_shop),
      restaurant: JSON.stringify(imagePreview.restaurant),
      other: JSON.stringify(imagePreview.other)
    };
    
    try {
      const response = await axios.put(`https://www.townmanor.ai/api/api/commercial/commercial-details/${id}`, dataToSubmit);

      if (response.status === 200) {
        alert("Project updated successfully!");
        navigate('/');
      } else {
        alert("There was an issue updating the project.");
      }
    } catch (error) {
      console.error("Error saving project data:", error);
      alert("There was an error saving the project.");
    } finally {
      setSaving(false);
    }
  };

  // If no project data is available, show loading state
  if (loading) {
    return (
      <div className="loading-spinner">
        <div>Loading project data...</div>
      </div>
    );
  }

  if (!project) return <div className="loading_sp">Project not found</div>;

  // Navigation tabs for different sections
  const renderTabs = () => (
    <div className="nav-tabs">
      <div>
        <button 
          className={`nav-tab ${activeSection === 'basic' ? 'active' : ''}`} 
          onClick={() => setActiveSection('basic')}
        >
          Basic Details
        </button>
        <button 
          className={`nav-tab ${activeSection === 'images' ? 'active' : ''}`} 
          onClick={() => setActiveSection('images')}
        >
          Images
        </button>
      </div>
      <div>
        <div className="View_Payment_Plan" style={{ justifyContent: 'center', margin: '0px' }}>
          <button style={{margin: '0px'}}
            type="button"
            className="btn btn-payment"
            onClick={goToPaymentPlan}
          >
            View Payment Plan
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="edit-page-container">
      <div className="form-containeredit">
        <div className="section-title">
          <h2>Edit Project: {project.project_name}</h2>
          <p>Make changes to your commercial property listing</p>
        </div>

        {renderTabs()}

        <form>
          {/* Basic Details Section */}
          {activeSection === 'basic' && (
            <div className="form_sec_status">
              <h3 className="section-title">Basic Details</h3>
              
              <div className="View_Payment_Plan">
                <div className="Retail_form_group col-md-6">
                  <label>Project Name</label>
                  <div className="readonly-field">
                    {project.project_name}
                  </div>
                </div>
                <div className="Retail_form_group col-md-6">
                  <label>City</label>
                  <div className="readonly-field">
                    {project.city}
                  </div>
                </div>
              </div>

              <div className="View_Payment_Plan">
                <div className="Retail_form_group col-md-6">
                  <label>Address</label>
                  <input 
                    type="text" 
                    className={`form-control ${formErrors.address ? 'error-input' : ''}`} 
                    name="address" 
                    value={project.address} 
                    onChange={handleChange}
                    placeholder="Enter complete address"
                  />
                  {formErrors.address && <div className="error-message">{formErrors.address}</div>}
                </div>
                <div className="Retail_form_group col-md-6">
                  <label>Investment</label>
                  <input 
                    type="text" 
                    className={`form-control ${formErrors.invest ? 'error-input' : ''}`} 
                    name="invest" 
                    value={project.invest} 
                    onChange={handleChange}
                    placeholder="Investment amount or range"
                  />
                  {formErrors.invest && <div className="error-message">{formErrors.invest}</div>}
                </div>
              </div>

              <div className="View_Payment_Plan">
                <div className="Retail_form_group col-md-6">
                  <label>Construction Status</label>
                  <select 
                    value={project.construction_status} 
                    className="form-control" 
                    name="construction_status" 
                    onChange={handleChange}
                  >
                    <option value="">Select status</option>
                    <option value="Under construction">Under construction</option>
                    <option value="Ready to Move">Ready to Move</option>
                  </select>
                </div>
                <div className="Retail_form_group col-md-6">
                  <label>Project Unit</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    name="project_unit" 
                    value={project.project_unit} 
                    onChange={handleChange}
                    placeholder="Number of units"
                  />
                </div>
              </div>
              
              {/* <div className="form-row" style={{ justifyContent: 'center', marginTop: '20px' }}>
                <button 
                  type="button" 
                  className="btn btn-payment" 
                  onClick={goToPaymentPlan}
                >
                  View Payment Plan
                </button>
              </div> */}
            </div>
          )}

          {/* Images Section */}
          {activeSection === 'images' && (
            <div className="form_sec_status">
              <h3 className="section-title">Project Images</h3>
              
              {/* Image Banner */}
              <div className="Retail_form_group">
                <label>Banner Image (Main display image)</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="form-control" 
                  onChange={(e) => handleImageUpload(e, 'image_banner')} 
                />
                {uploadProgress.image_banner !== undefined && uploadProgress.image_banner !== null && (
                  <div className="upload_img_progress">
                    <div 
                      className="upload_img_progress_bar" 
                      style={{ width: `${uploadProgress.image_banner}%` }}
                    ></div>
                  </div>
                )}
                <div className="img_pre_status">
                  {Array.isArray(imagePreview.image_banner) && imagePreview.image_banner.length > 0 && imagePreview.image_banner.map((imageUrl, index) => (
                    <div key={index} className="image-preview-item">
                      <img src={`https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/${imageUrl}`} alt="" className="image-preview" />
                      <span className="image-remove" onClick={() => handleImageRemove('image_banner', imageUrl)}>✖</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Images */}
              <div className="Retail_form_group">
                <label>Main Project Images</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="form-control" 
                  multiple 
                  onChange={(e) => handleImageUpload(e, 'main_image')} 
                />
                {uploadProgress.main_image !== undefined && uploadProgress.main_image !== null && (
                  <div className="upload_img_progress">
                    <div 
                      className="upload_img_progress_bar" 
                      style={{ width: `${uploadProgress.main_image}%` }}
                    ></div>
                  </div>
                )}
                <div className="img_pre_status">
                  {Array.isArray(imagePreview.main_image) && imagePreview.main_image.length > 0 && imagePreview.main_image.map((imageUrl, index) => (
                    <div key={index} className="image-preview-item">
                      <img src={`https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/${imageUrl}`} alt="" className="image-preview" />
                      <span className="image-remove" onClick={() => handleImageRemove('main_image', imageUrl)}>✖</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floorplan Images */}
              <div className="Retail_form_group">
                <label>Floorplan Images</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="form-control" 
                  multiple 
                  onChange={(e) => handleImageUpload(e, 'floorplan')} 
                />
                {uploadProgress.floorplan !== undefined && uploadProgress.floorplan !== null && (
                  <div className="upload_img_progress">
                    <div 
                      className="upload_img_progress_bar" 
                      style={{ width: `${uploadProgress.floorplan}%` }}
                    ></div>
                  </div>
                )}
                <div className="img_pre_status">
                  {Array.isArray(imagePreview.floorplan) && imagePreview.floorplan.length > 0 && imagePreview.floorplan.map((imageUrl, index) => (
                    <div key={index} className="image-preview-item">
                      <img src={`https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/${imageUrl}`} alt="" className="image-preview" />
                      <span className="image-remove" onClick={() => handleImageRemove('floorplan', imageUrl)}>✖</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Office Images */}
              <div className="Retail_form_group">
                <label>Office Space Images</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="form-control" 
                  multiple 
                  onChange={(e) => handleImageUpload(e, 'office_image')} 
                />
                {uploadProgress.office_image !== undefined && uploadProgress.office_image !== null && (
                  <div className="upload_img_progress">
                    <div 
                      className="upload_img_progress_bar" 
                      style={{ width: `${uploadProgress.office_image}%` }}
                    ></div>
                  </div>
                )}
                <div className="img_pre_status">
                  {Array.isArray(imagePreview.office_image) && imagePreview.office_image.length > 0 && imagePreview.office_image.map((imageUrl, index) => (
                    <div key={index} className="image-preview-item">
                      <img src={`https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/${imageUrl}`} alt="" className="image-preview" />
                      <span className="image-remove" onClick={() => handleImageRemove('office_image', imageUrl)}>✖</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Retail Shop Images */}
              <div className="Retail_form_group">
                <label>Retail Shop Images</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="form-control" 
                  multiple 
                  onChange={(e) => handleImageUpload(e, 'retail_shop')} 
                />
                {uploadProgress.retail_shop !== undefined && uploadProgress.retail_shop !== null && (
                  <div className="upload_img_progress">
                    <div 
                      className="upload_img_progress_bar" 
                      style={{ width: `${uploadProgress.retail_shop}%` }}
                    ></div>
                  </div>
                )}
                <div className="img_pre_status">
                  {Array.isArray(imagePreview.retail_shop) && imagePreview.retail_shop.length > 0 && imagePreview.retail_shop.map((imageUrl, index) => (
                    <div key={index} className="image-preview-item">
                      <img src={`https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/${imageUrl}`} alt="" className="image-preview" />
                      <span className="image-remove" onClick={() => handleImageRemove('retail_shop', imageUrl)}>✖</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Restaurant Images */}
              <div className="Retail_form_group">
                <label>Restaurant Images</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="form-control" 
                  multiple 
                  onChange={(e) => handleImageUpload(e, 'restaurant')} 
                />
                {uploadProgress.restaurant !== undefined && uploadProgress.restaurant !== null && (
                  <div className="upload_img_progress">
                    <div 
                      className="upload_img_progress_bar" 
                      style={{ width: `${uploadProgress.restaurant}%` }}
                    ></div>
                  </div>
                )}
                <div className="img_pre_status">
                  {Array.isArray(imagePreview.restaurant) && imagePreview.restaurant.length > 0 && imagePreview.restaurant.map((imageUrl, index) => (
                    <div key={index} className="image-preview-item">
                      <img src={`https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/${imageUrl}`} alt="" className="image-preview" />
                      <span className="image-remove" onClick={() => handleImageRemove('restaurant', imageUrl)}>✖</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Other Images */}
              <div className="Retail_form_group">
                <label>Other Images</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="form-control" 
                  multiple 
                  onChange={(e) => handleImageUpload(e, 'other')} 
                />
                {uploadProgress.other !== undefined && uploadProgress.other !== null && (
                  <div className="upload_img_progress">
                    <div 
                      className="upload_img_progress_bar" 
                      style={{ width: `${uploadProgress.other}%` }}
                    ></div>
                  </div>
                )}
                <div className="img_pre_status">
                  {Array.isArray(imagePreview.other) && imagePreview.other.length > 0 && imagePreview.other.map((imageUrl, index) => (
                    <div key={index} className="image-preview-item">
                      <img src={`https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/${imageUrl}`} alt="" className="image-preview" />
                      <span className="image-remove" onClick={() => handleImageRemove('other', imageUrl)}>✖</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Save/Cancel Buttons - Always visible */}
          <div className="form-row" style={{ justifyContent: 'flex-end', marginTop: '30px' }}>
            <button 
              type="button" 
              className="btn btn-success" 
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={() => navigate('/')}
              disabled={saving}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserEditpage;
