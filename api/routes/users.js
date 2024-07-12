import express from "express";
import { deleteUser, getUser, updateUser, getUsers } from "../controllers/user.js";
import { verifyToken, verifyRole } from "../controllers/auth.js";
const router = express.Router()

router.get("/:id", getUser)
router.get("/", getUsers);
router.delete("/:userId", verifyToken, verifyRole(["admin"]), deleteUser);
router.put("/:id", verifyToken, verifyRole(['admin']), updateUser)


export default router