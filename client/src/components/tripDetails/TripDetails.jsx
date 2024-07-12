import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import "./tripDetails.scss";
import Comments from "../comments/Comments";

const generateTripDates = (startDate, numDates) => {
  const dates = [];
  const baseDate = moment(startDate, "YYYY-MM-DD");
  for (let i = 0; i < numDates; i++) {
    dates.push(baseDate.clone().add(i * 6, "days").format("YYYY-MM-DD"));
  }
  return dates;
};

const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize the navigate function
  const [trip, setTrip] = useState(null);
  const [numGuests, setNumGuests] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [commentOpen, setCommentOpen] = useState(false);
  const serviceCharge = 10;

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/trips/${id}`);
        setTrip(res.data);
        const tripDates = generateTripDates(res.data.tripDate, 5);
        setSelectedDate(tripDates[0]); // Set default date
      } catch (err) {
        console.error("Error fetching trip:", err);
      }
    };
    fetchTrip();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reservationData = {
      tripDate: selectedDate,
    };

    try {
      const response = await axios.post(
        `http://localhost:8800/api/reservations/${id}`,
        reservationData,
        { withCredentials: true } // Ensure cookies are sent with the request
      );
      console.log(response.data); // Log success message or handle as needed
      // Optionally reset form fields or show confirmation message
      navigate("/thankyou"); // Redirect to the thankyou page
    } catch (error) {
      console.error("Error creating reservation:", error);
      // Handle error state or display error message
    }
  };

  if (!trip) {
    return <div className="loading">Loading...</div>;
  }

  const tripDates = generateTripDates(trip.tripDate, 5);
  const totalPrice = trip.price * numGuests + serviceCharge;

  return (
    <div className="trip-details">
      <div className="trip-image">
        <img src={trip.img} alt={trip.title} />
      </div>
      <div className="trip-info">
        <h1>{trip.title}</h1>
        <p>{trip.desc}</p>
        <p>Listed {moment(trip.date).format("YYYY-MM-DD")}</p>
        <p>Price: ${trip.price} /per person</p>
        <div className="trip-booking">
          <h3>Information</h3>
          <form onSubmit={handleSubmit}>
            <div className="trip-dates">
              <p>Select Trip Date:</p>
              <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
                {tripDates.map((date) => (
                  <option key={date} value={date}>
                    {moment(date).format("YYYY-MM-DD")}
                  </option>
                ))}
              </select>
            </div>
            <div className="guest-select">
              <p>Number of Guests:</p>
              <select value={numGuests} onChange={(e) => setNumGuests(Number(e.target.value))}>
                {[...Array(10).keys()].map((n) => (
                  <option key={n + 1} value={n + 1}>
                    {n + 1} Guest{n + 1 > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
            <div className="trip-total">
              <p>Service charge: ${serviceCharge}</p>
              <h4>Total: ${totalPrice}</h4>
              <button type="submit">Book Trip</button>
            </div>
          </form>
        </div>
      </div>
      <div className="comment-section">
        <div className="toggle-comments" onClick={() => setCommentOpen(!commentOpen)}>
          {commentOpen ? "Hide Comments" : "Show Comments"}
        </div>
        {commentOpen && (
          <div className="comments-container">
            <Comments tripId={trip.id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TripDetails;
