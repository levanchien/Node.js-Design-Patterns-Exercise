const ArrivingState = require("./arriving-state");
const DeliveredState = require("./delivered-state");
const StoredState = require("./stored-state");

module.exports = class WarehouseItem {
  constructor(id) {
    this.id = id;
    this.states = {
      arriving: new ArrivingState(this),
      stored: new StoredState(this),
      delivered: new DeliveredState(this),
    };
    this.state = this.states.arriving;
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
