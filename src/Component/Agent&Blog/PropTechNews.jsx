import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PropTech.css";
import { useNavigate } from "react-router-dom";

const PropTechNews = () => {
  const [posts, setPosts] = useState([]); // Initialize posts as an empty array
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);  // You can adjust how many posts you want per page
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // API call to fetch all posts
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://www.townmanor.ai/api/blogs"); 
      //cono// assuming it fetches all posts
      
      if (response && response.data ) {
        setPosts(response.data); // Ensure that the posts are an array
      } else {
        console.error("Invalid response structure or no posts data.");
        setPosts([]); // In case the response structure is not valid
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(); // Fetch posts when the component mounts
  }, []);

  // Get the current posts to display on the page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate the total number of pages
  const totalPages = Math.ceil(posts.length / postsPerPage);
 const gotoblog = (id)=>{
  navigate(`/singleblog/${id}`)
 }
  return (
    <div className="proptech-container">
      <div>
        {/* Main Featured Post */}
        <div className="proptech-main-post">
          <img src="/property4.jpg" alt="Future of PropTech" className="proptech-image" />
          <div className="proptech-main-content">
            <h1 className="proptech-title">The Future of PropTech: AI-Driven Real Estate Solutions</h1>
            <p className="proptech-description">
              Discover how artificial intelligence is revolutionizing the real estate industry through innovative property management solutions and smart building technologies.
            </p>
            <p className="proptech-meta">5 min read • Mar 15, 2024</p>
          </div>
        </div>

        {/* Featured Articles */}
        <div className="proptech-articles">
          {loading ? (
            <p>Loading...</p>
          ) : (
            currentPosts.map((post) => (
              <div className="proptech-card" key={post.id} >
                <div style={{
                  height:'276px'
                }}
                onClick={()=>{gotoblog(post.id)}}
                >
                <img src={'https://s3.ap-south-1.amazonaws.com/townamnor.ai/blog-image'+post.img} alt={post.heading} className="proptech-card-image" />
                 </div>
                <h3>{post.heading}</h3>
                <p>{post.data.substring(0, 150)}...</p> {/* Displaying only a preview of the data */}
                <p className="proptech-meta">
                  {new Date(post.date).toLocaleDateString()} • 5 min read
                </p>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="proptech-pagination">
          {totalPages > 1 &&
            Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`proptech-page-btn ${currentPage === index + 1 ? "active" : ""}`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            ))}
        </div>
      </div>

      {/* Sidebar */}
      <div className="proptech-sidebar">
        {/* Popular Posts */}
        <div className="proptech-popular-posts">
          <h3>Popular Posts</h3>
          <ul>
            <li>PropTech Market Analysis 2024 - 4.2k views</li>
            <li>AI in Property Valuation - 3.8k views</li>
            <li>VR Property Tours - 3.1k views</li>
          </ul>
        </div>

        {/* Popular Tags */}
        <div className="proptech-tags">
          <h3>Popular Tags</h3>
          <div className="proptech-tag-list">
            <span>#PropTech</span>
            <span>#RealEstate</span>
            <span>#SmartHomes</span>
            <span>#AI</span>
            <span>#Innovation</span>
            <span>#Technology</span>
          </div>
        </div>

        {/* Newsletter */}
        <div className="proptech-newsletter">
          <h3>Newsletter</h3>
          <p>Stay updated with the latest PropTech news and insights.</p>
          <input type="email" placeholder="Your email address" />
          <button>Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default PropTechNews;
