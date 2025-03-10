import React, { useEffect, useState } from 'react';
import advdummy from './Adv.json';
import AdminAccesor from '../AdminAccesor';
import Modal from 'react-modal';
import './Advertisement.css';
import axios from 'axios';

Modal.setAppElement('#root'); // Important for accessibility

function HomePageAdv() {
  const [adv, setAdv] = useState([]); // Initial state as an empty array
  useEffect(() => {
    const getdata = async () => {
      try {
        const response = await axios.get('https://www.townmanor.ai/api/ads');
        console.log(response); // Debugging to inspect response format
        // Check if the response contains the data in the expected format
        if (Array.isArray(response.data)) {
          setAdv(response.data); // Set state with ads data
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (error) {
        console.log(error);
        alert("Failed to fetch advertisements.");
      }
    };
    getdata();
  }, []);

  const [formData, setFormData] = useState({
    imgname: "",
    type: "homepage",
    status: "active",
    imageUrl: "",
    url: "https://townmanor.ai/"
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file); // Temporary preview
      setFormData({ ...formData, imageUrl });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if file is selected
    if (!imageFile) {
      alert("Please upload an image!");
      return;
    }

    // Prepare the FormData
    const formDataToSend = new FormData();
    formDataToSend.append("imgname", formData.imgname || "default-name"); // Ensure imgname is provided
    formDataToSend.append("type", formData.type); // "homepage" or "sidebar"
    formDataToSend.append("status", formData.status); // "active" or "inactive"
    formDataToSend.append("files", imageFile); // Attach the image file (only one file for now)

    try {
      // Debugging: Log formData to ensure all fields are present
      console.log("FormData to send:", formDataToSend);

      const response = await fetch("https://www.townmanor.ai/api/ads", {
        method: "POST",
        body: formDataToSend,
      });

      // Check if the response is successful
      if (!response.ok) {
        // If not, log the error and response
        const errorData = await response.json();
        console.error("Error from API:", errorData);
        alert(`Error: ${errorData.message || "Unknown error"}`);
      } else {
        const data = await response.json();
        console.log("Advertisement submitted successfully", data);

        // Assuming the API responds with the imageUrl and other necessary fields
        setAdv([...adv, {
          id: data.id,
          imgname: formData.imgname,
          type: formData.type,
          status: formData.status,
          imageUrl: data.imageUrl, // imageUrl returned by the backend
          createdAt: data.createdAt // createdAt returned by the backend
        }]); // Add the new ad

        alert("Advertisement Submitted!");
        setIsModalOpen(false); // Close the modal after submission
      }
    } catch (error) {
      console.error("Error submitting advertisement:", error);
      alert("An error occurred while submitting the advertisement.");
    }
  };
  function trimHtmlEncodedString(str) {
    // Step 1: Decode HTML entities like &quot;
    return str.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, '');
  }
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div>
          <AdminAccesor />
        </div>
        <div style={{ width: '100%' }}>
          <h1>Home Page Advertisement Section</h1>
          <button onClick={() => setIsModalOpen(true)}>Add Image</button>

          {/* Modal to create new advertisement */}
          <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} contentLabel="Add New Advertisement">
            <div className="container mt-5">
              <h2>Create New Ad</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="imgUpload" className="form-label">Image Upload</label>
                  <input type="file" className="form-control" id="imgUpload" name="imgUpload" accept="image/*" onChange={handleImageUpload} />
                  {formData.imageUrl && <img src={formData.imageUrl} alt="Preview" width="100" />}
                </div>

                <div className="mb-3">
                  <label htmlFor="status" className="form-label">Status</label>
                  <select className="form-select" id="status" name="status" value={formData.status} onChange={handleChange}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="url" className="form-label">URL</label>
                  <input type="url" className="form-control" id="url" name="url" value={formData.url} onChange={handleChange} />
                </div>

                <div className="mb-3">
                  <label htmlFor="type" className="form-label">Type</label>
                  <input type="text" className="form-control" id="type" name="type" value="homepage" readOnly />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </Modal>

          <div className="advboxes">
            {Array.isArray(adv) && adv.length > 0 ?
              adv.map((item, index) => (
                <div key={index} className="advcards">
                  <img src={trimHtmlEncodedString(item.imageUrl)} alt={item.imgname} id="advid" />
                  <h3>Status: {item.status}</h3>
                  <button>Change Status</button>
                </div>
              ))
              :
              <p>No advertisements available.</p>}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePageAdv;
