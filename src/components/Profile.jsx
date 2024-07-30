// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
  const [user, setUser] = useState({ email: '' });

  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to fetch profile.');
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      await axios.put('/api/users/profile', user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast.success('Profile updated successfully.');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile.');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h2>Profile</h2>
      <form onSubmit={updateProfile}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Profile</button>
      </form>
    </div>
  );
}

export default Profile;
