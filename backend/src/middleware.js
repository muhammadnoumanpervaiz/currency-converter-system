const express = require("express");
const jwt = require('jsonwebtoken');

//Middleware to apply as check on routes that with authenticat requests
const verifyToken = (req, res, next) => {
  // taken recieving in header of requests
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    // verifiying token to authenticat request
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid token' });
      }
      req.userId = decoded.userId;
      next();
    });
};

module.exports = verifyToken;