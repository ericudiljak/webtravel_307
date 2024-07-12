import jwt from "jsonwebtoken";
import {db} from "../connect.js";
import bcrypt from "bcrypt";

export const getUser = (req,res) => {
    const q = "SELECT `username`, `email` FROM users WHERE id = ?" ;

    db.query(q,[req.params.id],(err,data)=>{
        if(err) return res.json(err);

        return res.status(200).json(data[0]);
    });
}

export const getUsers = (req,res) => {
    const q = "SELECT `id`, `username`, `email`, `role`, `profilePic` FROM users" ;

    db.query(q,[req.params.id],(err,data)=>{
        if(err) return res.json(err);

        return res.status(200).json(data);
    });
}

export const deleteUser = (req, res) => {
  const userId = req.params.userId;

  const query = "DELETE FROM users WHERE id = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error deleting user:", err);
      return res.status(500).json({ message: "Error deleting user", error: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  });
};
   

export const updateUser = (req, res) => {
  const userId = req.params.id;
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json("Not authenticated!");
  }

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json("Invalid token!");
    }

    if (userInfo.role !== 'admin') {
      return res.status(403).json("Permission denied!");
    }

    const q = "UPDATE users SET `username`=?, `email`=?, `role`=? WHERE `id`=?";
    const values = [
      req.body.username,
      req.body.email,
      req.body.role,
      userId
    ];

    db.query(q, values, (err, data) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json("Internal server error");
      }

      return res.json("User updated!");
    });
  });
};

export const updateUsername = (req,res) => { 
  const token = req.cookies.access_token
  if(!token) return res.status(401).json("Not authentificated!")

  jwt.verify(token,"secretkey", (err, userInfo)=>{
      if(err) return res.status(403).json("Invalid token!")

      const q = "UPDATE users SET `username`=? WHERE `id`=?";

      const values = [
          req.body.username,        
      ]
  
      db.query(q,[...values,userInfo.id],(err,data)=>{
          if(err) return res.status(500).json(err)

          return res.json("Username updated!");
      })
  })
}

export const updateUserPassword = (req,res) => {



    const q = "SELECT * FROM users WHERE username = ?";

    db.query(q,[req.body.username],(err,data)=>{
        if(err) return res.json(err);
        if(data.length === 0) return res.status(404).json("User don't exist!") 
    

    const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password)

    if(!isPasswordCorrect) return res.status(400).json("Invalid username or password!")

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.newPassword, salt);

      const q = "UPDATE users SET `password`=? WHERE `id`=?";

      db.query(q,[hash,req.body.id],(err,data)=>{
          if(err) return res.json(err);
          return res.status(200).json("Password updated!");
      })
    
    })
}