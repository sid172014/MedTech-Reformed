import { useEffect, useState } from "react";
import axios from 'axios';

import './lab.css'

const Lab = () => {
    
    const [data,setData] = useState([]);


    useEffect(() => {
        const getData = async () => {
            const response = await axios.get('http://localhost:3000/users/mydetails');  

            setData(() => {
                return response.data.medInfo;
            });
        };
        getData();
    },[]);

    return(
        <div>
            {data.length ===0 ? null : data.map((item) => {
                return <div key={item._id}>
                    <div>{item.tests.map((element) => {return element})}</div>
                    <div>{new Date(item.date).toLocaleDateString()}</div>
                </div>    
            })
            }
        </div>
    );
};

export default Lab;