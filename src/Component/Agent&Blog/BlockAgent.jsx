
// import React, { useState } from 'react';
// import './BlockAgent.css';
// import { useNavigate } from 'react-router-dom';
// import dummy from './Article.json';

// function BlockAgent() {
//     const navigate = useNavigate();
//     const [data, setData] = useState(dummy);
//     const [currentPage, setCurrentPage] = useState(1); // Track the current page
//     const itemsPerPage = 9; // Number of items to show per page

//     // Pagination logic
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

//     // Handle page change
//     const paginate = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     };

//     // Navigate to the article page
//     const secondpage = (index) => {
//         navigate(`/blockArtica/${index}`);
//     };

//     // Calculate total pages
//     const totalPages = Math.ceil(data.length / itemsPerPage);

//     return (
//         <div className="App">
//             {/* Header Section */}
//             <header className="App-header">
//                 <img src="/blogmain.jpg" alt="Nature" style={{ height: '100vh', width: '100%', objectFit: 'cover' }} />
//                 <div className="text-overlay">
//                     <h1>Welcome to Our Website</h1>
//                     <p>Your journey to success starts here</p>
//                     <a href='#blogscard'><button className="cta-button viewblog">View Blog</button></a>
//                 </div>
//             </header>

//             {/* Features Section */}
//             <section className="features-section" id="blogscard">
//                 <h2>Features</h2>
//                 <div className="features">
//                     {currentData.map((item) => (
//                         <div className="feature-card" onClick={() => secondpage(item.id)} key={item.id}>
//                             <img className="card-img-top" src={item.img} alt="Card image cap" />
//                             <h1 className="hd-top">{item.heading}</h1>
//                             <p className="para1">
//                                 {item.data}
//                             </p>
//                             <a href="" className="read-more-link">
//                                 <span className="arrow-symbol">&#10230;</span>
//                                 Read More
//                             </a>
//                             <p className="create-date">{item.date}</p>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Pagination */}
//                 <div className="pagination">
//                     <button
//                         className="pagination-button"
//                         onClick={() => paginate(currentPage - 1)}
//                         disabled={currentPage === 1}
//                     >
//                         Previous
//                     </button>

//                     {/* Numbered Pages */}
//                     {[...Array(totalPages).keys()].map((pageNumber) => (
//                         <button
//                             key={pageNumber + 1}
//                             className={`pagination-number ${currentPage === pageNumber + 1 ? 'active' : ''}`}
//                             onClick={() => paginate(pageNumber + 1)}
//                         >
//                             {pageNumber + 1}
//                         </button>
//                     ))}

//                     <button
//                         className="pagination-button"
//                         onClick={() => paginate(currentPage + 1)}
//                         disabled={currentPage === totalPages}
//                     >
//                         Next
//                     </button>
//                 </div>
//             </section>
//         </div>
//     );
// }

// export default BlockAgent;


import React, { useState } from 'react';
import './BlockAgent.css';
import { useNavigate } from 'react-router-dom';
import dummy from './Article.json';

function BlockAgent() {
    const navigate = useNavigate();
    const [data, setData] = useState(dummy);
    const [currentPage, setCurrentPage] = useState(1);
    const [zoomed, setZoomed] = useState(false);  // State to handle zoom

    const itemsPerPage = 9;

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

    // Handle page change
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Navigate to the article page
    const secondpage = (index) => {
        navigate(`/blockArtica/${index}`);
    };

    // Calculate total pages
    const totalPages = Math.ceil(data.length / itemsPerPage);

    // Toggle zoom effect
    const toggleZoom = () => {
        setZoomed(!zoomed);
    };

    return (
        <div className="App">
            {/* Header Section */}
            <header className="App-header">
                <img
                    src="/blogmain.jpg"
                    alt="Nature"
                    style={{
                        height: '100vh',
                        width: '100%',
                        objectFit: 'cover',
                    }}
                />
                <div className="text-overlay">
                    <h1>Welcome to Our Website</h1>
                    <p>Your journey to success starts here</p>
                    <a href="#blogscard">
                        <button className="cta-button viewblog">View Blog</button>
                    </a>
                </div>
            </header>

            {/* Features Section */}
            <section className="features-section" id="blogscard">
                <h2>Features</h2>
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
                                    src={item.img}
                                    alt="Card image cap"
                                />
                            </div>
                            <h1 className="hd-top">{item.heading}</h1>
                            <p className="para1">{item.data}</p>
                            <a href="" className="read-more-link">
                                <span className="arrow-symbol">&#10230;</span>
                                Read More
                            </a>
                            <p className="create-date">{item.date}</p>
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
                            className={`pagination-number ${
                                currentPage === pageNumber + 1 ? 'active' : ''
                            }`}
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

