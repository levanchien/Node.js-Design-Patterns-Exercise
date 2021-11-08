import vm from "vm";

process.on("message", ({ code }) => {
  try {
    const result = vm.runInNewContext(code);
    process.send({ event: "done", data: result });
  } catch (error) {
    console.log(error.toString());
    process.send({ event: "error", data: error.message });
  }
});

process.send("ready");
