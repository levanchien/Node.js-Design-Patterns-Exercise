const WarehouseItem = require("./warehouse-item/warehouse-item");

/* Valida case */
const warehouseItem = new WarehouseItem(123456);
console.log(warehouseItem.describe());
warehouseItem.store("ZZXX100");
console.log(warehouseItem.describe());
warehouseItem.deliver("Le Van Chien, VN");
console.log(warehouseItem.describe());

/* Invalida case */
const warehouseItem2 = new WarehouseItem(228888);
console.log(warehouseItem2.describe());

warehouseItem2.deliver("Le Van Chien, VN");
console.log(warehouseItem2.describe());
