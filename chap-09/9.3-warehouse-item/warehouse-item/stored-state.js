const WarehouseItemState = require("./warehouse-item-state");
const { STATES } = require("./constants");

module.exports = class StoredState extends WarehouseItemState {
  constructor(warehouseItem) {
    super();
    this.warehouseItem = warehouseItem;
  }

  store() {
    throw new Error(`Your item is already stored in warehouse !`);
  }

  deliver(address) {
    this.warehouseItem.locationId = null;
    this.warehouseItem.address = address;
    this.warehouseItem.changeState(STATES.DELIVERED);
  }

  describe() {
    return `Item ${this.warehouseItem.id} is stored in location ${this.warehouseItem.locationId}."`;
  }
};
