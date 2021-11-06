const { STATES } = require("./warehouse-item/constants");
const WarehouseItem = require("./warehouse-item/warehouse-item");

const warehouseItem = new WarehouseItem({ id: 123456 });
console.log(warehouseItem.describe());
warehouseItem.store("ZZXX100");
console.log(warehouseItem.describe());
warehouseItem.deliver("Le Van Chien, VN");
console.log(warehouseItem.describe());

const warehouseItem2 = new WarehouseItem({
  id: 228888,
  state: STATES.STORED,
  locationId: "TVZY123",
});
console.log(warehouseItem2.describe());

const warehouseItem3 = new WarehouseItem({
  id: 56897,
  state: STATES.DELIVERED,
  address: "Mr Le Van Chien, VN",
});
console.log(warehouseItem3.describe());

/* invalid case */
warehouseItem.deliver("Mr Le Vuong, VN");
