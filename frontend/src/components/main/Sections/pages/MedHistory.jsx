import { useEffect, useState } from "react";
import axios from 'axios';
import './medhistory.css';

const MedHistory = () =>{
    
    const [data,setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get('http://localhost:3000/users/mydetails');  
            setData(() => {
                return response.data.medInfo;
            });
        };
        getData();
    }, []);

    return(
        <div>
        {data.length === 0 ? null : (
            <table id="medicalTable">
                <thead id="medicalThead">
                    <tr id="medicalTR">
                        <th id="medicalTH">ID</th>
                        <th id="medicalTH">Medical History</th>
                        <th id="medicalTH">Medicines</th>
                    </tr>
                </thead>
                <tbody id="medicalBody">
                    {data.map((item) => (
                        <tr id="medicalTR" key={item._id}>
                            <td id="medicalTD">{item._id}</td>
                            <td id="medicalTD">
                                <ul>
                                    {item.medicalHistory?.map((element, index) => (
                                        <li key={index}>{element}</li>
                                    ))}
                                </ul>
                            </td>
                            <td id="medicalTD">
                                <ul>
                                    {item.medicines.map((element, index) => (
                                        <li key={index}>{element}</li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>
    
    );
};

export default MedHistory;