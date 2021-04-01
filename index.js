require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const query = require("./db/customers");
const app = express();
app.use(bodyParser.json());
const auth = require("./services/authenticate");

const port = 3000;

//Fetch all the customers
app.get("/api/customers", auth.authentication, query.getAllCustomers);

//Fetch customer by id
app.get("/api/customers/:id", auth.authentication, query.getCustomerById);

//Add new customer
app.post("/api/customers", auth.authentication, query.addCustomer);

//Delete by Id
app.delete("/api/customers/:id", auth.authentication, query.deleteById);

//Update by Id
app.put("/api/customers/:id", auth.authentication, query.updateById);

//Route for authentication
app.post("/login", auth.login);

//Route for sign up
app.post("/signup", auth.signup);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
