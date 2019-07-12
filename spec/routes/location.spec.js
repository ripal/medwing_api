let request = require("supertest");
let app = require("../../app");
let sinon = require("sinon");
let location = require("../../models/Location");

describe("ROUTE /location", function() {
  describe("GET /", function() {
    // when server error
    it("500 => server error", function(done) {
      sinon.stub(location, "getLocations").resolves({ code: 500 });
      request(app)
        .get("/location")
        .expect(500)
        .end(function(err, res) {
          location.getLocations.restore();
          done();
        });
    });

    // success
    it("200 => success", function(done) {
      sinon.stub(location, "getLocations").resolves({
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
      });
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
          location.getLocations.restore();
          done();
        });
    });
  });

  describe("POST /", function() {
    // when required param missing
    it("400 => required param missing", function(done) {
      sinon.stub(location, "updateLocation").resolves({ code: 400 });
      sinon.stub(location, "addLocation").resolves({ code: 400 });
      request(app)
        .post("/location")
        .expect(400)
        .end(function(err, res) {
          location.updateLocation.restore();
          location.addLocation.restore();
          done();
        });
    });

    // when server error
    it("500 => server error [add]", function(done) {
      sinon.stub(location, "updateLocation").resolves({ code: 500 });
      sinon.stub(location, "addLocation").resolves({ code: 500 });
      request(app)
        .post("/location")
        .send({ title: "test", lat: 22.222222, lng: 22.2222222 })
        .expect(500)
        .end(function(err, res) {
          sinon.assert.calledOnce(location.addLocation);
          sinon.assert.notCalled(location.updateLocation);
          location.updateLocation.restore();
          location.addLocation.restore();
          done();
        });
    });

    // when server error
    it("500 => server error [update]", function(done) {
      sinon.stub(location, "updateLocation").resolves({ code: 500 });
      sinon.stub(location, "addLocation").resolves({ code: 500 });
      request(app)
        .post("/location")
        .send({ id: 5, title: "test", lat: 22.222222, lng: 22.2222222 })
        .expect(500)
        .end(function(err, res) {
          sinon.assert.notCalled(location.addLocation);
          sinon.assert.calledOnce(location.updateLocation);
          location.updateLocation.restore();
          location.addLocation.restore();
          done();
        });
    });

    // success
    it("200 => success [add]", function(done) {
      sinon.stub(location, "updateLocation").resolves({ code: 500 });
      sinon.stub(location, "addLocation").resolves({
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
      });
      request(app)
        .post("/location")
        .send({ title: "test", lat: 22.222222, lng: 22.2222222 })
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
          sinon.assert.calledOnce(location.addLocation);
          sinon.assert.notCalled(location.updateLocation);
          location.updateLocation.restore();
          location.addLocation.restore();
          done();
        });
    });

    // success
    it("200 => success [update]", function(done) {
      sinon.stub(location, "updateLocation").resolves({
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
      });
      sinon.stub(location, "addLocation").resolves({ code: 500 });
      request(app)
        .post("/location")
        .send({ id: 11, title: "test", lat: 22.222222, lng: 22.2222222 })
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
          sinon.assert.notCalled(location.addLocation);
          sinon.assert.calledOnce(location.updateLocation);
          location.updateLocation.restore();
          location.addLocation.restore();
          done();
        });
    });
  });

  describe("DELETE /", function() {
    // required param missing/invalid
    it("400 => required param missing", function(done) {
      sinon.stub(location, "deleteLocation").resolves({ code: 400 });
      request(app)
        .delete("/location/abc")
        .expect(400)
        .end(function(err, res) {
          sinon.assert.notCalled(location.deleteLocation);
          location.deleteLocation.restore();
          done();
        });
    });

    // server error
    it("500 => server error", function(done) {
      sinon.stub(location, "deleteLocation").resolves({ code: 500 });
      request(app)
        .delete("/location/12")
        .expect(500)
        .end(function(err, res) {
          sinon.assert.calledOnce(location.deleteLocation);
          location.deleteLocation.restore();
          done();
        });
    });

    // success
    it("200 => success", function(done) {
      sinon.stub(location, "deleteLocation").resolves({
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
      });
      request(app)
        .delete("/location/12")
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
          sinon.assert.calledOnce(location.deleteLocation);
          location.deleteLocation.restore();
          done();
        });
    });
  });
});
