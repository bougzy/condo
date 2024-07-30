import React, { useState, useEffect } from "react";
import axios from "axios";
import PropertyCard from "./PropertyCard";
import RealEstateCard from "./RealEstateCard";

function Home() {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch properties from the backend
  const fetchProperties = async (page = 1, search = "") => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/properties?page=${page}&limit=5&search=${search}`
      );

      console.log(response.data); // Debugging: Check response structure

      const { properties, totalPages } = response.data;

      setProperties(properties);
      setTotalPages(totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setError("Failed to load properties. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch properties when component mounts or dependencies change
  useEffect(() => {
    fetchProperties(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  // Handle search form submission
  const handleSearch = (event) => {
    event.preventDefault();
    setCurrentPage(1);
    fetchProperties(1, searchQuery);
  };

  // Handle property deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://propy-0mma.onrender.com/api/properties/${id}`);
      fetchProperties(currentPage, searchQuery);
    } catch (error) {
      console.error("Error deleting property:", error);
      setError("Failed to delete property. Please try again.");
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <h2 className="mb-4">Property Listings</h2>
      <form onSubmit={handleSearch} className="mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search properties by location or name"
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </div>
        </div>
      </form>

      {loading && <div>Loading properties...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="property-list row">
        {properties.length > 0 ? (
          properties.map((property) => (
            <div className="col-md-4" key={property._id}>
              <PropertyCard property={property} onDelete={handleDelete} />
            </div>
          ))
        ) : (
          !loading && <p>No properties available.</p>
        )}
      </div>

      <div className="pagination mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            disabled={currentPage === i + 1}
            className={`btn btn-${currentPage === i + 1 ? "secondary" : "primary"} mx-1`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <RealEstateCard />
    </div>
  );
}

export default Home;
