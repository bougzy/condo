// import React, { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import PropertyCard from "./PropertyCard";

// function PropertyList() {
//   const [properties, setProperties] = useState([]);
//   const [page, setPage] = useState(1); // Current page
//   const [hasMore, setHasMore] = useState(true); // To check if there are more properties to load
//   const [error, setError] = useState(null);

//   const fetchProperties = useCallback(async (page) => {
//     try {
//       const response = await axios.get(
//         `https://propy-0mma.onrender.com/api/properties?page=${page}&limit=10`
//       );
//       if (response.data.properties.length < 10) {
//         setHasMore(false); // No more data to load
//       }
//       setProperties((prevProperties) => [
//         ...prevProperties,
//         ...response.data.properties,
//       ]);
//     } catch (err) {
//       console.error("Error fetching properties:", err);
//       setError(err);
//     }
//   }, []);

//   useEffect(() => {
//     fetchProperties(page);
//   }, [fetchProperties, page]);

//   if (error) return <div>Error: {error.message}</div>;

//   const loadMore = () => {
//     if (hasMore) {
//       setPage((prevPage) => prevPage + 1);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Properties</h2>
//       <div className="row">
//         {properties.length > 0 ? (
//           properties.map((property) => (
//             <div className="col-md-4" key={property._id}>
//               <PropertyCard property={property} onDelete={handleDelete} />
//             </div>
//           ))
//         ) : (
//           <p>No properties available.</p>
//         )}
//       </div>
//       {hasMore && (
//         <div className="text-center mt-4">
//           <Button onClick={loadMore}>Load More</Button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default PropertyList;


// import React, { useState } from "react";
// import { useInfiniteQuery } from "@tanstack/react-query";
// import axios from "axios";
// import PropertyCard from "./PropertyCard";
// import { Button } from "react-bootstrap";

// const fetchProperties = async ({ pageParam = 1 }) => {
//   const response = await axios.get(
//     `https://propy-0mma.onrender.com/api/properties?page=${pageParam}&limit=10`
//   );

//   return {
//     properties: response.data.properties,
//     nextPage: response.data.properties.length === 10 ? pageParam + 1 : undefined,
//   };
// };

// function PropertyList() {
//   const {
//     data,
//     error,
//     fetchNextPage,
//     hasNextPage,
//     isFetching,
//     isFetchingNextPage,
//   } = useInfiniteQuery({
//     queryKey: ["properties"],
//     queryFn: fetchProperties,
//     getNextPageParam: (lastPage) => lastPage.nextPage,
//   });

//   const handleDelete = (id) => {
//     // Optimistically remove the property from the UI
//     queryClient.setQueryData(["properties"], (oldData) => ({
//       pages: oldData.pages.map((page) => ({
//         ...page,
//         properties: page.properties.filter((property) => property._id !== id),
//       })),
//       pageParams: oldData.pageParams,
//     }));

//     // Perform delete operation
//     axios
//       .delete(`https://propy-0mma.onrender.com/api/properties/${id}`)
//       .then(() => {
//         // Invalidate query to refetch properties
//         queryClient.invalidateQueries(["properties"]);
//       })
//       .catch((err) => {
//         console.error("Error deleting property:", err);
//         // Rollback optimistic update on error
//         queryClient.refetchQueries(["properties"]);
//       });
//   };

//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <div className="container mt-4">
//       <h2>Properties</h2>
//       <div className="row">
//         {data?.pages.map((page) =>
//           page.properties.map((property) => (
//             <div className="col-md-4" key={property._id}>
//               <PropertyCard property={property} onDelete={handleDelete} />
//             </div>
//           ))
//         )}
//       </div>
//       {hasNextPage && (
//         <div className="text-center mt-4">
//           <Button
//             onClick={() => fetchNextPage()}
//             disabled={isFetchingNextPage}
//           >
//             {isFetchingNextPage ? "Loading..." : "Load More"}
//           </Button>
//         </div>
//       )}
//       {isFetching && !isFetchingNextPage && <p>Loading...</p>}
//     </div>
//   );
// }

// export default PropertyList;


// components/PropertyList.js
import React from 'react';
import axios from 'axios';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import PropertyCard from './PropertyCard';
import { Button } from 'react-bootstrap';

function PropertyList() {
  const queryClient = useQueryClient();

  const fetchProperties = async ({ pageParam = 1 }) => {
    const response = await axios.get(
      `https://propy-0mma.onrender.com/api/properties?page=${pageParam}&limit=5`
    );
    console.log('API Response:', response.data);

    return {
      properties: response.data.properties,
      nextPage:
        response.data.properties.length === 5 ? pageParam + 1 : undefined,
    };
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['properties'],
    queryFn: fetchProperties,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const handleDelete = async (id) => {
    try {
      // Optimistically update the UI
      queryClient.setQueryData(['properties'], (oldData) => ({
        pages: oldData.pages.map((page) => ({
          ...page,
          properties: page.properties.filter((property) => property._id !== id),
        })),
        pageParams: oldData.pageParams,
      }));

      // Perform delete operation
      await axios.delete(`https://propy-0mma.onrender.com/api/properties/${id}`);

      // Invalidate query to refetch properties
      queryClient.invalidateQueries(['properties']);
    } catch (err) {
      console.error('Error deleting property:', err);
      // Rollback optimistic update on error
      queryClient.refetchQueries(['properties']);
    }
  };

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mt-4">
      <h2>Properties</h2>
      <div className="row">
        {data?.pages.map((page) =>
          page.properties.map((property) => (
            <div className="col-md-4" key={property._id}>
              <PropertyCard property={property} onDelete={handleDelete} />
            </div>
          ))
        )}
      </div>
      {hasNextPage && (
        <div className="text-center mt-4">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
      {isFetching && !isFetchingNextPage && <p>Loading...</p>}
    </div>
  );
}

export default PropertyList;
