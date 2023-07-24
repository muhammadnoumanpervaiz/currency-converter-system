const router = require("express").Router();
const User = require("../models/User")
const jwt = require("jsonwebtoken");

//static users credentials if you are not using MongoDB
const staticUsers = [
  {id: 1, password: "user1", email: "testinguser1@gmail.com" }, 
  {id: 2, password: "user2", email: "testinguser2@gmail.com" }
]

router.post("/login", async (req, res) => {
  try {
      const { email, password } = req.body;

      // Check if user exists in the database
      let user = await User.findOne({ email });
      let staticUserExist = staticUsers.find((u) => u.email === email);
      // If user does not exist, create a new one
      if (!user && staticUserExist) {
          user = new User({ email, password });
          await user.save();
      }

      let token;
      if(password === user.password || password === staticUserExist.password){
        // Generate JWT token
        token = jwt.sign({ id: user._id || staticUserExist.password }, process.env.TOKEN_SECRET);
      }else{
        console.log("Correct Password:", user.password);
      }
    
      // Send token in response
      token && res.json({ message: "Login successful", token });
      !token && res.json({ message: "You are already registered, Please enter correct password given in console"});
  } catch (error) {
      console.error("Error during login:", error.message);
      res.status(500).json({ error: "Error during login" });
  }
});

module.exports = router;
