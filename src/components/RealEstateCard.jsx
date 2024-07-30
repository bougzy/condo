// RealEstateCard.js
import React from 'react';
import { Card, Button, Row, Col, Carousel } from 'react-bootstrap';

function RealEstateCard() {
  return (
    <Card className="my-4 shadow-sm">
      <Card.Body>
        <Row>
          {/* Images and Videos Carousel */}
          <Col md={6} className="d-flex align-items-center">
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://images.pexels.com/photos/323775/pexels-photo-323775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1/600x400"
                  alt="Property Slide 1"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg?auto=compress&cs=tinysrgb&w=600/600x400"
                  alt="Property Slide 2"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600/600x400"
                  alt="Property Slide 3"
                />
              </Carousel.Item>
            </Carousel>
          </Col>

          {/* Property Details */}
          <Col md={6}>
            <Card.Title className="mb-3">Beautiful Family House</Card.Title>
            <Card.Text className="text-muted">Downtown, Cityville</Card.Text>
            <Card.Text>
              <strong>Address:</strong> 123 Main Street
            </Card.Text>
            <Card.Text>
              A charming house in the heart of the city, featuring 3 bedrooms,
              2 bathrooms, and a spacious garden.
            </Card.Text>

            {/* Features List */}
            <ul className="list-unstyled">
              <li className="mb-2">
                <i className="fa fa-check-circle text-success"></i> Spacious
                Living Room
              </li>
              <li className="mb-2">
                <i className="fa fa-check-circle text-success"></i> Modern
                Kitchen
              </li>
              <li className="mb-2">
                <i className="fa fa-check-circle text-success"></i> Private
                Garden
              </li>
            </ul>

            <Button variant="primary">Contact Agent</Button>
          </Col>
        </Row>
      </Card.Body>

      {/* Why Choose Us Section */}
      <Card.Footer className="bg-light">
        <h5 className="text-center mt-3 mb-4">Why Choose Us</h5>
        <Row>
          <Col md={4} className="text-center mb-4">
            <i className="fa-solid fa-user-tie fa-2x text-primary mb-2"></i>
            <h6>Experienced Agents</h6>
            <p className="text-muted">
              Our agents are highly trained and experienced in the local market.
            </p>
          </Col>
          <Col md={4} className="text-center mb-4">
            <i className="fa-solid fa-dollar-sign fa-2x text-primary mb-2"></i>
            <h6>Affordable Prices</h6>
            <p className="text-muted">
              We offer competitive pricing to fit your budget.
            </p>
          </Col>
          <Col md={4} className="text-center mb-4">
            <i className="fa-solid fa-map-marker-alt fa-2x text-primary mb-2"></i>
            <h6>Best Locations</h6>
            <p className="text-muted">
              We have properties in prime locations across the city.
            </p>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
}

export default RealEstateCard;
