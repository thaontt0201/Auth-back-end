const chai = require("chai");
const chaihttp = require("chai-http");
const app = require("../index");
const query = require("../db/customers");
const should = chai.should();

chai.use(chaihttp);

describe("/POST customer", () => {
  beforeEach((done) => {
    query.deleteAllCustomers();
    done();
  });

  it("Add new customer", (done) => {
    chai
      .request(app)
      .post("/api/customers")
      .set("Content-Type", "application/json")
      .send(JSON.stringify(testCustomer))
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("firstname");
        done();
      });
  });
});

const testCustomer = {
  firstname: "Vinh",
  lastname: "Nguyen",
  email: "vinh@nguyen.com",
  phone: "789456123",
};
