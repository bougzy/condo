import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import PropertyCard from "./PropertyCard";

function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1); // Current page
  const [hasMore, setHasMore] = useState(true); // To check if there are more properties to load
  const [error, setError] = useState(null);

  const fetchProperties = useCallback(async (page) => {
    try {
      const response = await axios.get(
        `https://propy-0mma.onrender.com/api/properties?page=${page}&limit=10`
      );
      if (response.data.properties.length < 10) {
        setHasMore(false); // No more data to load
      }
      setProperties((prevProperties) => [
        ...prevProperties,
        ...response.data.properties,
      ]);
    } catch (err) {
      console.error("Error fetching properties:", err);
      setError(err);
    }
  }, []);

  useEffect(() => {
    fetchProperties(page);
  }, [fetchProperties, page]);

  if (error) return <div>Error: {error.message}</div>;

  const loadMore = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

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
      {hasMore && (
        <div className="text-center mt-4">
          <Button onClick={loadMore}>Load More</Button>
        </div>
      )}
    </div>
  );
}

export default PropertyList;

