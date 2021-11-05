const WarehouseItemState = require("./warehouse-item-state");

module.exports = class DeliveredState extends WarehouseItemState {
  constructor(warehouseItem) {
    super();
    this.warehouseItem = warehouseItem;
  }

  store() {
    throw new Error(`Your item has been delivered !`);
  }

  deliver() {
    throw new Error(`Your item has been delivered !`);
  }

  describe() {
    return `Item ${this.warehouseItem.id} was delivered to ${this.warehouseItem.address}."`;
  }
};
