const WarehouseItemState = require("./warehouse-item-state");
const { STATES } = require("./constants");

module.exports = class ArrivingState extends WarehouseItemState {
  constructor(warehouseItem) {
    super();
    this.warehouseItem = warehouseItem;
  }

  store(locationId) {
    this.warehouseItem.locationId = locationId;
    this.warehouseItem.changeState(STATES.STORED);
  }

  deliver() {
    throw new Error(`Your item is not stored in warehouse !`);
  }

  describe() {
    return `Item ${this.warehouseItem.id} is on its way to the warehouse.`;
  }
};
