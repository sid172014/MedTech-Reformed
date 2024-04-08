import { useEffect, useState } from "react";
import axios from 'axios';
import './lab.css'

const Lab = () => {

    const [data, setData] = useState([]);


    useEffect(() => {
        const getData = async () => {
            const response = await axios.get('http://localhost:3000/users/mydetails');
            setData(() => {
                return response.data.medInfo;
            });
        };
        getData();
    }, []);

    return (
        
        <div className="table-container">
            {data.length === 0 ? null : (
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th className="custom-header">Serial Number</th>
                            <th className="custom-header">Lab Test</th>
                            <th className="custom-header">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td> {/* Serial Number */}
                                <td>
                                    <ul>
                                        {item.tests.map((element, index) => (
                                            <li key={index}>{element}</li>
                                        ))}
                                    </ul>
                                </td>
                                <td>{new Date(item.date).toLocaleDateString()}</td> {/* Date */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>


    );
};

export default Lab;