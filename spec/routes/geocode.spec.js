let request = require("supertest");
let app = require("../../app");
let sinon = require("sinon");
let Geocoder = require("../../models/Geocoder");

describe("ROUTE /geocode", function() {
  describe("GET /", function() {
    // when param missing
    it("400 => required param missing", function(done) {
      sinon.stub(Geocoder, "getLatLongFromAddress").resolves({ code: 500 });
      request(app)
        .get("/geocode")
        .expect(400)
        .end(function(err, res) {
          sinon.assert.notCalled(Geocoder.getLatLongFromAddress);
          Geocoder.getLatLongFromAddress.restore();
          done();
        });
    });

    // when server error
    it("500 => server error", function(done) {
      sinon.stub(Geocoder, "getLatLongFromAddress").resolves({ code: 500 });
      request(app)
        .get("/geocode")
        .query({ address: "Test" })
        .expect(500)
        .end(function(err, res) {
          sinon.assert.calledOnce(Geocoder.getLatLongFromAddress);
          Geocoder.getLatLongFromAddress.restore();
          done();
        });
    });

    // when success
    it("200 => success", function(done) {
      sinon.stub(Geocoder, "getLatLongFromAddress").resolves({
        data: [
          {
            formattedAddress: "8936165 Jamaica Ave, Jamaica, NY 11432, USA",
            latitude: 40.7062883,
            longitude: -73.79249519999999,
            provider: "google"
          }
        ]
      });
      request(app)
        .get("/geocode")
        .query({ address: "Test" })
        .expect(200, {
          data: [
            {
              formattedAddress: "8936165 Jamaica Ave, Jamaica, NY 11432, USA",
              latitude: 40.7062883,
              longitude: -73.79249519999999,
              provider: "google"
            }
          ]
        })
        .end(function(err, res) {
          sinon.assert.calledOnce(Geocoder.getLatLongFromAddress);
          Geocoder.getLatLongFromAddress.restore();
          done();
        });
    });
  });
});
