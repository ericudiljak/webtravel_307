import Express from "express";
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import tripsRoutes from "./routes/trips.js"
import reservationsRoutes from "./routes/reservations.js"
import commentsRoutes from "./routes/comments.js"
import cors from "cors"
import multer from "multer";
import cookieParser from "cookie-parser";
import { verifyToken, verifyRole } from "./controllers/auth.js";
import { db } from "./connect.js";

const app = Express()

//middlewares
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Credentials", true)
    next()
})
app.use(Express.json())
app.use(cors({
    origin: "http://localhost:3000", // Allow requests from React frontend
    credentials: true,
}
))

// middleware/authMiddleware.js


  

  
app.use(cookieParser())

app.use("/api/users", verifyToken, verifyRole(['user', 'admin']), userRoutes)
app.use("/api/trips", tripsRoutes)
app.use("/api/comments", verifyToken, verifyRole(['user', 'admin']), commentsRoutes);
app.use("/api/reservations", verifyToken, verifyRole(['user', 'admin']), reservationsRoutes)
app.use("/api/auth", authRoutes)



app.listen(8800, ()=>{
    console.log("API working!!!")
})