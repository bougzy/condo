import React from "react";
import Carousel from "react-bootstrap/Carousel";

function PropertyModal({ show, onClose, property }) {
  if (!show) {
    return null;
  }

  return (
    <div
      className="modal show"
      tabIndex="-1"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.8)" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{property.name}</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <Carousel>
              {property.images.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={`/uploads/${image}`}
                    alt={`Slide ${index}`}
                  />
                </Carousel.Item>
              ))}
              {property.videos.map((video, index) => (
                <Carousel.Item key={index}>
                  <video className="d-block w-100" controls>
                    <source src={`/uploads/${video}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </Carousel.Item>
              ))}
            </Carousel>
            <p className="mt-3">{property.description}</p>
            <p>
              <strong>Location:</strong> {property.location}
            </p>
            <p>
              <strong>Address:</strong> {property.address}
            </p>
            <p>
              <strong>Phone Number:</strong> {property.phoneNumber}
            </p>
            <p>
              <strong>Local Government:</strong> {property.localGovernment}
            </p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyModal;
