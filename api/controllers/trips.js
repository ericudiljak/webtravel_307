import jwt from "jsonwebtoken";
import { db } from "../connect.js";

export const getTrips = (req,res) => {
  const q = req.query.cat ? "SELECT * FROM trips WHERE cat=?" : " SELECT * FROM trips";

  db.query(q,[req.query.cat],(err,data)=>{
      if(err) return res.send(err);

      return res.status(200).json(data);
  });
}

export const getTrip = (req, res) => {
  const tripId = req.params.id;
  const query = "SELECT * FROM trips WHERE id = ?";
  db.query(query, [tripId], (err, results) => {
    if (err) {
      console.error("Error fetching trip:", err);
      return res.status(500).send('Error fetching trip');
    }
    if (results.length === 0) {
      return res.status(404).send('Trip not found');
    }
    res.send(results[0]);
  });
};


export const searchTrips = (req,res) => {
    const q = req.query.cat ? "SELECT * FROM trips WHERE category=? AND titleTrip like '" + req.query.title + "%'" : " SELECT * FROM trips WHERE titleTrip like '" + req.query.title + "%'";

    db.query(q,[req.query.cat],(err,data)=>{
        if(err) return res.send(err);

        return res.status(200).json(data);
    });
}

export const addTrips = (req,res) => {
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Not authentificated!")

    jwt.verify(token,"secretkey", (err, userInfo)=>{
        if(err) return res.status(403).json("Invalid token!")
        if (userInfo.isAdmin) return res.status(403).json("Don't have permission for this operation!");
            
    
        const q = "INSERT INTO trips(`title`, `desc`,`img`, `category`,`date`, `price`, `tripDate`) VALUES (?)"

        
        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.category,
            req.body.date, 
            req.body.price,
            req.body.tripDate.substring(0, 10)
        ]
    
        db.query(q,[values],(err,data)=>{
            if(err) return res.status(500).json(err)

            return res.json("Trip created!");
        })
    })
}

/*export const deleteTrips = (req,res) => {
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Not authentificated!")

    jwt.verify(token,"secretkey", (err, userInfo)=>{
        if(err) return res.status(403).json("Invalid token!")

        const tripId = req.params.id
        const q = "DELETE FROM trips WHERE `id` = ? AND `uid` = ?";

        db.query(q,[tripId, userInfo.id], (err, data) =>{
            if(err) return res.status(403).json("Don't have permission for this operation!")
        
            return res.json("Trip deleted!")
        })
    })
}*/

export const deleteTrips = (req, res) => {
    const q = "DELETE FROM trips WHERE `id`=?";
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  };

export const updateTrips = (req,res) => {
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Not authentificated!")

    jwt.verify(token,"secretkey", (err, userInfo)=>{
        if(err) return res.status(403).json("Invalid token!")

        const tripId = req.params.id;
        const q = "UPDATE trips SET `title`=?,`desc`=?,`img`=?,`category`=?, `price`=?, `tripDate`=? WHERE `id`=?";

        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.category,   
            req.body.price,
            req.body.tripDate.substring(0, 10)       
        ]
    
        db.query(q,[...values,tripId,userInfo.id],(err,data)=>{
            if(err) return res.status(500).json(err)

            return res.json("Trip updated!");
        })
    })
}