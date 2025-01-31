import React, { useState, useEffect } from 'react';
import './Articleblog.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Articleblog() {
    const { index } = useParams(); // Get the current article index from the URL
    const [data, setData] = useState(null);
    const [nextThreeBlogs, setNextThreeBlogs] = useState([]);
    const [loading, setLoading] = useState(true); // Track loading state
    const navigate = useNavigate();

    // Fetch the article data based on the index and next three similar blogs
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the current article
                const response = await axios.get(`https://www.townmanor.ai/api/blogs/${index}`);
                setData(response.data); // Assuming the response contains the article data

                // Fetch the next three blogs based on the article id
                const nextResponse = await axios.get('https://www.townmanor.ai/api/blogs');
                const nextThree = nextResponse.data.filter(
                    (item) => item.id > parseInt(index) && item.id <= parseInt(index) + 3
                );
                setNextThreeBlogs(nextThree);
            } catch (error) {
                console.error('Error fetching article data:', error);
            } finally {
                setLoading(false); // Set loading to false when data is fetched
            }
        };

        fetchData();
    }, [index]); // Re-run when index changes

    // If data is still loading, show a loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    const upperdata = data.data.slice(0, 150) + '.......';

    return (
        <div className="Appx">
            {/* Header Section */}
            <header className="App-headerx">
                <div className="text-overlay">
                    <h1>{data.heading}</h1>
                </div>
            </header>

            <div className="Second-feature" id="blogcontent">
                <div className="blogleft">
                    <p id="blogupperdata">{upperdata}</p>
                    <img src={'https://s3.ap-south-1.amazonaws.com/townamnor.ai/blog-image'+data.img} id="blogcontentimg" alt={data.heading} />
                    <h3 className="blogcontentheading">{data.heading}</h3>
                    <p className="blogcontent">{data.data}</p>
                </div>

                <div>
                    <div className="card-container">
                        <div className="card-1">
                            <h2>Subscribe to our Blogs</h2>
                            <p>Get the latest blogs</p>
                        </div>

                        <form id="card-form" novalidate>
                            <label htmlFor="email" className="email-label">Work Email Address</label>
                            <input
                                type="email"
                                id="email"
                                className="email-input"
                                placeholder="Enter your email address"
                                required
                            />
                            <div id="email-error" className="error-message"></div>

                            <div className="checkbox-group">
                                <label>
                                    <input type="checkbox" name="terms" value="agree-terms" required />
                                    <span>I Agree to the <a href="#" id="terms-link">Terms and Conditions</a>.</span>
                                </label>
                            </div>
                            <div id="terms-error" className="error-message"></div>

                            <div className="checkbox-group">
                                <label>
                                    <input type="checkbox" name="newsletter" value="subscribe-newsletter" />
                                    <span>Subscribe to our newsletter.</span>
                                </label>
                            </div>

                            <button type="submit" className="submit-button">Subscribe</button>
                        </form>
                    </div>
                </div>
            </div>

            <h1 id="similarbloghead">Similar Blogs</h1>
            <div className="similarblog">
                {nextThreeBlogs.length > 0 ? (
                    nextThreeBlogs.map((item) => (
                        <div key={item.id} className="similar-blog-item">
                            <h2>{item.heading}</h2>
                            <img src={'https://s3.ap-south-1.amazonaws.com/townamnor.ai/blog-image'+item.img} alt={item.heading} />
                            <p>{item.data.slice(0, 100)}...</p>
                            <button onClick={() => navigate(`/article/${item.id}`)}>Read More</button>
                        </div>
                    ))
                ) : (
                    <p>No similar blogs available</p>
                )}
            </div>
        </div>
    );
}

export default Articleblog;
