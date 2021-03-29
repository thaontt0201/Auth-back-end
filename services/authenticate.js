const jwt = require("jsonwebtoken");
const user = require("../db/users"); //to find user from database
const bcrypt = require("bcrypt");

//User login
const login = (req, res) => {
  //Extract email and password from the request body
  const email = req.body.email;
  const password = req.body.password;
  //call users.js file to check if the user exist in the database
  const loginUser = user.getUserByEmail(email, (user) => {
    if (user.length > 0) {
      const hashpwd = user[0].password;
      //create JSON web token

      //compare password from the request to password we fetch from database
      //if password match, send the token
      if (bcrypt.compareSync(password, hashpwd)) {
        const token = jwt.sign({ userId: email }, process.env.SECRET_KEY);
        res.send({ token });
      }

      if (bcrypt.compareSync(password, hashpwd)) res.send({ token });
      else res.sendStatus(400).end();
    } else {
      res.sendStatus(400).end();
    }
  });
};

//User authentication
const authentication = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    res.sendStatus(400).end();
  }

  //Verify the received token
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) res.sendStatus(400).end();
    else next();
  });
};

module.exports = {
  authentication,
  login,
};
