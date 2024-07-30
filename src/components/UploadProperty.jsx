
// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // function UploadProperty() {
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     description: "",
// //     location: "",
// //     address: "",
// //     phoneNumber: "",
// //     localGovernment: "",
// //   });
// //   const [images, setImages] = useState([]);
// //   const [videos, setVideos] = useState([]);
// //   const [existingProperties, setExistingProperties] = useState([]);
// //   const [selectedProperty, setSelectedProperty] = useState("");
// //   const [isCreatingNew, setIsCreatingNew] = useState(true);

// //   const localGovernments = [
// //     "Brass",
// //     "Ekeremor",
// //     "Kolokuma/Opokuma",
// //     "Nembe",
// //     "Ogbia",
// //     "Sagbama",
// //     "Southern Ijaw",
// //     "Yenagoa",
// //   ];

// //   useEffect(() => {
// //     // Fetch existing properties
// //     const fetchProperties = async () => {
// //       try {
// //         const response = await axios.get("https://propy-0mma.onrender.com/api/properties");
// //         setExistingProperties(response.data.properties); // Ensure response structure matches
// //       } catch (error) {
// //         console.error("Error fetching properties:", error);
// //       }
// //     };

// //     fetchProperties();
// //   }, []);

// //   useEffect(() => {
// //     if (!isCreatingNew && selectedProperty) {
// //       // Fetch the selected property details
// //       const fetchPropertyDetails = async () => {
// //         try {
// //           const response = await axios.get(`https://propy-0mma.onrender.com/api/properties/${selectedProperty}`);
// //           setFormData(response.data);
// //         } catch (error) {
// //           console.error("Error fetching property details:", error);
// //         }
// //       };

// //       fetchPropertyDetails();
// //     } else {
// //       setFormData({
// //         name: "",
// //         description: "",
// //         location: "",
// //         address: "",
// //         phoneNumber: "",
// //         localGovernment: "",
// //       });
// //     }
// //   }, [selectedProperty, isCreatingNew]);

// //   const handleChange = (e) => {
// //     setFormData({
// //       ...formData,
// //       [e.target.name]: e.target.value,
// //     });
// //   };

// //   const handleFileChange = (e) => {
// //     const files = e.target.files;
// //     const imageFiles = [];
// //     const videoFiles = [];

// //     for (let i = 0; i < files.length; i++) {
// //       if (files[i].type.startsWith("image/")) {
// //         imageFiles.push(files[i]);
// //       } else if (files[i].type.startsWith("video/")) {
// //         videoFiles.push(files[i]);
// //       }
// //     }

// //     setImages(imageFiles);
// //     setVideos(videoFiles);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     const data = new FormData();
// //     Object.keys(formData).forEach((key) => {
// //       data.append(key, formData[key]);
// //     });

// //     images.forEach((file) => {
// //       data.append("images", file);
// //     });

// //     videos.forEach((file) => {
// //       data.append("videos", file);
// //     });

// //     try {
// //       if (isCreatingNew) {
// //         await axios.post("https://propy-0mma.onrender.com/api/properties", data, {
// //           headers: {
// //             "Content-Type": "multipart/form-data",
// //             Authorization: `Bearer ${localStorage.getItem("token")}`,
// //           },
// //         });
// //         alert("Property created successfully");
// //       } else {
// //         await axios.put(`https://propy-0mma.onrender.com/api/properties/${selectedProperty}`, data, {
// //           headers: {
// //             "Content-Type": "multipart/form-data",
// //             Authorization: `Bearer ${localStorage.getItem("token")}`,
// //           },
// //         });
// //         alert("Property updated successfully");
// //       }

// //       setFormData({
// //         name: "",
// //         description: "",
// //         location: "",
// //         address: "",
// //         phoneNumber: "",
// //         localGovernment: "",
// //       });
// //       setImages([]);
// //       setVideos([]);
// //       setSelectedProperty("");
// //     } catch (error) {
// //       console.error("Error handling property:", error);
// //       alert("Operation failed");
// //     }
// //   };

