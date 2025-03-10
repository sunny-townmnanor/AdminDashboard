import React, { useEffect, useState } from "react";
import "./ArticleCompoent.css";
import { FaShareAlt, FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router-dom";

const ArticleComponent = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [banimg, setBanimg] = useState();
    const [previousBlog, setPreviousBlog] = useState(null);  // State for previous blog
    const [nextBlog, setNextBlog] = useState(null);  
    const {id} = useParams();        // State for next blog
    const [currentBlogId, setCurrentBlogId] = useState(id);  // Current blog ID

    const arr = ['/blogimg1.jpg', '/blogimg2.jpg', 'blogimg3.jpg'];

    const fetchPost = async (blogId) => {
        setLoading(true);
        try {
            const response = await axios.get(`https://www.townmanor.ai/api/blogs/${blogId}`);
            if (response && response.data) {
                return response.data;  // Return the blog data
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching posts:", error);
            setLoading(false);
        }
    };

    const fetchPosts = async () => {
        // Fetch current, previous, and next blog
        const blogId = parseInt(currentBlogId, 10); // Ensure it's an integer

    const current = await fetchPost(blogId);
    const previous = blogId > 1 ? await fetchPost(blogId - 1) : null;  // Prevent negative or zero IDs
    const next = await fetchPost(blogId + 1); 

    setData(current);
    setPreviousBlog(previous);
    setNextBlog(next);

    // Set a random banner image
    const randomImage = arr[Math.floor(Math.random() * arr.length)];
    setBanimg(randomImage);

    setLoading(false);
    };

    useEffect(() => {
        fetchPosts();
    }, [currentBlogId]); // Re-fetch posts when currentBlogId changes

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!data) {
        return <div>No data available</div>;
    }
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }); 
    };
    const formatTextWithBreaks = (text) => {
        if (!text) return text;

        // Split the text into an array of lines
        const lines = text.split("\n");
        
        let formattedText = [];
        
        // Loop through lines, add line breaks after every 4th line
        for (let i = 0; i < lines.length; i++) {
            formattedText.push(lines[i]);
            if ((i + 1) % 4 === 0) {
                formattedText.push("<br/><br/>");  // Add a line break after every 4 lines
            }
        }

        return formattedText.join("\n");
    };
    return (
        <div className="article-container">
            <div className="similarbox">
                {previousBlog && (
                    <div className="articlesimilar">
                        <div style={{ height: '276px' }}>
                            <img src={'https://s3.ap-south-1.amazonaws.com/townamnor.ai/blog-image' + previousBlog.img} alt="Previous Blog" className="proptech-card-image" />
                        </div>
                        <h3>{previousBlog.heading}</h3>
                        <p>{previousBlog.data ? previousBlog.data.substring(0, 150) : "No summary available."}</p>
                        <p className="proptech-meta">{formatDate(previousBlog.date)}</p>
                    </div>
                )}

                {nextBlog && (
                    <div className="articlesimilar">
                        <div style={{ height: '276px' }}>
                            <img src={'https://s3.ap-south-1.amazonaws.com/townamnor.ai/blog-image' + nextBlog.img}alt="Next Blog" className="proptech-card-image" />
                        </div>
                        <h3>{nextBlog.heading}</h3>
                        <p>{nextBlog.data ? nextBlog.data.substring(0, 150) : "No summary available."}</p>
                        <p className="proptech-meta">{formatDate(nextBlog.date)}</p>
                    </div>
                )}
            </div>

            <main className="article-main">
                <article className="article-card">
                    <img className="article-header-image" src={banimg} alt="PropTech Header" />
                    <div className="article-content">
                        <h1 className="article-title">{data.heading}</h1>
                        <p className="article-summary">
                            {data.data ? data.data.substring(0, 150) : "No summary available."}
                        </p>
                        <img className="article-dashboard-image" src={'https://s3.ap-south-1.amazonaws.com/townamnor.ai/blog-image' + data.img} alt="AI Analytics Dashboard" />
                        <ul className="article-key-points">
                        <p dangerouslySetInnerHTML={{ __html: formatTextWithBreaks(data.data) }} />
                        </ul>
                        <div className="article-tags">
                            <span>#PropTech</span>
                            <span>#RealEstate</span>
                            <span>#AI</span>
                            <span>#Innovation</span>
                        </div>
                        <div className="article-share">
                            <span>
                                <FaShareAlt size={20} /> Share
                            </span>
                            <div className="social-icons">
                                <span><FaTwitter size={20} /></span>
                                <span><FaLinkedin size={20} /></span>
                                <span><FaFacebook size={20} /></span>
                            </div>
                        </div>
                    </div>
                </article>

                <footer className="footer-container">
                    <div className="footer-content">
                        <h3 className="footer-title">Subscribe to Our Newsletter</h3>
                        <p className="footer-text">Stay updated with the latest PropTech news and insights.</p>
                        <div className="footer-subscription">
                            <input type="email" placeholder="Your email address" className="footer-input" />
                            <button className="footer-button">Subscribe</button>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default ArticleComponent;
