import React, { useState } from 'react';
import AdminAccesor from '../AdminAccesor';
import './Agent.css';
import dummy from './Agent.json';

function Agent() {
    // Initial data is passed from the JSON file
    const [data, setData] = useState(dummy);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of items per page

    // Handle delete functionality
    const deleteItem = (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            const updatedData = data.filter(item => item.id !== id);
            setData(updatedData);
        }
    };

    // Handle edit functionality - open modal and update the context, date, and image
    const [editedItem, setEditedItem] = useState(null);
    const [showModal, setShowModal] = useState(false); // Manage modal visibility
    const [imagePreview, setImagePreview] = useState(null); // For image preview

    const handleEdit = (item, event) => {
        event.preventDefault();  // Prevent form submission and page refresh
        setEditedItem(item);  // Set the item data to be edited
        setImagePreview(item.img); // Set the initial preview to the current image
        setShowModal(true);  // Open the modal
    };

    const handleSave = () => {
        const updatedData = data.map(item =>
            item.id === editedItem.id ? editedItem : item
        );
        setData(updatedData);
        setShowModal(false);  // Close the modal after saving
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedItem((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle image change (file input)
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Create a local image preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); // Set the image preview URL
                setEditedItem((prev) => ({
                    ...prev,
                    img: reader.result // Store the image file as a base64 string (for local usage)
                }));
            };
            reader.readAsDataURL(file); // Convert the file to base64
        }
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row'
        }}>
            <div>
                <AdminAccesor />
            </div>
            <div className='AgentWorking'>
                <div  style={{display:'flex'}}>
                <h1 class="Agent_id">Artical Dashboard</h1>
                <button style={{height:'30px'}} className="btn btn-warning btn-sm">Sign up</button>

                </div>

                <form onSubmit={(e) => e.preventDefault()}> {/* Prevent form submit from refreshing page */}
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Picture</th>
                                <th scope="col">Content</th>
                                <th scope="col">Date</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((item) => (
                                <tr key={item.id}>
                                    <th scope="row">{item.id}</th>
                                    <td>
                                        <img
                                            src={item.img}
                                            alt="Image"
                                            id="Agent_mg"
                                            className="img-fluid"
                                            style={{ width: '150px', height: '100px' }} // Adjust image size if needed
                                        />
                                    </td>
                                    <td>{item.data}</td>
                                    <td>{item.date}</td>
                                    <td>
                                        <button className="btn btn-warning btn-sm" onClick={(e) => handleEdit(item, e)}>
                                            Edit
                                        </button>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger btn-sm" onClick={() => deleteItem(item.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>

                {/* Pagination Controls */}
                <nav>
                    <ul className="pagination">
                        <li className="page-item">
                            <button
                                className="page-link"
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                        </li>
                        {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, index) => (
                            <li key={index + 1} className="page-item">
                                <button
                                    className={`page-link ${currentPage === index + 1 ? 'active' : ''}`}
                                    onClick={() => paginate(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                        <li className="page-item">
                            <button
                                className="page-link"
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>

                {/* Modal for editing */}
                {showModal && editedItem && (
                    <div className="modal fade show" style={{ display: "block" }} aria-labelledby="editModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="editModalLabel">Edit Item</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label htmlFor="context" className="form-label">Context</label>
                                        <textarea
                                            id="context"
                                            name="data"
                                            className="form-control"
                                            value={editedItem.data}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="date" className="form-label">Date</label>
                                        <input
                                            type="date"
                                            id="date"
                                            name="date"
                                            className="form-control"
                                            value={editedItem.date}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="img" className="form-label">Change Image</label>
                                        <input
                                            type="file"
                                            id="img"
                                            name="img"
                                            className="form-control"
                                            onChange={handleImageChange}
                                        />
                                        {imagePreview && (
                                            <div className="mt-2">
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    style={{ width: '150px', height: '100px' }}
                                                    className="img-fluid"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <button type="button" className="btn btn-primary" onClick={handleSave}>Save Changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Agent;