// //   return (
// //     <div className="container shadow-lg mb-4 rounded mt-3">
// //       <h2>{isCreatingNew ? "Create New Property" : "Update Existing Property"}</h2>
// //       <form onSubmit={handleSubmit}>
// //         <button
// //           type="button"
// //           className="btn btn-secondary mb-3"
// //           onClick={() => setIsCreatingNew(!isCreatingNew)}
// //         >
// //           {isCreatingNew ? "Switch to Update" : "Switch to Create"}
// //         </button>

// //         {!isCreatingNew && (
// //           <div className="form-group">
// //             <label className="">Select Property</label>
// //             <select
// //               className="form-control"
// //               value={selectedProperty}
// //               onChange={(e) => setSelectedProperty(e.target.value)}
// //               required
// //             >
// //               <option value="">Select an existing property</option>
// //               {existingProperties.map((property) => (
// //                 <option key={property._id} value={property._id}>
// //                   {property.name}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>
// //         )}
// //         <div className="form-group">
// //           <label>Name</label>
// //           <input
// //             type="text"
// //             className="form-control"
// //             name="name"
// //             value={formData.name}
// //             onChange={handleChange}
// //             required
// //           />
// //         </div>
// //         <div className="form-group">
// //           <label>Description</label>
// //           <textarea
// //             className="form-control"
// //             name="description"
// //             value={formData.description}
// //             onChange={handleChange}
// //             required
// //           ></textarea>
// //         </div>
// //         <div className="form-group">
// //           <label>Location</label>
// //           <input
// //             type="text"
// //             className="form-control"
// //             name="location"
// //             value={formData.location}
// //             onChange={handleChange}
// //             required
// //           />
// //         </div>
// //         <div className="form-group">
// //           <label>Address</label>
// //           <input
// //             type="text"
// //             className="form-control"
// //             name="address"
// //             value={formData.address}
// //             onChange={handleChange}
// //             required
// //           />
// //         </div>
// //         <div className="form-group">
// //           <label>Phone Number</label>
// //           <input
// //             type="text"
// //             className="form-control"
// //             name="phoneNumber"
// //             value={formData.phoneNumber}
// //             onChange={handleChange}
// //             required
// //           />
// //         </div>
// //         <div className="form-group">
// //           <label>Local Government</label>
// //           <select
// //             className="form-control"
// //             name="localGovernment"
// //             value={formData.localGovernment}
// //             onChange={handleChange}
// //             required
// //           >
// //             <option value="">Select Local Government</option>
// //             {localGovernments.map((lg, index) => (
// //               <option key={index} value={lg}>
// //                 {lg}
// //               </option>
// //             ))}
// //           </select>
// //         </div>
// //         <div className="form-group">
// //           <label>Images</label>
// //           <input
// //             type="file"
// //             className="form-control"
// //             multiple
// //             onChange={handleFileChange}
// //             accept="image/*"
// //           />
// //         </div>
// //         <div className="form-group">
// //           <label>Videos</label>
// //           <input
// //             type="file"
// //             className="form-control"
// //             multiple
// //             onChange={handleFileChange}
// //             accept="video/*"
// //           />
// //         </div>
// //         <button type="submit" className="btn btn-primary mb-4 mt-3">
// //           {isCreatingNew ? "Create Property" : "Update Property"}
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }

// // export default UploadProperty;




// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function UploadProperty() {
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     location: "",
//     address: "",
//     phoneNumber: "",
//     localGovernment: "",
//   });
//   const [images, setImages] = useState([]);
//   const [videos, setVideos] = useState([]);
//   const [existingProperties, setExistingProperties] = useState([]);
//   const [selectedProperty, setSelectedProperty] = useState("");
//   const [isCreatingNew, setIsCreatingNew] = useState(true);

//   const localGovernments = [
//     "Brass",
//     "Ekeremor",
//     "Kolokuma/Opokuma",
//     "Nembe",
//     "Ogbia",
//     "Sagbama",
//     "Southern Ijaw",
//     "Yenagoa",
//   ];

//   useEffect(() => {
//     // Fetch existing properties
//     const fetchProperties = async () => {
//       try {
//         const response = await axios.get("https://propy-0mma.onrender.com/api/properties");
//         setExistingProperties(response.data.properties); // Ensure response structure matches
//       } catch (error) {
//         console.error("Error fetching properties:", error);
//       }
//     };

