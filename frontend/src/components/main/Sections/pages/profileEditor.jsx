import React, { useState } from 'react';
import './profileEditor.css'; // Import your CSS file
import axios from 'axios';

const ProfileEditor = ({ userData, onUpdateUserData }) => {
    // Initialize state variables with existing user data
    const [photo, setPhoto] = useState(userData.photo || null);
    const [username, setUsername] = useState(userData.username || '');
    const [email, setEmail] = useState(userData.email || '');
    const [phone, setPhoneNumber] = useState(userData.phone || '');

    // Function to handle form submission
  // Function to handle form submission
const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare updated user data
    const updatedUserData = {
        photo,
        username,
        email,
        phone
    };

    try {
        // Make a PUT request to update user data
        console.log('Submitting form with updated data:', updatedUserData);
        const response = await axios.put('http://localhost:3000/users/mydetails', updatedUserData); // Update the correct URL
        console.log('User data updated successfully:', response.data);
        
        // Update the user data in the parent component
        onUpdateUserData(response.data);
    } catch (error) {
        console.error('Error updating user data:', error);
        // Handle error scenarios, display error message, etc.
    }
};


return (
    <div className="profile-editor">
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="oneLabel" htmlFor="photo">Photo:</label>
                <input className="oneInput" type="file" id="photo" onChange={(e) => setPhoto(e.target.files[0])} />
            </div>
            <div className="form-group">
                <label className="oneLabel" htmlFor="username">Username:</label>
                <input className="oneInput" type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="form-group">
                <label className="oneLabel" htmlFor="email">Email:</label>
                <input className="oneInput" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
                <label className="oneLabel" htmlFor="phoneNumber">Phone Number:</label>
                <input className="oneInput" type="tel" id="phoneNumber" value={phone} onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>
            <button className="oneButton" type="submit">Save</button>
        </form>
    </div>
);
};

export default ProfileEditor;
