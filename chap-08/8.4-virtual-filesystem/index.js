const { createFSAdapter } = require("./virtual-filesystem");

const store = new Map();
store.set("file.txt", "Hello");

const fs = createFSAdapter(store);

fs.writeFile("file.txt", " world", (err, result) => {
  console.log("Saved");
});

fs.readFile("file.txt", (err, res) => {
  if (err) {
    return console.error(err);
  }
  console.log(res);
});

fs.readFile("missing.txt", (err, res) => {
  if (err) {
    return console.error(err);
  }
});
