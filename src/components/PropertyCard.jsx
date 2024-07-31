



// import React, { useState, useMemo } from "react";
// import { Modal, Button, Carousel } from "react-bootstrap";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "react-lazy-load-image-component/src/effects/blur.css";
// import { Buffer } from "buffer";

// function PropertyCard({ property, onDelete }) {
//   const {
//     _id,
//     name,
//     description,
//     location,
//     address,
//     phoneNumber,
//     localGovernment,
//     images,
//     videos,
//   } = property;

//   const [showModal, setShowModal] = useState(false);

//   // Memoize the creation of media source URLs to avoid re-computation
//   const createMediaSrc = useMemo(() => (file) => {
//     if (!file || !file.data || !file.data.data) return "";

//     return `data:${file.contentType};base64,${Buffer.from(
//       file.data.data
//     ).toString("base64")}`;
//   }, []);

//   return (
//     <div className="card mb-4">
//       {images.length > 0 && (
//         <LazyLoadImage
//           src={createMediaSrc(images[0])}
//           className="card-img-top"
//           alt={name}
//           effect="blur" // Adds a blur effect while loading
//         />
//       )}

//       <div className="card-body">
//         <h5 className="card-title">{name}</h5>
//         <Button variant="primary" onClick={() => setShowModal(true)}>
//           More
//         </Button>
//         <Button variant="danger" onClick={() => onDelete(_id)} className="ml-2">
//           Delete
//         </Button>
//       </div>

//       {/* Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>{name}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>
//             <strong>Description:</strong> {description}
//           </p>
//           <p>
//             <strong>Location:</strong> {location}
//           </p>
//           <p>
//             <strong>Address:</strong> {address}
//           </p>
//           <p>
//             <strong>Phone Number:</strong> {phoneNumber}
//           </p>
//           <p>
//             <strong>Local Government:</strong> {localGovernment}
//           </p>

//           {/* Image Carousel */}
//           {images.length > 0 && (
//             <>
//               <h5>Images</h5>
//               <Carousel>
//                 {images.map((image, index) => (
//                   <Carousel.Item key={index}>
//                     <LazyLoadImage
//                       className="d-block w-100"
//                       src={createMediaSrc(image)}
//                       alt={`Slide ${index + 1}`}
//                       effect="blur"
//                     />
//                   </Carousel.Item>
//                 ))}
//               </Carousel>
//             </>
//           )}

//           {/* Video Carousel */}
//           {videos.length > 0 && (
//             <>
//               <h5 className="mt-4">Videos</h5>
//               <Carousel>
//                 {videos.map((video, index) => (
//                   <Carousel.Item key={index}>
//                     <video className="d-block w-100" controls>
//                       <source
//                         src={createMediaSrc(video)}
//                         type={video.contentType}
//                       />
//                       Your browser does not support the video tag.
//                     </video>
//                   </Carousel.Item>
//                 ))}
//               </Carousel>
//             </>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }

// export default React.memo(PropertyCard); // Memoize PropertyCard to prevent unnecessary re-renders

// import React, { useState, useMemo } from "react";
// import { Modal, Button, Carousel } from "react-bootstrap";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "react-lazy-load-image-component/src/effects/blur.css";
// import { Buffer } from "buffer";

// function PropertyCard({ property, onDelete }) {
//   const {
//     _id,
//     name,
//     description,
//     location,
//     address,
//     phoneNumber,
//     localGovernment,
//     images,
//     videos,
//   } = property;

//   const [showModal, setShowModal] = useState(false);

//   // Memoize the creation of media source URLs to avoid re-computation
//   const createMediaSrc = useMemo(
//     () => (file) => {
//       if (!file || !file.data || !file.data.data) return "";

//       return `data:${file.contentType};base64,${Buffer.from(
//         file.data.data
//       ).toString("base64")}`;
//     },
//     []
//   );

//   return (
//     <div className="card mb-4">
//       {images.length > 0 && (
//         <LazyLoadImage
//           src={createMediaSrc(images[0])}
//           className="card-img-top"
//           alt={name}
//           effect="blur" // Adds a blur effect while loading
//         />
//       )}

//       <div className="card-body">
//         <h5 className="card-title">{name}</h5>
//         <Button variant="primary" onClick={() => setShowModal(true)}>
//           More
//         </Button>
//         <Button variant="danger" onClick={() => onDelete(_id)} className="ml-2">
//           Delete
//         </Button>
//       </div>

//       {/* Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>{name}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>
//             <strong>Description:</strong> {description}
//           </p>
//           <p>
//             <strong>Location:</strong> {location}
//           </p>
//           <p>
//             <strong>Address:</strong> {address}
//           </p>
//           <p>
//             <strong>Phone Number:</strong> {phoneNumber}
//           </p>
//           <p>
//             <strong>Local Government:</strong> {localGovernment}
//           </p>

//           {/* Image Carousel */}
//           {images.length > 0 && (
//             <>
//               <h5>Images</h5>
//               <Carousel>
//                 {images.map((image, index) => (
//                   <Carousel.Item key={index}>
//                     <LazyLoadImage
//                       className="d-block w-100"
//                       src={createMediaSrc(image)}
//                       alt={`Slide ${index + 1}`}
//                       effect="blur"
//                     />
//                   </Carousel.Item>
//                 ))}
//               </Carousel>
//             </>
//           )}

