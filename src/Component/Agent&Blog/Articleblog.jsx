
import React, { useState, useEffect } from 'react';
import './Articleblog.css';
import { useParams, useNavigate } from 'react-router-dom';
import dummy from './Article.json';

function Articleblog() {
    const { index } = useParams(); // Get the current article index from the URL
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    // Find the current article and set the state when index changes
    useEffect(() => {
        const selectedArticle = dummy.find(item => item.id === parseInt(index));  // Find the article by ID
        setData(selectedArticle);
    }, [index]);  // Re-run when index changes

    // If data is still loading, show a loading state
    if (!data) {
        return <div>Loading...</div>;
    }

    // Handle Previous and Next navigation
    const handlePrevious = () => {
        const currentIndex = dummy.findIndex(item => item.id === parseInt(index));
        if (currentIndex > 0) {
            const previousArticleId = dummy[currentIndex - 1].id;
            navigate(`/blockArtica/${previousArticleId}`);
        }
    };

    const handleNext = () => {
        const currentIndex = dummy.findIndex(item => item.id === parseInt(index));
        if (currentIndex < dummy.length - 1) {
            const nextArticleId = dummy[currentIndex + 1].id;
            navigate(`/blockArtica/${nextArticleId}`);
        }
    };

    return (
        <div className="App">
            {/* Header Section */}
            <header className="App-header">
                <img src={data.img} alt="Nature" style={{ height: '100vh', width: '100%', objectFit: 'cover' }} />
                <div className="text-overlay">
                    <h1>{data.heading}</h1>
                    <a href='#blogscontent'>
                        <button className="ct-button">View Blog</button>
                    </a>
                </div>
            </header>

            <div className="Second-feature" id='blogcontent'>
                <div className='secondfeatureleft'>
                    <span className="blog-heading">{data.heading}</span>
                    <p className="sc-div">{data.data}</p>
                    <div className="navigation-buttons">
                        {/* Previous Button */}
                        <a
                            onClick={handlePrevious}
                            style={{
                                color: 'blueviolet',
                                font: '18px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                textDecoration: 'none'
                            }}
                        >
                            &larr; Previous
                        </a>

                        {/* Next Button */}
                        <a
                            onClick={handleNext}
                            style={{
                                color: 'blueviolet',
                                font: '18px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                textDecoration: 'none'
                            }}
                        >
                            Next &rarr;
                        </a>
                    </div>
                </div>

                <div className='secondfeatureright'>
                    <div className='emailbox'>
                        <h1>Subscribe to Newsletter</h1>
                        <input type='email' placeholder='Enter your email' />
                        <br />
                        <button className='btn btn-success'>Submit</button>
                    </div>
                </div>
            </div>

            <div className="cards-container">
                <div className="card">
                    <img src="/Building2.jpg" alt="Card Image" className="card-img" />
                    <h3 className="card-title">Card 1</h3>
                    <p className="card-content">This is the content for card 1.<br />
                        You can put any information you like here.</p>
                </div>
                <div className="card">
                    <img src="/Building2.jpg" alt="Card Image" className="card-img" />
                    <h3 className="card-title">Card 2</h3>
                    <p className="card-content">This is the content for card 2.<br />
                        You can put any information you like here.</p>
                </div>
                <div className="card">
                    <img src="/Building2.jpg" alt="Card Image" className="card-img" />
                    <h3 className="card-title">Card 3</h3>
                    <p className="card-content">This is the content for card 3.<br />
                        You can put any information you like here.</p>
                </div>
            </div>
        </div>
    );
}

export default Articleblog;
