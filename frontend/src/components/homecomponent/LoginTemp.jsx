import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


// In order to use and set cookies for authentication we have to use this
axios.defaults.withCredentials = true;

const LoginTemp = () => {
    const [inputData, setInputData] = useState({
        email : "",
        password : ""
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setInputData((prev) => {
            const newObject = {...prev,[e.target.name] : e.target.value};
            return newObject;
        });
    };
    
    
    const handleSubmit = async () => {
        console.log(inputData);
        const response = await axios.post('http://localhost:3000/users/login', inputData);
        console.log(response.data);
        // const response2 = await axios.get('http://localhost:3000/users/mydetails');
        // console.log(response2);
        navigate('/loggedIn');
    };

  return (
    <>
        <input type="text" name="email" placeholder="Email" onChange={handleInputChange}></input>
        <input type="text" name="password" placeholder="password" onChange={handleInputChange}></input>
        <button onClick={handleSubmit}>Submit</button>
    </>
  );  
};

export default LoginTemp;