import axios from 'axios';
import { useEffect, useState } from 'react';

// In order to use and set cookies for authentication we have to use this
axios.defaults.withCredentials = true;

const UserDetailsTemp = () => {
    
    const [userDetails,setuserDetails] = useState({});

    useEffect(() => {
        const getData = () => {
            setTimeout(async () => {
                const response2 = await axios.get('http://localhost:3000/users/mydetails');
                console.log(response2.data);
                setuserDetails(response2.data);
            },5000);
        }
        getData();
    },[]);


    return (
        <div>
            {Object.keys(userDetails).length === 0 ? "Loading" : userDetails.username}
        </div>
    );
};

export default UserDetailsTemp;