//     fetchProperties();
//   }, []);

//   useEffect(() => {
//     if (!isCreatingNew && selectedProperty) {
//       // Fetch the selected property details
//       const fetchPropertyDetails = async () => {
//         try {
//           const response = await axios.get(`https://propy-0mma.onrender.com/api/properties/${selectedProperty}`);
//           setFormData(response.data);
//         } catch (error) {
//           console.error("Error fetching property details:", error);
//         }
//       };

//       fetchPropertyDetails();
//     } else {
//       setFormData({
//         name: "",
//         description: "",
//         location: "",
//         address: "",
//         phoneNumber: "",
//         localGovernment: "",
//       });
//     }
//   }, [selectedProperty, isCreatingNew]);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleFileChange = (e) => {
//     const files = e.target.files;
//     const imageFiles = [];
//     const videoFiles = [];

//     for (let i = 0; i < files.length; i++) {
//       if (files[i].type.startsWith("image/")) {
//         imageFiles.push(files[i]);
//       } else if (files[i].type.startsWith("video/")) {
//         videoFiles.push(files[i]);
//       }
//     }

//     setImages(imageFiles);
//     setVideos(videoFiles);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     Object.keys(formData).forEach((key) => {
//       data.append(key, formData[key]);
//     });

//     images.forEach((file) => {
//       data.append("images", file);
//     });

//     videos.forEach((file) => {
//       data.append("videos", file);
//     });

//     try {
//       if (isCreatingNew) {
//         await axios.post("https://propy-0mma.onrender.com/api/properties", data, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         alert("Property created successfully");
//       } else {
//         await axios.put(`https://propy-0mma.onrender.com/api/properties/${selectedProperty}`, data, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         alert("Property updated successfully");
//       }

//       setFormData({
//         name: "",
//         description: "",
//         location: "",
//         address: "",
//         phoneNumber: "",
//         localGovernment: "",
//       });
//       setImages([]);
//       setVideos([]);
//       setSelectedProperty("");
//     } catch (error) {
//       console.error("Error handling property:", error);
//       alert("Operation failed");
//     }
//   };

//   return (
//     <div className="container shadow-lg mb-4 rounded mt-3">
//       <h2>{isCreatingNew ? "Create New Property" : "Update Existing Property"}</h2>
//       <form onSubmit={handleSubmit}>
//         <button
//           type="button"
//           className="btn btn-secondary mb-3"
//           onClick={() => setIsCreatingNew(!isCreatingNew)}
//         >
//           {isCreatingNew ? "Switch to Update" : "Switch to Create"}
//         </button>

//         {!isCreatingNew && (
//           <div className="form-group">
//             <label className="">Select Property</label>
//             <select
//               className="form-control"
//               value={selectedProperty}
//               onChange={(e) => setSelectedProperty(e.target.value)}
//               required
//             >
//               <option value="">Select an existing property</option>
//               {existingProperties.map((property) => (
//                 <option key={property._id} value={property._id}>
//                   {property.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}
//         <div className="form-group">
//           <label>Name</label>
//           <input
//             type="text"
//             className="form-control"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Description</label>
//           <textarea
//             className="form-control"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//           ></textarea>
//         </div>
//         <div className="form-group">
//           <label>Location</label>
//           <input
//             type="text"
//             className="form-control"
//             name="location"
//             value={formData.location}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Address</label>
//           <input
//             type="text"
//             className="form-control"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Phone Number</label>
//           <input
//             type="text"
//             className="form-control"
//             name="phoneNumber"
//             value={formData.phoneNumber}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Local Government</label>
//           <select
//             className="form-control"
//             name="localGovernment"
//             value={formData.localGovernment}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Local Government</option>
//             {localGovernments.map((lg, index) => (
//               <option key={index} value={lg}>
//                 {lg}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="form-group">
//           <label>Images</label>
//           <input
//             type="file"
//             className="form-control"
//             multiple
//             onChange={handleFileChange}
//             accept="image/*"
//           />
//         </div>
//         <div className="form-group">
//           <label>Videos</label>
//           <input
//             type="file"
//             className="form-control"
//             multiple
//             onChange={handleFileChange}
//             accept="video/*"
//           />
//         </div>
//         <button type="submit" className="btn btn-primary mb-4 mt-3">
//           {isCreatingNew ? "Create Property" : "Update Property"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default UploadProperty;





