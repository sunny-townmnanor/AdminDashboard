import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminAccesor from '../AdminAccesor';
import { useParams, useNavigate } from 'react-router-dom';

function PaymentPlan() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://www.townmanor.ai/api/api/commercial/commercial-units/com_prop_id/${id}`);
                if (Array.isArray(response.data)) {
                    setData(response.data);
                } else {
                    console.error("Response is not an array:", response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        if (data) {
            console.log(data);
        }
    }, [data]);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div>
                <AdminAccesor />
            </div>
            <div style={{ width: '-webkit-fill-available' }}>
                <div style={{ textAlign: 'center', margin: '20px 0px' }}>
                    <h1>Commercial Payment Plan</h1>
                </div>
                <div>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th scope="col">id</th>
                                <th scope="col">images</th>
                                <th scope="col">com_prop_id</th>
                                <th scope="col">category</th>
                                <th scope="col">name</th>
                                <th scope="col">price</th>
                                <th scope="col">status</th>
                                <th scope="col">Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                data.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{<img
                                            src={'https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images' +item.floorplan}
                                            style={{width: '10vw',height: '11vh',borderRadius: '7px'}}alt={item.name}
                                        />}</td>
                                        <td>{item.com_prop_id}</td>
                                        <td>{item.category}</td>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.status}</td>
                                        <td>
                                            <button className='btn btn-primary' onClick={() => navigate(`/paymentplanEdit/${item.com_prop_id}/${item.id}`)}>
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center' }}>No data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default PaymentPlan;
