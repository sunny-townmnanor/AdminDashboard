import React, { useEffect, useState } from 'react';
import AdminAccesor from '../AdminAccesor';
import './Agent.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Agent() {
    // Initial data is passed from the JSON file
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of items per page
    const navigate  =useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://www.townmanor.ai/api/blogs');
                setData(response.data); // Ensure we set the actual data from response
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    // Handle delete functionality
    const deleteItem = async (id) => {
        alert("are sure want to delete");
        try {
            const response = await axios.delete(`https://www.townmanor.ai/api/blogs/${id}`);
            if (response.status === 200) {
                // Optimistically remove the item from the UI
                const updatedData = data.filter(item => item.id !== id);
                setData(updatedData);
                alert('Item deleted successfully!');
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Handle edit functionality
    const [editedItem, setEditedItem] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [imagePreview, setImagePreview] = useState(null); // For image preview

    const handleEdit = (item) => {
        setEditedItem(item);
        setImagePreview(item.img); // Set the initial preview to the current image
        setShowModal(true);
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(); // Default to your user's locale format (e.g., MM/DD/YYYY)
    };
    const handleSave = () => {
        const updatedData = data.map(item =>
            item.id === editedItem.id ? editedItem : item
        );
        setData(updatedData);
        setShowModal(false);
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
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setEditedItem((prev) => ({
                    ...prev,
                    img: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <AdminAccesor />
            <div className="AgentWorking">
                <div style={{ display: 'flex' }}>
                    <h1 className="Agent_id">Article/Blog Dashboard</h1>
                </div>
                 <button className='btn btn-success' onClick={()=>{
                    navigate('/uploadblog')
                 }}>Upload Blog</button>
                <form onSubmit={(e) => e.preventDefault()}>
                    {data.length === 0 ? (
                        <p>No articles available</p>
                    ) : (
                        <table className="table table-striped">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Picture</th>
                                    <th scope="heading">Heading</th>
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
                                                src={'https://s3.ap-south-1.amazonaws.com/townamnor.ai/blog-image'+item.img}
                                                alt="Image"
                                                id="Agent_mg"
                                                className="img-fluid"
                                                style={{ width: '150px', height: '100px' }}
                                            />
                                        </td>
                                        <th>{item.heading}</th>
                                        <td>{item.data.substring(0,200)}</td>
                                       
                                        <td>{formatDate(item.date)}</td>
                                        <td>
                                            <button className="btn btn-warning btn-sm" onClick={() => handleEdit(item)}>
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
                    )}
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
                                            className="model_eding_status"
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
                                            className="model_eding_status"
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
                                            className="model_eding_status"
                                            onChange={handleImageChange}
                                        />
                                        {imagePreview && (
                                            <div className="mt-2">
                                                <img
                                                    src={'https://s3.ap-south-1.amazonaws.com/townamnor.ai/blog-image'+imagePreview}
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
