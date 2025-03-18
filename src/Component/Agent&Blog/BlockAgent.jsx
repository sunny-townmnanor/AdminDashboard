import React, { useEffect, useState } from 'react';
import './BlockAgent.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function BlockAgent() {
    const navigate = useNavigate();
    const [data, setData] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [zoomed, setZoomed] = useState(false);  // State to handle zoom

    useEffect(() => {
        const getdata = async () => {
            try {
                const response = await axios.get('https://www.townmanor.ai/api/blogs');
                setData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getdata();
    }, []);

    const itemsPerPage = 9;

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = data ? data.slice(indexOfFirstItem, indexOfLastItem) : [];

    // Handle page change
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Navigate to the article page
    const secondpage = (index) => {
        navigate(`/blockArtica/${index}`);
    };

    // Safely calculate total pages
    const totalPages = data ? Math.ceil(data.length / itemsPerPage) : 0;

    // Toggle zoom effect
    const toggleZoom = () => {
        setZoomed(!zoomed);
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(); // Default to your user's locale format (e.g., MM/DD/YYYY)
    };
    return (
        <div className="Appx">
            {/* Header Section */}
            <header className="App-headerx">
                <img
                    src="/backbg3.jpeg"
                    alt="Nature"
                    style={{
                        height: '55vh',
                        width: '100%',
                        objectFit: 'cover',
                    }}
                />
                <div className="Town_Blog">
                    <h1>Welcome to <b>Townmanor Blog's</b> </h1>
                    <p>Discover <b>Best Blog </b>in one place</p>
                    <a href="#blogscard">
                        <button className="cta-button viewblog">View Blog</button>
                    </a>
                </div>
            </header>

            {/* Features Section */}
            <section className="features-section" id="blogscard">
                <div className="features">
                    {currentData.map((item) => (
                        <div
                            className="feature-card"
                            onClick={() => secondpage(item.id)}
                            key={item.id}
                        >
                            <div
                                className={`image-wrapper ${zoomed ? 'zoomed' : ''}`}
                                onClick={toggleZoom} // Toggle zoom on click
                            >
                                <img
                                    className="card-img-top"
                                    src={'https://s3.ap-south-1.amazonaws.com/townamnor.ai/blog-image'+item.img}
                                    alt="Card image cap"
                                />
                            </div>
                            <h1 className="hd-top">{item.heading}</h1>
                            <p className="para1">{item.data.substring(0, 200)}</p>
                            <a href="" className="read-more-link">
                                <span className="arrow-symbol">&#10230;</span>
                                Read More
                            </a>
                            <p className="create-date">{formatDate(item.date)}</p>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="pagination">
                    <button
                        className="pagination-button"
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>

                    {/* Numbered Pages */}
                    {[...Array(totalPages).keys()].map((pageNumber) => (
                        <button
                            key={pageNumber + 1}
                            className={`pagination-number ${currentPage === pageNumber + 1 ? 'active' : ''}`}
                            onClick={() => paginate(pageNumber + 1)}
                        >
                            {pageNumber + 1}
                        </button>
                    ))}

                    <button
                        className="pagination-button"
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </section>
        </div>
    );
}

export default BlockAgent;
