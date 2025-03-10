// import React, { useState } from 'react';
// import dummyFeedback from './Customer.json'; // Assuming you have a Feedback.json file for initial data
// import AdminAccesor from '../AdminAccesor';
// function Customer() {
//   const [feedbackData, setFeedbackData] = useState(dummyFeedback); // Initial feedback data
//   const [status,setstatus] = useState(dummyFeedback.status)
//   // Function to handle deleting a feedback entry
//   const handelStatus = (id) => {
//     setstatus(!status);
//   };

//   return (
//     <div  className='ur-user'>
//       <div>
//           <AdminAccesor />
//         </div>
//     <div className="customer-feedback">
//       <h1>Customer Feedback</h1>

//       <table className="table">
//         <thead>
//           <tr>
//             <th scope="col">Property Id</th>
//             <th scope="col">User Name</th>
//             <th scope="col">Contact</th>
//             <th scope="col">Rating</th>
//             <th scope="col">Status</th>
//             <th scope="col">Created At</th>
//             <th scope="col">Updated At</th>
//             <th scope="col">Change Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {feedbackData.map((feedback) => (
//             <tr key={feedback.id}>
//               <td>{feedback.propertyid}</td>
//               <td>{feedback.username}</td>
//               <td>{feedback.contact}</td>
//               <td>{feedback.rating}</td>
//               <td>{feedback.status}</td>
//               <td>{feedback.createdAt}</td>
//               <td>{feedback.updatedAt}</td>
//               <td>
//                 <button className="btn btn-danger"
//                   onClick={() => handelStatus(feedback.id)} // Delete feedback by ID
//                 >
//                   Status
//                 </button>
//               </td>
//             </tr>
//            ))}
//         </tbody>
//       </table>
//     </div>
//      </div>
//    );
// }

//  export default Customer;
import React, { useState } from 'react';
import dummyFeedback from './Customer.json'; // Assuming you have a Feedback.json file for initial data
import AdminAccesor from '../AdminAccesor';

function Customer() {
  const [feedbackData, setFeedbackData] = useState(dummyFeedback);
  const [status, setStatus] = useState(dummyFeedback.status);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // Adjust this number based on your preference

  // Function to handle deleting a feedback entry
  const handleStatus = (id) => {
    setStatus(!status);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = feedbackData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Go to previous page
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Go to next page
  const nextPage = () => {
    if (currentPage < Math.ceil(feedbackData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className='ur-user'>
      <div>
        <AdminAccesor />
      </div>
      <div className="customer-feedback" style={{
        width:'100%',
        padding:'20px'
      }}>
        <h1 style={{
          textAlign:'center'
        }}> Customer Feedback</h1>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">Property Id</th>
              <th scope="col">User Name</th>
              <th scope="col">Contact</th>
              <th scope="col">Rating</th>
              <th scope="col">Status</th>
              <th scope="col">Created At</th>
              <th scope="col">Updated At</th>
              <th scope="col">Change Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((feedback) => (
              <tr key={feedback.id}>
                <td>{feedback.propertyid}</td>
                <td>{feedback.username}</td>
                <td>{feedback.contact}</td>
                <td>{feedback.rating}</td>
                <td>{feedback.status}</td>
                <td>{feedback.createdAt}</td>
                <td>{feedback.updatedAt}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleStatus(feedback.id)} // Change feedback status by ID
                  >
                    Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="pagination">
          <button
            onClick={prevPage}
            className="page-link"
            disabled={currentPage === 1} // Disable when on the first page
          >
            Previous
          </button>
          
          {Array.from({ length: Math.ceil(feedbackData.length / itemsPerPage) }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`page-link ${currentPage === index + 1 ? 'active' : ''}`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={nextPage}
            className="page-link"
            disabled={currentPage === Math.ceil(feedbackData.length / itemsPerPage)} // Disable when on the last page
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Customer;
           





