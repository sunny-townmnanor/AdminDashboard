// // src/AgentLogin.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function AgentLogin() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         // Simulate user authentication with mock data
//         const storedUser = JSON.parse(localStorage.getItem('user'));

//         if (storedUser && storedUser.username === username && storedUser.password === password) {
//             navigate('/dashboard');
//         } else {
//             setError('Invalid credentials. Please try again.');
//         }
//     };

//     return (
//         <div className="login-container">
//             <h2>Login</h2>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     placeholder="Username"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 {error && <div className="error">{error}</div>}
//                 <button type="submit">Login</button>
//                 <div>
//                     Don't have an account? <a href="/register">Register</a>
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default AgentLogin;



