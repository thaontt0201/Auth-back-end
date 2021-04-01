const db = require("../db/dbconfig");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const user = require("../db/users"); //to find user from database

//User login
const login = (req, res) => {
  //Extract email and password from the request body
  const email = req.body.email;
  const password = req.body.password;
  //call users.js file to check whether the user exist in the database or not
  const loginUser = user.getUserByEmail(email, (user) => {
    if (user.length > 0) {
      const hashpwd = user[0].password;
      //create JSON web token
      //compare password from the request to password we fetch from database
      //if password match, send the token
      bcrypt.compare(password, hashpwd, (err, match) => {
        if (match) {
          const token = jwt.sign({ userId: email }, process.env.SECRET_KEY);
          res.send({ token });
        } else {
          res.sendStatus(400).end();
        }
      });
    } else {
      res.sendStatus(400).end();
    }
  });
};

//User Sign up
const signup = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  user.getUserByEmail(email, (user) => {
    if (user.length === 0) {
      bcrypt.hash(password, 10, (err, hash) => {
        if (hash) {
          const newUser = req.body;
          const query = {
            text: "INSERT INTO users (email, password) VALUES ($1, $2)",
            values: [newUser.email, hash],
          };
          db.query(query, (err, result) => {
            if (err) {
              console.error(err);
            } else {
              res.send({ email, password: hash });
            }
          });
        } else res.sendStatus(500).end();
      });
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
  signup,
};
