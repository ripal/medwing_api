let LocationTble = require("../../database/Location_Table");
let Location = require("../../models/Location");
let sinon = require("sinon");

describe("models => Location => ", function() {
  describe("getLocation method =>", function() {
    it("1. returns 500 upon error", function(done) {
      sinon.stub(LocationTble, "fetchAll").resolves(null);

      Location.getLocations().then(result => {
        sinon.assert.calledOnce(LocationTble.fetchAll);
        expect(result).toEqual({ code: 500 });
        LocationTble.fetchAll.restore();
        done();
      });
    });

    it("2. returns valid data upon success", function(done) {
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

      Location.getLocations().then(result => {
        sinon.assert.calledOnce(LocationTble.fetchAll);
        expect(result).toEqual({
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
        LocationTble.fetchAll.restore();
        done();
      });
    });
  });

  describe("addLocation method =>", function() {
    it("1. returns 500 upon error", function(done) {
      sinon.stub(LocationTble, "forge").returns({
        save: sinon.stub().resolves(null)
      });

      Location.addLocation({
        title: "test 1223333",
        lat: 50.1109221,
        lng: 8.6821267
      }).then(result => {
        sinon.assert.calledOnce(LocationTble.forge);
        expect(result).toEqual({ code: 500 });
        LocationTble.forge.restore();
        done();
      });
    });

    it("2. returns valid data upon success", function(done) {
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

      Location.addLocation({
        title: "test 1223333",
        lat: 50.1109221,
        lng: 8.6821267
      }).then(result => {
        sinon.assert.calledOnce(LocationTble.forge);
        sinon.assert.calledOnce(LocationTble.fetchAll);
        expect(result).toEqual({
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
        LocationTble.forge.restore();
        LocationTble.fetchAll.restore();
        done();
      });
    });
  });

  describe("updateLocation method =>", function() {
    it("1. returns 500 upon error", function(done) {
      sinon.stub(LocationTble, "where").returns({
        fetch: sinon.stub().resolves({ save: sinon.stub().resolves(false) })
      });

      Location.updateLocation(11, {
        id: 11,
        title: "test 1223333",
        lat: 50.1109221,
        lng: 8.6821267,
        created_at: "2019-07-10T09:10:58.000Z",
        updated_at: "2019-07-10T09:23:01.000Z"
      }).then(result => {
        sinon.assert.calledOnce(LocationTble.where);
        expect(result).toEqual({ code: 500 });
        LocationTble.where.restore();
        done();
      });
    });

    it("2. returns valid data upon success", function(done) {
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

      Location.updateLocation(11, {
        id: 11,
        title: "test 1223333",
        lat: 50.1109221,
        lng: 8.6821267,
        created_at: "2019-07-10T09:10:58.000Z",
        updated_at: "2019-07-10T09:23:01.000Z"
      }).then(result => {
        sinon.assert.calledOnce(LocationTble.where);
        sinon.assert.calledOnce(LocationTble.fetchAll);
        expect(result).toEqual({
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
        LocationTble.where.restore();
        LocationTble.fetchAll.restore();
        done();
      });
    });
  });

  describe("deleteLocation method =>", function() {
    it("1. returns 500 upon error", function(done) {
      sinon.stub(LocationTble, "where").returns({
        destroy: sinon.stub().resolves(null)
      });

      Location.deleteLocation(11).then(result => {
        sinon.assert.calledOnce(LocationTble.where);
        expect(result).toEqual({ code: 500 });
        LocationTble.where.restore();
        done();
      });
    });

    it("2. returns valid data upon success", function(done) {
      sinon.stub(LocationTble, "where").returns({
        destroy: sinon.stub().resolves(true)
      });
      sinon.stub(LocationTble, "fetchAll").resolves([]);

      Location.deleteLocation(11).then(result => {
        sinon.assert.calledOnce(LocationTble.where);
        sinon.assert.calledOnce(LocationTble.fetchAll);
        expect(result).toEqual({
          data: []
        });
        LocationTble.where.restore();
        LocationTble.fetchAll.restore();
        done();
      });
    });
  });
});
