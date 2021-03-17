const { query } = require("express");
const db = require("./dbconfig");

//Fetch all customers
const getAllCustomers = (req, res) => {
  db.query("SELECT * FROM customer", (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.json(result.rows);
    }
  });
};
//Fetch customer by id
const getCustomerById = (req, res) => {
  const query = {
    text: "SELECT * FROM customer WHERE id = $1",
    values: [req.params.id],
  };
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query");
    } else {
      if (result.rows.length > 0) {
        res.json(result.rows);
      } else {
        res.status(404).end();
      }
    }
  });
};
//Add a new custmer
const addCustomer = (req, res) => {
  const newCustomer = req.body;
  const query = {
    text:
      "INSERT INTO customer (firstname, lastname, email, phone) VALUES ($1, $2, $3, $4)",
    values: [
      newCustomer.firstname,
      newCustomer.lastname,
      newCustomer.email,
      newCustomer.phone,
    ],
  };
  db.query(query, (err, res) => {
    if (err) {
      return console.error("Error executing query");
    }
  });
  res.json(newCustomer);
};
//Delete customer by id
const deleteById = (req, res) => {
  const query = {
    text: "DELETE FROM customer WHERE id = $1",
    values: [req.params.id],
  };
  db.query(query, (err, res) => {
    if (err) {
      return console.error("Error executing query");
    }
  });
  res.status(204).end();
};
//Update by Id
const updateById = (req, res) => {
  const editCustomer = req.body;
  const query = {
    text:
      "UPDATE customer SET firstname=$1, lastname=$2, email=$3, phone=$4 WHERE id = $5",
    values: [
      editCustomer.firstname,
      editCustomer.lastname,
      editCustomer.email,
      editCustomer.phone,
      req.params.id,
    ],
  };
  db.query(query, (err, res) => {
    if (err) {
      return console.error("Error executing query");
    }
  });
  res.json(editCustomer);
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  addCustomer,
  deleteById,
  updateById,
};
