import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import axios from 'axios';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import moment from 'moment';
import './booked.scss';

const Booked = () => {
  const { currentUser } = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const fetchReservations = async () => {
        try {
          const response = await axios.get(`http://localhost:8800/api/reservations/${currentUser.id}`, { withCredentials: true });
          setReservations(response.data);
        } catch (error) {
          setError('Error fetching reservations');
        } finally {
          setLoading(false);
        }
      };

      fetchReservations();
    }
  }, [currentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <Row>
        <Col lg="12" className="mb-5">
          <br/><br/>
          <h2>Your Booked Trips</h2>
          {reservations.length === 0 ? (
            <p>No reservations found.</p>
          ) : (
            reservations.map((reservation) => (
              <Card className="mb-3 reservation-card" key={reservation.id}>
                <CardBody>
                  <CardTitle tag="h5">{reservation.title}</CardTitle>
                  <CardText>{reservation.desc}</CardText>
                  <CardText>
                    <small className="text-muted">
                      {moment(reservation.tripDate).format('MMMM Do YYYY, h:mm:ss a')}
                    </small>
                  </CardText>
                </CardBody>
              </Card>
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Booked;
