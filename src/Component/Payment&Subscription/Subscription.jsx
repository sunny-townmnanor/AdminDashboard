import React, { useEffect, useState } from 'react';
import AdminAccesor from '../AdminAccesor';
import './Subscription.css';
import dummy from './Subscription.json';
import axios from 'axios';

function Subscription() {
    const [showHistory, setShowHistory] = useState(null);

    const handleShowHistory = (id) => {
        setShowHistory(showHistory === id ? null : id); // Toggle history visibility
    };
    const [data,setdata]=useState()
    useEffect(()=>{
     const getdata = async () =>{
         try{
             const response = await axios.get('https://www.townmanor.ai/api/userpackage');
             console.log(response)
             setdata(response.data);

         }
         catch(error){
             console.log(error)
         }
     }
     getdata();
    },[])
    console.log(data)
    return (
        <div className='main-hd' style={{ display: 'flex', flexDirection: 'row' }}>
            <div><AdminAccesor /></div>
            <div className='head-subscription'>
                <div>
                    <div className="custom-heading">Payment Plan</div>
                </div>
                <div className="table-container">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">UserName</th>
                                <th scope="col">PackageType</th>
                                <th scope="col">Price</th>
                                <th scope="col">Propety Id upload by user</th>
                                <th scope="col">Old Package History</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.map((item) => {
                                // Parse subscription history to an array
                                const subscriptionHistory = JSON.parse(item.subscription_history);

                                return (
                                    <React.Fragment key={item.id}>
                                        <tr>
                                            <td>{item.id}</td>
                                            <td>{item.username}</td>
                                            <td>{item.package_json && JSON.parse(item.package_json)[0]?.name}</td>
                                            <td>{item.package_json && JSON.parse(item.package_json)[0]?.price}</td>
                                            <td>{JSON.parse(item.propertylisting)+" "+ ","}</td>
                                            <td>
                                                <div onClick={() => handleShowHistory(item.id)} className="custom-button">
                                                    {showHistory === item.id ? 'Hide History' : 'Show History'}
                                                </div>
                                            </td>
                                        </tr>

                                        {/* Render History Table below if Show History is clicked */}
                                        {showHistory === item.id && subscriptionHistory.length > 0 && (
                                            <tr>
                                                <td colSpan="5">
                                                    <table className="table">
                                                        <thead className="thead-dark">
                                                            <tr>
                                                                <th>Date</th>
                                                                <th>GST</th>
                                                                <th>TotalAmount</th>
                                                                <th>InvoiceNo</th>
                                                                <th>Package Valid</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {subscriptionHistory.map((history, index) => (
                                                                <tr key={index}>
                                                                    <td>{history.date}</td>
                                                                    <td>{history.gst}</td>
                                                                    <td>{history.totalAmount}</td>
                                                                    <td>{history.invoiceNo}</td>
                                                                    <td>{history.packageValid}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Subscription;
