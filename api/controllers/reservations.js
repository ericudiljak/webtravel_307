import { db } from "../connect.js";

export const getReservations = (req, res) => {
  const { id } = req.params;

  const q = "SELECT t.id AS tripId, u.id AS userId, u.username, t.title, t.tripDate FROM reservations r JOIN trips t ON t.id = r.tripId JOIN users u ON u.id = r.userId WHERE u.id = ? AND t.tripDate < NOW()";

  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

export const addReservation = (req, res) => {
  const userId = req.user.id; // Authenticated user's ID
  const tripId = req.params.id;
  const { tripDate } = req.body;

  const q = 'INSERT INTO reservations(`userId`, `tripId`, `tripDate`) VALUES (?, ?, ?)';
  const values = [userId, tripId, tripDate];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error("Error creating reservation:", err); // Log the error
      return res.status(500).json(err);
    }

    return res.json('Reservation created!');
  });
};

export const deleteReservation = (req, res) => {
  const { id } = req.params;

  const q = "DELETE FROM reservations WHERE `id` = ?";

  db.query(q, [id], (err, data) => {
    if (err) return res.status(403).json("Don't have permission for this operation!");

    return res.json("Reservation deleted!");
  });
};