import React, { useState, useEffect } from "react";
import axios from "axios";

function UploadProperty() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    address: "",
    phoneNumber: "",
    localGovernment: "",
  });
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [existingProperties, setExistingProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [isCreatingNew, setIsCreatingNew] = useState(true);

  const localGovernments = [
    "Brass",
    "Ekeremor",
    "Kolokuma/Opokuma",
    "Nembe",
    "Ogbia",
    "Sagbama",
    "Southern Ijaw",
    "Yenagoa",
  ];

  useEffect(() => {
    // Fetch existing properties
    const fetchProperties = async () => {
      try {
        const response = await axios.get("https://propy-0mma.onrender.com/api/properties");
        setExistingProperties(response.data.properties); // Ensure response structure matches
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    if (!isCreatingNew && selectedProperty) {
      // Fetch the selected property details
      const fetchPropertyDetails = async () => {
        try {
          const response = await axios.get(`https://propy-0mma.onrender.com/api/properties/${selectedProperty}`);
          setFormData(response.data);
        } catch (error) {
          console.error("Error fetching property details:", error);
        }
      };

      fetchPropertyDetails();
    } else {
      setFormData({
        name: "",
        description: "",
        location: "",
        address: "",
        phoneNumber: "",
        localGovernment: "",
      });
    }
  }, [selectedProperty, isCreatingNew]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    const imageFiles = [];
    const videoFiles = [];

    for (let i = 0; i < files.length; i++) {
      if (files[i].type.startsWith("image/")) {
        imageFiles.push(files[i]);
      } else if (files[i].type.startsWith("video/")) {
        videoFiles.push(files[i]);
      }
    }

    setImages(imageFiles);
    setVideos(videoFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    images.forEach((file) => {
      data.append("images", file);
    });

    videos.forEach((file) => {
      data.append("videos", file);
    });

    try {
      if (isCreatingNew) {
        await axios.post("https://propy-0mma.onrender.com/api/properties", data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        alert("Property created successfully");
      } else {
        await axios.put(`https://propy-0mma.onrender.com/api/properties/${selectedProperty}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        alert("Property updated successfully");
      }

      setFormData({
        name: "",
        description: "",
        location: "",
        address: "",
        phoneNumber: "",
        localGovernment: "",
      });
      setImages([]);
      setVideos([]);
      setSelectedProperty("");
    } catch (error) {
      console.error("Error handling property:", error);
      alert("Operation failed");
    }
  };

  return (
    <div className="container shadow-lg mb-4 rounded mt-3">
      <h2>{isCreatingNew ? "Create New Property" : "Update Existing Property"}</h2>
      <form onSubmit={handleSubmit}>
        <button
          type="button"
          className="btn btn-secondary mb-3"
          onClick={() => setIsCreatingNew(!isCreatingNew)}
        >
          {isCreatingNew ? "Switch to Update" : "Switch to Create"}
        </button>

        {!isCreatingNew && (
          <div className="form-group">
            <label>Select Property</label>
            <select
              className="form-control"
              value={selectedProperty}
              onChange={(e) => setSelectedProperty(e.target.value)}
              required
            >
              <option value="">Select an existing property</option>
              {existingProperties.map((property) => (
                <option key={property._id} value={property._id}>
                  {property.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            className="form-control"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Local Government</label>
          <select
            className="form-control"
            name="localGovernment"
            value={formData.localGovernment}
            onChange={handleChange}
            required
          >
            <option value="">Select Local Government</option>
            {localGovernments.map((lg, index) => (
              <option key={index} value={lg}>
                {lg}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Images</label>
          <input
            type="file"
            className="form-control"
            multiple
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
        <div className="form-group">
          <label>Videos</label>
          <input
            type="file"
            className="form-control"
            multiple
            onChange={handleFileChange}
            accept="video/*"
          />
        </div>
        <button type="submit" className="btn btn-primary mb-4 mt-3">
          {isCreatingNew ? "Create Property" : "Update Property"}
        </button>
      </form>
    </div>
  );
}

export default UploadProperty;
