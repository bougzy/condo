import React, { useEffect, useState } from "react";
import axios from "axios";
import PropertyCard from "./PropertyCard"; // Assuming you have a PropertyCard component

function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("https://propy-0mma.onrender.com/api/properties");
        setProperties(response.data.properties);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mt-4">
      <h2>Properties</h2>
      <div className="row">
        {properties.length > 0 ? (
          properties.map((property) => (
            <div className="col-md-4" key={property._id}>
              <PropertyCard property={property} onDelete={handleDelete} />
            </div>
          ))
        ) : (
          <p>No properties available.</p>
        )}
      </div>
    </div>
  );
}

export default PropertyList;
