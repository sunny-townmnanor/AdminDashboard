import React, { useState } from 'react';
import './AgentLogin.css';  // Add styles for the modal

function AgentLogin({ showLoginModal, setShowLoginModal }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Handle login form submission
  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password || !termsAccepted) {
      alert('Please fill in all fields and accept the terms and conditions');
    } else {
      alert('Logged in successfully');
      setShowLoginModal(false);  // Close the modal after login
    }
  };

  // Handle checkbox change (terms acceptance)
  const handleTermsChange = () => {
    setTermsAccepted(!termsAccepted);
  };

  return (
    <>
      (
        <div className="modal fade show agentlogin" aria-labelledby="loginModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="loginModalLabel">Login</h5>
                <button type="button" className="btn-close" onClick={() => setShowLoginModal(false)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label htmlFor="username"  className="form-label">Username</label>
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={termsAccepted}
                      onChange={handleTermsChange}
                    />
                    <label className="form-check-label" htmlFor="terms">
                      I accept the terms and conditions
                    </label>
                  </div>
                  <button type="submit" className="btn btn-primary w-50">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )
    </>
  );
}

export default AgentLogin;
