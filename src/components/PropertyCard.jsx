

import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Buffer } from "buffer";

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

  // Function to create media source URLs from base64 data
  const createMediaSrc = (file) => {
    if (!file || !file.data || !file.data.data) return "";

    return `data:${file.contentType};base64,${Buffer.from(
      file.data.data
    ).toString("base64")}`;
  };

  return (
    <div className="card mb-4">
      {images.length > 0 && (
        <img
          src={createMediaSrc(images[0])}
          className="card-img-top"
          alt={name}
        />
      )}

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
                    <img
                      className="d-block w-100"
                      src={createMediaSrc(image)}
                      alt={`Slide ${index + 1}`}
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

export default PropertyCard;