//           {/* Video Carousel */}
//           {videos.length > 0 && (
//             <>
//               <h5 className="mt-4">Videos</h5>
//               <Carousel>
//                 {videos.map((video, index) => (
//                   <Carousel.Item key={index}>
//                     <video className="d-block w-100" controls>
//                       <source
//                         src={createMediaSrc(video)}
//                         type={video.contentType}
//                       />
//                       Your browser does not support the video tag.
//                     </video>
//                   </Carousel.Item>
//                 ))}
//               </Carousel>
//             </>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }

// export default React.memo(PropertyCard); // Memoize PropertyCard to prevent unnecessary re-renders


// // components/PropertyCard.js
// import React from 'react';
// import { Card, Button } from 'react-bootstrap';

// function PropertyCard({ property, onDelete }) {
//   const createMediaSrc = (file) => {
//     if (!file || !file.data) return '';
//     const base64String = btoa(
//       new Uint8Array(file.data.data).reduce(
//         (data, byte) => data + String.fromCharCode(byte),
//         ''
//       )
//     );
//     return `data:${file.contentType};base64,${base64String}`;
//   };

//   const renderMedia = () => {
//     return (
//       <>
//         {/* Render images */}
//         {property.images && property.images.length > 0 && (
//           <Card.Img
//             variant="top"
//             src={createMediaSrc(property.images[0])}
//             alt={property.name}
//           />
//         )}

//         {/* Render videos */}
//         {property.videos && property.videos.length > 0 && (
//           <div>
//             <h5>Videos</h5>
//             {property.videos.map((video, index) => (
//               <video key={index} controls className="w-100 mb-2">
//                 <source src={createMediaSrc(video)} type={video.contentType} />
//                 Your browser does not support the video tag.
//               </video>
//             ))}
//           </div>
//         )}
//       </>
//     );
//   };

//   return (
//     <Card className="mb-3">
//       {renderMedia()}
//       <Card.Body>
//         <Card.Title>{property.name}</Card.Title>
//         <Card.Text>{property.description}</Card.Text>
//         <Card.Text>
//           <small className="text-muted">{property.location}</small>
//         </Card.Text>
//         <Button variant="danger" onClick={() => onDelete(property._id)}>
//           Delete
//         </Button>
//       </Card.Body>
//     </Card>
//   );
// }

// export default PropertyCard;



// components/PropertyCard.js
import React, { useState, useMemo } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Buffer } from "buffer";
import "./Property.css"

function PropertyCard({ property, onDelete }) {
  const {
    _id,
    name,
    description,
    location,
    address,
    phoneNumber,
    localGovernment,
    images,
    videos,
  } = property;

  const [showModal, setShowModal] = useState(false);

  // Memoize the creation of media source URLs to avoid re-computation
  const createMediaSrc = useMemo(
    () => (file) => {
      if (!file || !file.data || !file.data.data) return "";

      return `data:${file.contentType};base64,${Buffer.from(
        file.data.data
      ).toString("base64")}`;
    },
    []
  );

  return (
    <div className="card mb-4">
      <div className="card-media">
        {images.length > 0 && (
          <LazyLoadImage
            src={createMediaSrc(images[0])}
            className="card-media-item"
            alt={name}
            effect="blur" // Adds a blur effect while loading
          />
        )}

        {/* Show first video if available */}
        {videos.length > 0 && (
          <video className="card-media-item" controls>
            <source src={createMediaSrc(videos[0])} type={videos[0].contentType} />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          More
        </Button>
        <Button variant="danger" onClick={() => onDelete(_id)} className="ml-2">
          Delete
        </Button>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Description:</strong> {description}
          </p>
          <p>
            <strong>Location:</strong> {location}
          </p>
          <p>
            <strong>Address:</strong> {address}
          </p>
          <p>
            <strong>Phone Number:</strong> {phoneNumber}
          </p>
          <p>
            <strong>Local Government:</strong> {localGovernment}
          </p>

          {/* Image Carousel */}
          {images.length > 0 && (
            <>
              <h5>Images</h5>
              <Carousel>
                {images.map((image, index) => (
                  <Carousel.Item key={index}>
                    <LazyLoadImage
                      className="d-block w-100"
                      src={createMediaSrc(image)}
                      alt={`Slide ${index + 1}`}
                      effect="blur"
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </>
          )}

          {/* Video Carousel */}
          {videos.length > 0 && (
            <>
              <h5 className="mt-4">Videos</h5>
              <Carousel>
                {videos.map((video, index) => (
                  <Carousel.Item key={index}>
                    <video className="d-block w-100" controls>
                      <source
                        src={createMediaSrc(video)}
                        type={video.contentType}
                      />
                      Your browser does not support the video tag.
                    </video>
                  </Carousel.Item>
                ))}
              </Carousel>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default React.memo(PropertyCard); // Memoize PropertyCard to prevent unnecessary re-renders
