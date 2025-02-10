import React, { useState } from 'react';
import AdminAccesor from '../AdminAccesor';
import './Subscription.css';
import dummy from './Subscription.json';

function Subscription() {
    const [showHistory, setShowHistory] = useState(null);

    const handleShowHistory = (id) => {
        setShowHistory(showHistory === id ? null : id); // Toggle history visibility
    };

    return (
        <div className='main-hd' style={{ display: 'flex', flexDirection: 'row' }}>
            <div><AdminAccesor /></div>
            <div className='head-subscription'>
                <div>
                    <h1>Payment Plan</h1>
                </div>
                <div className="table-container">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">id</th>
                                <th scope="col">UserName</th>
                                <th scope="col">PackageType</th>
                                <th scope="col">Price</th>
                                <th scope="col">Old Package History</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dummy.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.UserName}</td>
                                    <td>{item.PackageType}</td>
                                    <td>{item.Price}</td>
                                    <td>
                                        <button onClick={() => handleShowHistory(item.id)}>
                                            {showHistory === item.id ? 'Hide History' : 'Show History'}
                                        </button>
                                        {showHistory === item.id && item.OldPackageHistory.length > 0 && (
                                            <ul>
                                                {item.OldPackageHistory.map((history, index) => (
                                                    <li key={index}>
                                                        {history.PackageName} - {history.Price} ({history.Duration})
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Subscription;
