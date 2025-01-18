import React, { useState } from 'react';
import AdminAccesor from '../AdminAccesor';
import dummy from './User.json';
import './User.css';
import '../Inquirelead/Inquire.css'

function User() {
  const [data, setData] = useState(dummy); // User data
  const [editingUser, setEditingUser] = useState(null); // Track the user being edited
  const [editFormData, setEditFormData] = useState({
    id: '',
    username: '',
    realname: '',
    usertype: '',
    phoneNo: '',
    Address: '',
    Description: '',
    email: '',
    status: '',
    token: '',
  }); // Form data for editing

  // Function to handle editing a user
  const handleEditClick = (item) => {
    setEditingUser(item.id); // Set the user to be edited
    setEditFormData({
      id: item.id,
      username: item.username,
      realname: item.realname,
      usertype: item.Usertype,

      
      phoneNo: item.PhoneNo,
      Address: item.Adress,
      Description: item.Description,
      email: item.Email,
      status: item.Status,
      token: item.Token,
    });
  };

  // Handle changes to the edit form fields
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  // Handle form submission to update the data
  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    const updatedData = data.map((item) =>
      item.id === editingUser ? { ...item, ...editFormData } : item
    );
    setData(updatedData); // Update the user data
    setEditingUser(null); // Stop editing
  };

  // Function to handle deleting a user
  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id); // Remove the user by ID
    setData(updatedData); // Update the state with the filtered list
  };

  return (
    <>
      <div className='ur-user'>
        <div>
          <AdminAccesor />
        </div>

        <div className="inquireworking">
          <h1>User Agent Dashboard</h1>
          {editingUser ? (

            <form onSubmit={handleEditFormSubmit} className="form-container">
              <h3>Edit User</h3>

              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  name="username"
                  value={editFormData.username}
                  onChange={handleEditFormChange}
                  id="username"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="realname">Real Name:</label>
                <input
                  type="text"
                  name="realname"
                  value={editFormData.realname}
                  onChange={handleEditFormChange}
                  id="realname"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="usertype">Type:</label>
                <input
                  type="text"
                  name="usertype"
                  value={editFormData.usertype}
                  onChange={handleEditFormChange}
                  id="usertype"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phoneNo">Phone Number:</label>
                <input
                  type="text"
                  name="phoneNo"
                  value={editFormData.phoneNo}
                  onChange={handleEditFormChange}
                  id="phoneNo"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="Address">Address:</label>
                <input
                  type="text"
                  name="Address"
                  value={editFormData.Address}
                  onChange={handleEditFormChange}
                  id="Address"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="Description">Description:</label>
                <input
                  type="text"
                  name="Description"
                  value={editFormData.Description}
                  onChange={handleEditFormChange}
                  id="Description"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleEditFormChange}
                  id="email"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="status">Status:</label>
                <input
                  type="text"
                  name="status"
                  value={editFormData.status}
                  onChange={handleEditFormChange}
                  id="status"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="token">Token:</label>
                <input
                  type="text"
                  name="token"
                  value={editFormData.token}
                  onChange={handleEditFormChange}
                  id="token"
                  className="form-input"
                />
              </div>

              <button type="submit" className="btn-submit">
                Save Changes
              </button>
            </form>

          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">User Name</th>
                  <th scope="col">Real Name</th>
                  <th scope="col">Usertype</th>
                  <th scope="col">PhoneNo</th>
                  <th scope="col">Address</th>
                  <th scope="col">Description</th>
                  <th scope="col">Email</th>
                  <th scope="col">Status</th>
                  <th scope="col">Token</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <th>{item.id}</th>
                    <td>{item.username}</td>
                    <td>{item.realname}</td>
                    <td>{item.Usertype}</td>
                    <td>{item.phoneNo}</td>
                    <td>{item.Address}</td>
                    <td>{item.Description}</td>
                    <td>{item.email}</td>
                    <td>{item.status}</td>
                    <td>{item.token}</td>

                    <td>
                      <button
                        className="btn btn-primary"
                        type="button"
                        onClick={() => handleEditClick(item)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        type="button"
                        onClick={() => handleDelete(item.id)} // Delete the user by ID
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default User;

