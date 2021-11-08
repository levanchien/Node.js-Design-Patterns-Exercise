import http from "http";

const req = http.request(
  "http://localhost:8000",
  {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
    },
  },
  (res) => {
    let response = "";
    res
      .on("data", (chunk) => {
        response += chunk.toString();
      })
      .on("end", (chunk) => {
        response += chunk ? chunk.toString() : "";
        console.log("Server response: " + response);
      })
      .on("error", (error) => {
        console.log("Server response error: " + error);
      });
  }
);

req.on("error", (e) => {
  console.error(`problem with request: ${e.message}`);
});
req.write("1 + 1");
req.end();
