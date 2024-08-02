


// components/PropertyList.js

import React from "react";
import axios from "axios";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import PropertyCard from "./PropertyCard";
import { Button } from "react-bootstrap";

function PropertyList() {
  const queryClient = useQueryClient();

  const fetchProperties = async ({ pageParam = 1 }) => {
    try {
      const response = await axios.get(
        `https://propy-0mma.onrender.com/api/properties?page=${pageParam}&limit=5`
      );
      console.log("API Response:", response.data);

      return {
        properties: response.data.properties,
        nextPage:
          response.data.properties.length === 5 ? pageParam + 1 : undefined,
      };
    } catch (error) {
      console.error("Error fetching properties:", error);
      throw new Error("Failed to fetch properties");
    }
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["properties"],
    queryFn: fetchProperties,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    retry: 3, // Retry failed requests up to 3 times
  });

  const handleDelete = async (id) => {
    try {
      // Optimistically update the UI
      queryClient.setQueryData(["properties"], (oldData) => ({
        pages: oldData.pages.map((page) => ({
          ...page,
          properties: page.properties.filter(
            (property) => property._id !== id
          ),
        })),
        pageParams: oldData.pageParams,
      }));

      // Perform delete operation
      await axios.delete(`https://propy-0mma.onrender.com/api/properties/${id}`);

      // Invalidate query to refetch properties
      queryClient.invalidateQueries(["properties"]);
    } catch (err) {
      console.error("Error deleting property:", err);
      // Rollback optimistic update on error
      queryClient.refetchQueries(["properties"]);
    }
  };

  if (error) {
    console.error("Query Error:", error);
    return <div>Error: {error.message}</div>;
  }

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
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
      {isFetching && !isFetchingNextPage && <p>Loading...</p>}
    </div>
  );
}

export default PropertyList;

// // components/PropertyList.js
// import React from "react";
// import axios from "axios";
// import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
// import PropertyCard from "./PropertyCard";
// import { Button } from "react-bootstrap";

// function PropertyList() {
//   const queryClient = useQueryClient();

//   const fetchProperties = async ({ pageParam = 1 }) => {
//     try {
//       const response = await axios.get(
//         `https://propy-0mma.onrender.com/api/properties?page=${pageParam}&limit=5`
//       );
//       console.log("API Response:", response.data);

//       return {
//         properties: response.data.properties,
//         nextPage:
//           response.data.properties.length === 5 ? pageParam + 1 : undefined,
//       };
//     } catch (error) {
//       console.error("Error fetching properties:", error);
//       throw new Error("Failed to fetch properties");
//     }
//   };

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
//     retry: 3, // Retry failed requests up to 3 times
//   });

//   const handleDelete = async (id) => {
//     try {
//       // Optimistically update the UI
//       queryClient.setQueryData(["properties"], (oldData) => ({
//         pages: oldData.pages.map((page) => ({
//           ...page,
//           properties: page.properties.filter(
//             (property) => property._id !== id
//           ),
//         })),
//         pageParams: oldData.pageParams,
//       }));

//       // Perform delete operation
//       await axios.delete(`https://propy-0mma.onrender.com/api/properties/${id}`);

//       // Invalidate query to refetch properties
//       queryClient.invalidateQueries(["properties"]);
//     } catch (err) {
//       console.error("Error deleting property:", err);
//       // Rollback optimistic update on error
//       queryClient.refetchQueries(["properties"]);
//     }
//   };

//   if (error) {
//     console.error("Query Error:", error);
//     return <div>Error: {error.message}</div>;
//   }

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
//           <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
//             {isFetchingNextPage ? "Loading..." : "Load More"}
//           </Button>
//         </div>
//       )}
//       {isFetching && !isFetchingNextPage && <p>Loading...</p>}
//     </div>
//   );
// }

// export default PropertyList;
