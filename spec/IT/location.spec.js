let LocationTble = require("../../database/Location_Table");
let sinon = require("sinon");
let request = require("supertest");
let app = require("../../app");

describe("Integration Test => ROUTE /location", function() {
  describe("GET /", function() {
    it("1. returns 500", function(done) {
      sinon.stub(LocationTble, "fetchAll").resolves(null);

      request(app)
        .get("/location")
        .expect(500)
        .end(function(err, res) {
          sinon.assert.calledOnce(LocationTble.fetchAll);
          LocationTble.fetchAll.restore();
          done();
        });
    });

    it("2. returns 200", function(done) {
      sinon.stub(LocationTble, "fetchAll").resolves([
        {
          id: 11,
          title: "test 1223333",
          lat: 50.1109221,
          lng: 8.6821267,
          created_at: "2019-07-10T09:10:58.000Z",
          updated_at: "2019-07-10T09:23:01.000Z"
        }
      ]);

      request(app)
        .get("/location")
        .expect(200, {
          data: [
            {
              id: 11,
              title: "test 1223333",
              lat: 50.1109221,
              lng: 8.6821267,
              created_at: "2019-07-10T09:10:58.000Z",
              updated_at: "2019-07-10T09:23:01.000Z"
            }
          ]
        })
        .end(function(err, res) {
          sinon.assert.calledOnce(LocationTble.fetchAll);
          LocationTble.fetchAll.restore();
          done();
        });
    });
  });

  describe("PUT / [add]", function() {
    it("1. returns 400", function(done) {
      sinon.stub(LocationTble, "forge").returns({
        save: sinon.stub().resolves(null)
      });

      request(app)
        .post("/location")
        .expect(400)
        .end(function(err, res) {
          sinon.assert.notCalled(LocationTble.forge);
          LocationTble.forge.restore();
          done();
        });
    });

    it("2. returns 500", function(done) {
      sinon.stub(LocationTble, "forge").returns({
        save: sinon.stub().resolves(null)
      });

      request(app)
        .post("/location")
        .send({ title: "test", lat: 22.222222, lng: 22.2222222 })
        .expect(500)
        .end(function(err, res) {
          sinon.assert.calledOnce(LocationTble.forge);
          LocationTble.forge.restore();
          done();
        });
    });

    it("3. returns 200", function(done) {
      sinon.stub(LocationTble, "forge").returns({
        save: sinon.stub().resolves(true)
      });
      sinon.stub(LocationTble, "fetchAll").resolves([
        {
          id: 11,
          title: "test 1223333",
          lat: 50.1109221,
          lng: 8.6821267,
          created_at: "2019-07-10T09:10:58.000Z",
          updated_at: "2019-07-10T09:23:01.000Z"
        }
      ]);

      request(app)
        .post("/location")
        .send({ title: "test", lat: 22.222222, lng: 22.2222222 })
        .expect(200)
        .end(function(err, res) {
          LocationTble.forge.restore();
          LocationTble.fetchAll.restore();
          done();
        });
    });
  });

  describe("PUT / [update]", function() {
    it("1. returns 500", function(done) {
      sinon.stub(LocationTble, "where").returns({
        fetch: sinon.stub().resolves({ save: sinon.stub().resolves(false) })
      });

      request(app)
        .post("/location")
        .send({ id: 11, title: "test", lat: 22.222222, lng: 22.2222222 })
        .expect(500)
        .end(function(err, res) {
          sinon.assert.calledOnce(LocationTble.where);
          LocationTble.where.restore();
          done();
        });
    });

    it("2. returns 200", function(done) {
      sinon.stub(LocationTble, "where").returns({
        fetch: sinon.stub().resolves({ save: sinon.stub().resolves(true) })
      });
      sinon.stub(LocationTble, "fetchAll").resolves([
        {
          id: 11,
          title: "test 1223333",
          lat: 50.1109221,
          lng: 8.6821267,
          created_at: "2019-07-10T09:10:58.000Z",
          updated_at: "2019-07-10T09:23:01.000Z"
        }
      ]);

      request(app)
        .post("/location")
        .send({ id: 11, title: "test", lat: 22.222222, lng: 22.2222222 })
        .expect(200)
        .end(function(err, res) {
          sinon.assert.calledOnce(LocationTble.where);
          sinon.assert.calledOnce(LocationTble.fetchAll);
          LocationTble.where.restore();
          LocationTble.fetchAll.restore();
          done();
        });
    });
  });

  describe("DELETE /", function() {
    it("1. returns 400", function(done) {
      sinon.stub(LocationTble, "where").returns({
        destroy: sinon.stub().resolves(null)
      });

      request(app)
        .delete("/location/abc")
        .expect(400)
        .end(function(err, res) {
          sinon.assert.notCalled(LocationTble.where);
          LocationTble.where.restore();
          done();
        });
    });

    it("2. returns 500", function(done) {
      sinon.stub(LocationTble, "where").returns({
        destroy: sinon.stub().resolves(false)
      });
      sinon.stub(LocationTble, "fetchAll").resolves([]);

      request(app)
        .delete("/location/12")
        .expect(500)
        .end(function(err, res) {
          sinon.assert.calledOnce(LocationTble.where);
          sinon.assert.notCalled(LocationTble.fetchAll);
          LocationTble.where.restore();
          LocationTble.fetchAll.restore();
          done();
        });
    });

    it("3. returns 200", function(done) {
      sinon.stub(LocationTble, "where").returns({
        destroy: sinon.stub().resolves(true)
      });
      sinon.stub(LocationTble, "fetchAll").resolves([]);

      request(app)
        .delete("/location/12")
        .expect(200)
        .end(function(err, res) {
          sinon.assert.calledOnce(LocationTble.where);
          sinon.assert.calledOnce(LocationTble.fetchAll);
          LocationTble.where.restore();
          LocationTble.fetchAll.restore();
          done();
        });
    });
  });
});
