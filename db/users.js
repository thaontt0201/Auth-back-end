const db = require("./dbconfig");

//a function to search user by email

//Get user by email
const getUserByEmail = (email, next) => {
  const query = {
    text: "SELECT * FROM users WHERE email = $1",
    //text attribute contains SQL statement
    //$1 means the order of element which printed in array.
    values: [email],
    //values attribute contains query parameter values, which printed in array
  };

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query", err.stack);
      return;
      //return console.error("Error executing query", err.stack);
    }
    return next(result.rows);
    //result.rows: actual result data from database
    //next() is move to the next function in the parameter in the route handler
    //2 types of Return
    // return the result and the other type is to interrupt of function
  });
};

module.exports = {
  getUserByEmail,
};
