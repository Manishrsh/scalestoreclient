import axios from 'axios';
import React, { useEffect, useState } from 'react';

const InquiryAll = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/sendinquiry/get');
                console.log(res.data);
                setData(res.data);  // Correctly set the data
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        getData();
    }, []);

    return (
        <div>
            <h2>Inquiries</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Mobile Number</th>
                        <th>Quantity</th>
                        <th>Product Name</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? data.map((item, index) => (
                        <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.email}</td>
                            <td>{item.mobileNumber}</td>
                            <td>{item.quantity}</td>
                            <td>{item.productName || 'N/A'}</td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="7" className="text-center">No data found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default InquiryAll;
