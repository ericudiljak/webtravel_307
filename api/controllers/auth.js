import { db } from "../connect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  const { username, email, password, role } = req.body;
  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const q = "INSERT INTO users(`username`, `email`, `password`, `role`) VALUES (?)";
    const values = [username, email, hashedPassword, "user"];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(201).json("User created!");
    });
  });
};

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);
    if (!checkPassword) return res.status(400).json("Wrong password or username!");

    const token = jwt.sign({ id: data[0].id, role: data[0].role }, "secretkey");
    const { password, ...other } = data[0];

    res.cookie("accessToken", token, { httpOnly: true }).status(200).json(other);
  });
};

export const logout = (req, res) => {
  res.clearCookie("accessToken", { secure: true, sameSite: "none" }).status(200).json("User has been logged out!");
};


export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    req.user = userInfo;
    next();
  });
};


export const verifyRole = (allowedRoles) => {
    return (req, res, next) => {
        const token = req.cookies.accessToken;
        if (!token) return res.status(401).json("Not authenticated!");

        jwt.verify(token, "secretkey", (err, userInfo) => {
            if (err) return res.status(403).json("Token is not valid!");

            if (!allowedRoles.includes(userInfo.role)) {
                return res.status(403).json("You are not allowed to access this resource!");
            }

            req.user = userInfo;
            next();
        });
    };
};

