import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get("https://propy-0mma.onrender.com/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Failed to fetch users");
    }
  };

  const fetchProperties = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get("https://propy-0mma.onrender.com/api/properties", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProperties(Array.isArray(response.data) ? response.data : response.data.properties);
    } catch (error) {
      console.error("Error fetching properties:", error);
      alert("Failed to fetch properties");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUsers();
        await fetchProperties();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteProperty = async (propertyId) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`https://propy-0mma.onrender.com/api/admin/properties/${propertyId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert("Property deleted successfully");
        fetchProperties();
      } catch (error) {
        console.error("Error deleting property:", error);
        alert("Failed to delete property");
      }
    }
  };

  const handleToggleUserBlock = async (userId, isBlocked) => {
    try {
      const token = localStorage.getItem('adminToken');
      const endpoint = isBlocked ? `https://propy-0mma.onrender.com/api/admin/users/${userId}/unblock` : `http://localhost:5000/api/admin/users/${userId}/block`;
      await axios.patch(endpoint, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(`User ${isBlocked ? 'unblocked' : 'blocked'} successfully`);
      fetchUsers();
    } catch (error) {
      console.error(`Error ${isBlocked ? 'unblocking' : 'blocking'} user:`, error);
      alert(`Failed to ${isBlocked ? 'unblock' : 'block'} user`);
    }
  };

  return loading ? <p>Loading...</p> : (
    <div className="container mt-5">
      <h1 className="mb-4">Admin Panel</h1>
      <h2 className="mb-3">Users</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Email</th>
            <th>Blocked</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td>{user.isBlocked ? "Yes" : "No"}</td>
              <td>
                <button
                  className={`btn ${user.isBlocked ? 'btn-success' : 'btn-danger'}`}
                  onClick={() => handleToggleUserBlock(user._id, user.isBlocked)}
                >
                  {user.isBlocked ? 'Unblock' : 'Block'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="mt-5 mb-3">Properties</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(properties) && properties.map(property => (
            <tr key={property._id}>
              <td>{property.title}</td>
              <td>{property.description}</td>
              <td>{property.location}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteProperty(property._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
