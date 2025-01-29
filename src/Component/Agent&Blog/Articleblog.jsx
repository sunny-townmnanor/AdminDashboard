
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
                <img src="/img6.jpg" alt="Nature" style={{ height: '55vh', width: '100%', objectFit: 'cover' }} />
                <div className="text-overlay">
                    <h1>{data.heading}</h1>
                    {/* <a href='#blogscontent'>
                        <button className="ct-button">View Blog</button>
                    </a> */}
                </div>
            </header>
            <div className="Second-feature" id='blogcontent'>
                <p className="Second-feature-p">Topping marzipan tart cheesecake sweet lollipop jelly-o jelly beans. Marshmallow sweet fruitcake<br />
                    apple pie I love oat cake jelly-o. Jelly jelly-o cupcake dessert I love cake chupa chups icing.<br />
                    Powder sesame snaps powder sesame snaps pastry pudding I love.
                </p>

            </div>
            <div className="Second-feature-1">
                <img src="/img3.jpg" alt="Building" className="image-feature-1" />
            </div>
            <div className="Second-feature-2">
                <h1>Topping Marzipan Tart Cheesecake Sweet Lollipop</h1>
            </div>
            <div className='secondfeatureright'>
                <div className='emailbox'>
                    <h1>Subscribe to Newsletter</h1>
                    <input type='email' placeholder='Enter your email' />
                    <br />
                    <button className='btn btn-success'>Submit</button>
                </div>
            </div>
        </div >
    );
}

export default Articleblog;
