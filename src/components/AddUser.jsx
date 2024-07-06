import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        userName: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/users', {
                fullName: formData.fullName,
                userName: formData.userName,
                password: formData.password
            });
            console.log('Server response:', response.data);
            alert('User added successfully!');
            navigate('/users');
        } catch (error) {
            console.error('Error adding user:', error);
            alert('Failed to add user. Please check console for error details.');
        }
    };

    return (
        <div>
            <h3>Add User</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Full Name:
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Username:
                    <input
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />
                <div>
                    <button type="submit" style={{ marginRight: '10px' }}>Save</button>
                    <button type="button" onClick={() => navigate('/users')}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AddUser;
