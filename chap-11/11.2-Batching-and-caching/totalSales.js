import level from "level";
import sublevel from "subleveldown";

const db = level("example-db");
const salesDb = sublevel(db, "sales", { valueEncoding: "json" });

export function totalSales(product, done) {
  const now = Date.now();
  let sum = 0;
  salesDb
    .createValueStream()
    .on("data", (transaction) => {
      if (!product || transaction.product === product) {
        sum += transaction.amount;
      }
    })
    .on("end", () => {
      console.log(`totalSales() took: ${Date.now() - now}ms`);
      done(null, sum);
    })
    .on("error", (error) => {
      done(error);
    });
}
