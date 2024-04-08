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
            {data.length === 0 ? null : data.map((item) => {
                return <div key={item._id}>
                        <div>{item._id}</div>
                        <div>{item.medicalHistory?.map((element) => {return element})}</div>
                        <div>{item.medicines.map((element) => {return element})}</div>
                    </div>
            })}
        </div>
    );
};

export default MedHistory;