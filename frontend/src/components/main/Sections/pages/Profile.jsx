import React, { useState, useEffect } from 'react';
import ProfileEditor from './profileEditor.jsx';
import axios from 'axios'; // Import Axios for making HTTP requests

const Profile = () => {
    // Initialize state variables to store user data
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Function to fetch user data from the backend API
        const fetchUserData = async () => {
            try {
                // Make a GET request to fetch user data
                const response = await axios.get('http://localhost:3000/users/mydetails'); // Fetch from the correct URL
                // Extract only the required attributes from the fetched user data
                const { username, phone, email } = response.data;
                console.log(response.data.phone);
                // Set the extracted user data to the state
                setUserData({ username, phone, email });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setLoading(false);
            }
        };

        // Call the fetchUserData function when the component mounts
        fetchUserData();
    }, []);

     // Function to update user data
     const updateUser = (updatedUserData) => {
        // Update the user data in the state
        setUserData(updatedUserData);
        console.log(updatedUserData);
    };

    // Render loading message while fetching data
    if (loading) {
        return <div>Loading...</div>;
    }

    // If user data is not available, display an error message
    if (!userData) {
        return <div>Error: Unable to fetch user data</div>;
    }

    return (
        <div>
            {/* Pass the fetched user data to ProfileEditor component */}
            <ProfileEditor userData={userData} onUpdateUserData={updateUser} />
        </div>
    );
};

export default Profile;
