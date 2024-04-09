import axios from 'axios';
import { useEffect } from 'react';
import {toast} from 'react-toastify';

const Doctors =() => {

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get('http://localhost:3000/users/mydetails');
            console.log(response.data);
        };
        getData();
    }, []);

    return (
        <div>
            Hello world from doctors
        </div>
    );
};

export default Doctors;