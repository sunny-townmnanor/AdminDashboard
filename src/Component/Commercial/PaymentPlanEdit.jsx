import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaSave, FaTimes, FaMoneyCheckAlt, FaBuilding, FaChartArea, FaCube } from 'react-icons/fa';
import './PaymentPlanEdit.css'; // Create this CSS file for custom styles

function PaymentPlanEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [imagePreview, setImagePreview] = useState({ floorplan: [] });
  const [othercharge, setOthercharge] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://www.townmanor.ai/api/api/commercial/commercial-units/${id}`);
        const projectData = response.data;

        if (projectData.paymentplan) {
          try {
            projectData.paymentplan = JSON.parse(projectData.paymentplan);
          } catch (error) {
            console.error("Error parsing paymentplan:", error);
            setErrorMessage('Failed to parse payment plan');
            return;
          }
        } else if (!Array.isArray(projectData.paymentplan)) {
          setErrorMessage('Invalid payment plan format');
          return;
        }

        setProject(projectData);
       // Parse othercharge if it's a stringified array
      if (projectData.othercharge) {
        try {
          projectData.othercharge = JSON.parse(projectData.othercharge); // Convert string to array
        } catch (error) {
          console.error("Error parsing othercharge:", error);
          setErrorMessage('Failed to parse other charges');
          return;
        }
      } else {
        projectData.othercharge = []; // Ensure it's an empty array if missing
      }

      
      } catch (error) {
        console.error("Error fetching project:", error);
        setErrorMessage('Failed to load project data');
      }
    };

    fetchData();
  }, [id]);

  const handleOtherChargeChange = (e, index, fieldIndex) => {
    const updatedOthercharge = [...othercharge]; // Create a copy of the othercharge array

    // Update the specific field in the othercharge array
    updatedOthercharge[index][fieldIndex] = e.target.value;

    // Update the state with the modified othercharge array
    setOthercharge(updatedOthercharge);
  };



  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentPlanChange = (e, index, innerIndex) => {
    const newPaymentPlan = [...project.paymentplan];
    newPaymentPlan[index][innerIndex] = e.target.value;
    setProject(prev => ({ ...prev, paymentplan: newPaymentPlan }));
  };

  const handleImageUpload = async (e, imageType) => {
    const files = Array.from(e.target.files);

    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });

    // try {
    //   const response = await axios.post('https://www.townmanor.ai/api/image/aws-upload-commercial-images', formData, {
    //     headers: { 'Content-Type': 'multipart/form-data' },
    //   });

    //   if (response.status === 200) {
    //     const uploadedImagePaths = response.data.fileUrls;

    //     const trimmedImagePaths = uploadedImagePaths.map(path => {
    //       return path.replace("https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/", "");
    //     });

    //     setImagePreview(prevState => ({
    //       ...prevState,
    //       [imageType]: [...prevState[imageType], ...trimmedImagePaths],
    //     }));
    //   } else {
    //     console.error('Error uploading images:', response);
    //     alert('Failed to upload images');
    //   }
    // } catch (error) {
    //   console.error('Error uploading images:', error);
    //   alert('An error occurred while uploading the images');
    // }
  };

  const handleImageRemove = (imageType, imageUrl) => {
    setImagePreview((prevState) => ({
      ...prevState,
      [imageType]: prevState[imageType].filter((img) => img !== imageUrl),
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setErrorMessage('');

    try {
      const response = await axios.put(
        `https://www.townmanor.ai/api/api/commercial/commercial-units/${id}`,
        project
      );

      if (response.status === 200) {
        navigate('/', { state: { successMessage: 'Project updated successfully!' } });
      } else {
        setErrorMessage('Failed to update project. Please try again.');
      }
    } catch (error) {
      console.error("Error saving project:", error);
      setErrorMessage('Error saving project. Please check your connection.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!project) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container payment-plan-edit">
      <div className="edit-header mb-4">
        <h1 style={{ fontSize: '2.5rem' }} className="display-4">
          <FaBuilding className="mr-2" />
          Edit {project.name} Payment Plan
        </h1>
        <p className="lead">Update the commercial unit details and payment structure</p>
      </div>

      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      <div className="card main-form-card mb-4">
        <div className="card-body">
          <div className="Pricing_form_section">
            <h4 className="section-title"><FaChartArea /> Basic Information</h4>
            <div className="row">
              <div className="col-md-6 form-group">
                <label>Project Name</label>
                <input
                  type="text"
                  className="payment_p_s_status payment_p_s_status-lg"
                  name="name"
                  value={project.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 form-group">
                <label>Category</label>
                <input
                  type="text"
                  className="payment_p_s_status payment_p_s_status-lg"
                  name="category"
                  value={project.category.charAt(0).toUpperCase() + project.category.slice(1).toLowerCase()}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 form-group">
                <label>Comm Prop Id</label>
                <input
                  type="text"
                  className="payment_p_s_status payment_p_s_status-lg"
                  name="category"
                  value={project.com_prop_id}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="Pricing_form_section">
            <h4 className="section-title"><FaMoneyCheckAlt /> Pricing & Status</h4>
            <div className="row">
              <div className="col-md-4 form-group">
                <label>Price (₹)</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">₹</span>
                  </div>
                  <input
                    type="text"
                    className="payment_p_s_status"
                    name="price"
                    value={project.price}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-4 form-group">
                <label>Available Units</label>
                <input
                  type="text"
                  className="payment_p_s_status"
                  name="available_unit"
                  value={project.available_unit || 'null'}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4 form-group">
                <label>Total Units</label>
                <input
                  type="text"
                  className="payment_p_s_status"
                  name="total_unit"
                  value={project.total_unit || 'null'}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Payment Plan Section */}
          <div className="Pricing_form_section">
            <h4 className="section-title"><FaCube /> Payment Plan Structure</h4>
            <div className="card-body">
              <div className="card mb-3">
                {project.paymentplan.map((plan, index) => (
                  <div className="row" key={index}>
                    <div className="col-md-8 form-group">
                      <input type="text" className="payment_p_s_status" value={plan[0]} onChange={(e) => handlePaymentPlanChange(e, index, 0)} required />
                    </div>
                    <div className="col-md-4 form-group">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">₹</span>
                        </div>
                        <input type="text" className="payment_p_s_status" value={plan[1]} onChange={(e) => handlePaymentPlanChange(e, index, 1)} required />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* <div className="Pricing_form_section">
            <h4 className="section-title">Additional Information</h4>
            <div className="card-body">
              <div className="card mb-3">
                {project.othercharge & project.othercharge.map((charge, index) => (
                  <div className="row" key={index}>
                    <div className="col-md-8 form-group">
                      <input
                        type="text"
                        className="payment_p_s_status"
                        value={charge[0]}
                        onChange={(e) => handleOtherChargeChange(e, index, 0)}
                        required
                      />
                    </div>
                    <div className="col-md-4 form-group">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">₹</span>
                        </div>
                        <input
                          type="text"
                          className="payment_p_s_status"
                          value={charge[1]}
                          onChange={(e) => handleOtherChargeChange(e, index, 1)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))
                }
              </div>
            </div>
          </div> */}

           {/* Other Charges Section */}
           <div className="Pricing_form_section">
            <h4 className="section-title"><FaMoneyCheckAlt /> Other Charges</h4>
            <div className="card-body">
              <div className="card mb-3">
                {othercharge.map((charge, index) => (
                  <div className="row" key={index}>
                    <div className="col-md-8 form-group">
                      <input
                        type="text"
                        className="payment_p_s_status"
                        value={charge[0]}
                        onChange={(e) => handleOtherChargeChange(e, index, 0)}
                        required
                      />
                    </div>
                    <div className="col-md-4 form-group">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">₹</span>
                        </div>
                        <input
                          type="text"
                          className="payment_p_s_status"
                          value={charge[1]}
                          onChange={(e) => handleOtherChargeChange(e, index, 1)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>


          {/* Floorplan Image Upload */}
          {project.floorplan && (
            <div className="col-md-6 form-group">
              <label>Floorplan URL</label>
              <input
                type="file"
                accept="images/*"
                className="payment_p_s_status"
                multiple
                name="floorplan"
                onChange={(e) => handleImageUpload(e, 'floorplan')}
              />
              <div className="image-preview-container">
                {/* Displaying the fetched floorplan image */}
                {project.floorplan && (
                  <div className="image-preview-item">
                    <img
                      src={'https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/' + project.floorplan}
                      alt="Fetched Floorplan"
                      className="image-preview"
                    />
                  </div>
                )}

                {/* Displaying the newly uploaded images */}
                {Array.isArray(imagePreview.floorplan) && imagePreview.floorplan.length > 0 && imagePreview.floorplan.map((imageUrl, index) => (
                  <div key={index} className="image-preview-item">
                    <img
                      src={'https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/' + imageUrl}
                      alt={`Uploaded Image ${index + 1}`}
                      className="image-preview"
                    />
                    <span
                      className="image-remove"
                      onClick={() => handleImageRemove('floorplan', imageUrl)}
                    >
                      ✖
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          ) : (
            <FaSave className="mr-2" />
          )}
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary btn-lg"
          onClick={() => navigate(`/commercialdashboard`)}
        >
          <FaTimes className="mr-2" />
          Cancel
        </button>
      </div>
    </div>
  );
}

export default PaymentPlanEdit;
