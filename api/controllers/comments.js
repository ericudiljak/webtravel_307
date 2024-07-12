import {db} from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getComments = (req, res) =>{

const q = `SELECT c.*, u.id AS userId, username, profilePic 
FROM comments AS c JOIN users AS u ON (u.id = c.userId)
WHERE c.tripId = ?
ORDER BY c.createdAt DESC
`; 

    db.query(q, [req.query.tripId], (err, data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json(data);
    });  
}

export const addComment = (req, res) =>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo)=>{
        if(err) return res.status(403).json("Token is not valid!")

    const q = "INSERT INTO comments (`desc`, `createdAt`, `userId`, `tripId`) VALUES (?)"; 

const values = [
    req.body.desc,
    moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    userInfo.id,
    req.body.tripId
]

    db.query(q, [values], (err, data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json("Comment has been created!");
    }); 
    });  
};

export const deleteComment = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Invalid token!");

        const commentId = req.params.id;
        const checkQuery = "SELECT * FROM comments WHERE id = ?";
        db.query(checkQuery, [commentId], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.length === 0) return res.status(404).json("Comment not found!");

            const comment = data[0];
            if (comment.userId !== userInfo.id && userInfo.role !== 'admin') {
                return res.status(403).json("You are not allowed to delete this comment!");
            }

            const deleteQuery = "DELETE FROM comments WHERE id = ?";
            db.query(deleteQuery, [commentId], (err, data) => {
                if (err) return res.status(500).json(err);
                return res.status(200).json("Comment has been deleted!");
            });
        });
    });
};