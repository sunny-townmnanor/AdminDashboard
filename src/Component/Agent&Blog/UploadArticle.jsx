import React, { useState } from 'react';
import axios from 'axios';

function UploadArticle() {
    const [heading, setHeading] = useState('');
    const [data, setData] = useState('');
    const [img, setImg] = useState('');
    const [message, setMessage] = useState('');
    const [isImageUploaded, setIsImageUploaded] = useState(false);

    const uploadImage = async (e) => {
        const formData = new FormData();
        formData.append('files', e.target.files[0]); // Fixed from e.target.file[0]
        formData.append('uploadFolder', 'blog-image'); // Folder name

        try {
            const response = await axios.post(
                'https://www.townmanor.ai/api/image/aws-upload',
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            // Log the entire response to check the structure
            console.log('Response Data:', response.data);

            // Check if the URL exists in the response and update logic accordingly
            if (response.status === 200 && response.data && response.data.fileUrls && response.data.fileUrls[0]) {
                const fullImageUrl = response.data.fileUrls[0]; // Get the URL from the first element in the fileUrls array
                const imageUrl = fullImageUrl.replace('https://s3.ap-south-1.amazonaws.com/townamnor.ai/blog-image', '');
                setImg(imageUrl); // Update img state
                setIsImageUploaded(true); // Enable submit button
                setMessage('Image uploaded successfully!');
                return true;
            } else {
                setMessage('Image upload failed. Response format is not as expected.');
                return false;
            }
        } catch (error) {
            setMessage('Error uploading image. Please try again.');
            console.error('Image upload error:', error);
            setIsImageUploaded(false);
            return false;
        }
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if needed
        const day = date.getDate().toString().padStart(2, '0'); // Add leading zero if needed
        return `${year}-${month}-${day}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newArticleData = {
            heading: heading,
            data: data,
            img: img,
            date: formatDate(new Date())
        }; // img is a file, so you append it directly
        console.log(newArticleData);

        try {
            const response = await axios.post('https://www.townmanor.ai/api/articles', newArticleData, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.status === 201) {
                setMessage('Article uploaded successfully!');
                setTimeout(() => {
                    setMessage(''); // Clear message after 5 seconds
                }, 5000);

                // Reset the form
                setHeading('');
                setData('');
                setImg('');
            }
        } catch (error) {
            setMessage('Error uploading article. Please try again.');
            console.error('Error uploading article:', error);
        }
    };

    return (
        <div className="upload-article-form" style={{ width: '80%', margin: '2vh auto', padding: '16px' }}>
            <h2>Upload New Article</h2>

            {message && <div className="message">{message}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="heading">Heading</label>
                    <input
                        type="text"
                        id="heading"
                        value={heading}
                        onChange={(e) => setHeading(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="data">Content</label>
                    <textarea
                        id="data"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="img">Image</label>
                    <input
                        type="file"
                        id="img"
                        onChange={uploadImage}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-success" disabled={!isImageUploaded}>
                    Upload Article
                </button>
            </form>
        </div>
    );
}

export default UploadArticle;
