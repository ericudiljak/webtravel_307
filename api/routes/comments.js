import express from "express";
import { getComments, addComment, deleteComment } from "../controllers/comments.js";
import { verifyToken , verifyRole } from "../controllers/auth.js";

const router = express.Router();

router.get("/", getComments);
router.post("/", addComment);
router.delete("/:id", verifyToken, verifyRole(['admin', 'user']),  deleteComment);

export default router;
