import express from "express";
import { getReservations, addReservation, deleteReservation } from "../controllers/reservations.js";
import { verifyToken , verifyRole } from "../controllers/auth.js";

const router = express.Router();

router.get("/:id", verifyToken, getReservations);
router.post("/:id", verifyToken, verifyRole(['admin', 'user']), addReservation);
router.delete("/:id", verifyToken, verifyRole(['admin']), deleteReservation);



export default router;
