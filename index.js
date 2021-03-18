require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const query = require("./db/customers");
const app = express();
app.use(bodyParser.json());

const port = 3000;

//Fetch all the customers
app.get("/api/customers", query.getAllCustomers);

//Fetch customer by id
app.get("/api/customers/:id", query.getCustomerById);

//Add new customer
app.post("/api/customers", query.addCustomer);

//Delete by Id
app.delete("/api/customers/:id", query.deleteById);

//Update by Id
app.put("/api/customers/:id", query.updateById);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
