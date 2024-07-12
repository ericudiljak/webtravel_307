import { addTrips, deleteTrips, getTrips, getTrip, searchTrips, updateTrips } from "../controllers/trips.js";
import express  from "express";
import { verifyToken , verifyRole } from "../controllers/auth.js";

const router = express.Router();


router.get("/search/", searchTrips);
router.delete("/:id", deleteTrips);
router.put("/:id", updateTrips);
router.get("/:id", getTrip);  // Dodajemo novu rutu za pojedinačno putovanje
router.get("/", getTrips);
router.post("/",  verifyToken, verifyRole(['user', 'admin']), addTrips);



export default router;
