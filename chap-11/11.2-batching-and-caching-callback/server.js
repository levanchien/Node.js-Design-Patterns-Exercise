import { createServer } from "http";
// import { totalSales } from "./totalSales.js";
// import { totalSales } from "./totalSalesBatch.js";
import { totalSales } from "./totalSalesCache.js";

createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");
  const product = url.searchParams.get("product");
  console.log(`Processing query: ${url.search}`);

  totalSales(product, (err, sum) => {
    if (err) {
      res.setHeader("Content-Type", "application/json");
      res.writeHead(500);
      res.end(
        JSON.stringify({
          error: "Internal server error",
        })
      );
      return;
    }
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(
      JSON.stringify({
        product,
        sum,
      })
    );
  });
}).listen(8000, () => console.log("Server started"));
