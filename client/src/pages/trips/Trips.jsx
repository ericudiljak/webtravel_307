import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './trips.scss';
import Subtitle from "../../shared/Subtitle";
import NewsLetter from "../../shared/Newsletter";
import { AuthContext } from "../../context/authContext";

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [newTrip, setNewTrip] = useState({
    title: '',
    desc: '',
    img: '',
    category: '',
    price: '',
    date: '',
    tripDate: ''
  });
  const [selectedTrip, setSelectedTrip] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleModal = () => setModal(!modal);
  const toggleUpdateModal = () => setUpdateModal(!updateModal);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTrip({ ...newTrip, [name]: value });
  };

  const handleAddTrip = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8800/api/trips', newTrip, { 
        withCredentials: true 
      });
      setTrips([...trips, response.data]);
      toggleModal();
    } catch (error) {
      console.error('Error adding trip', error.response?.data);
    }
  };

  const handleUpdateTrip = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/api/trips/${selectedTrip.id}`, newTrip, { 
        withCredentials: true 
      });
      setTrips(trips.map(trip => trip.id === selectedTrip.id ? { ...trip, ...newTrip } : trip));
      toggleUpdateModal();
    } catch (error) {
      console.error('Error updating trip', error.response?.data);
    }
  };

  const handleDeleteTrip = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/api/trips/${id}`, { withCredentials: true });
      setTrips(trips.filter(trip => trip.id !== id));
    } catch (error) {
      console.error('Error deleting trip', error.response?.data);
    }
  };

  const openUpdateModal = (trip) => {
    setSelectedTrip(trip);
    setNewTrip({
      title: trip.title,
      desc: trip.desc,
      img: trip.img,
      category: trip.category,
      price: trip.price,
      date: trip.date,
      tripDate: trip.tripDate
    });
    toggleUpdateModal();
  };

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/trips', { withCredentials: true });
        setTrips(response.data);
      } catch (error) {
        setError('Error fetching trips');
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const groupTripsByCategory = (trips) => {
    return trips.reduce((groupedTrips, trip) => {
      const category = trip.category || 'Uncategorized';
      if (!groupedTrips[category]) {
        groupedTrips[category] = [];
      }
      groupedTrips[category].push(trip);
      return groupedTrips;
    }, {});
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleVisitClick = (id) => {
    navigate(`/trips/${id}`);
  };

  const groupedTrips = groupTripsByCategory(trips);

  return (
    <>
      <section>
        <Container>
          {Object.keys(groupedTrips).map((category) => (
            <div key={category}>
              <Row className="d-flex justify-content-around">
                <Col lg='12' className="mb-5">
                <br/><br/>
                  <Subtitle subtitle={`Trips in ${category}`} />
                  
                  {currentUser?.role === 'admin' && (
                    <button onClick={toggleModal}>Add a trip location</button>
                  )}
                </Col>
                {groupedTrips[category].map((trip, index) => (
                  <Col lg='3' key={index} className="mb-4">
                    <div className="card">
                      <img src={trip.img} alt={trip.title} className="card-img-top" />
                      <div className="card-body">
                        <h5 className="card-title">{trip.title}</h5>
                        <button className="btn btn-primary" onClick={() => handleVisitClick(trip.id)}>Visit</button>
                        {currentUser?.role === 'admin' && (
                          <>
                            <button className="btn btn-secondary" onClick={() => openUpdateModal(trip)}>Update</button>
                            <button className="btn btn-danger" onClick={() => handleDeleteTrip(trip.id)}>Delete</button>
                          </>
                        )}
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          ))}
        </Container>
      </section>

      <NewsLetter />

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Add New Trip</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleAddTrip}>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                value={newTrip.title}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="desc">Description</Label>
              <Input
                type="textarea"
                name="desc"
                id="desc"
                value={newTrip.desc}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="img">Image URL</Label>
              <Input
                type="text"
                name="img"
                id="img"
                value={newTrip.img}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="category">Category</Label>
              <Input
                type="text"
                name="category"
                id="category"
                value={newTrip.category}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="price">Price</Label>
              <Input
                type="number"
                name="price"
                id="price"
                value={newTrip.price}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="date">Date</Label>
              <Input
                type="date"
                name="date"
                id="date"
                value={newTrip.date}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="tripDate">Trip Date</Label>
              <Input
                type="date"
                name="tripDate"
                id="tripDate"
                value={newTrip.tripDate}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <Button color="primary" type="submit">Add Trip</Button>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={updateModal} toggle={toggleUpdateModal}>
        <ModalHeader toggle={toggleUpdateModal}>Update Trip</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleUpdateTrip}>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                value={newTrip.title}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="desc">Description</Label>
              <Input
                type="textarea"
                name="desc"
                id="desc"
                value={newTrip.desc}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="img">Image URL</Label>
              <Input
                type="text"
                name="img"
                id="img"
                value={newTrip.img}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="category">Category</Label>
              <Input
                type="text"
                name="category"
                id="category"
                value={newTrip.category}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="price">Price</Label>
              <Input
                type="number"
                name="price"
                id="price"
                value={newTrip.price}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="date">Date</Label>
              <Input
                type="date"
                name="date"
                id="date"
                value={newTrip.date}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="tripDate">Trip Date</Label>
              <Input
                type="date"
                name="tripDate"
                id="tripDate"
                value={newTrip.tripDate}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <Button color="primary" type="submit">Update Trip</Button>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleUpdateModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Trips;
