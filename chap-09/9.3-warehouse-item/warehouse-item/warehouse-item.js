const ArrivingState = require("./arriving-state");
const { STATES } = require("./constants");
const DeliveredState = require("./delivered-state");
const StoredState = require("./stored-state");

module.exports = class WarehouseItem {
  constructor({ id, state, locationId, address }) {
    this.id = id;
    this.locationId = locationId;
    this.address = address;
    this.states = {
      arriving: new ArrivingState(this),
      stored: new StoredState(this),
      delivered: new DeliveredState(this),
    };
    if (!state) {
      this.state = this.states[STATES.ARRIVING];
    } else {
      this.state = this.states[state];
    }
  }

  changeState(state) {
    this.state = this.states[state];
  }

  store(locationId) {
    this.state.store(locationId);
  }

  deliver(address) {
    this.state.deliver(address);
  }

  describe() {
    return this.state.describe();
  }
};
