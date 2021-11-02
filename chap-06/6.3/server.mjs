import { createWriteStream } from "fs";
import net from "net";

net
  .createServer((socket) => {
    let streamMap = new Map();
    socket
      .on("close", () => {
        console.log("File saved");
        process.nextTick(() => {
          streamMap.forEach((writeStream, file) => writeStream.end());
          streamMap = new Map();
        });
      })
      .on("data", (chunk) => {
        const filenameLength = chunk.readUInt8(0);
        const filename = chunk.slice(1, filenameLength + 1).toString();
        if (!filename) return;

        const data = chunk.slice(1 + filenameLength);
        if (!data) return;

        let writeStream = streamMap.get(filename);
        if (!writeStream) {
          writeStream = createWriteStream(`uploaded/${filename}`).on(
            "close",
            () => {
              console.log("Saved file: " + filename);
            }
          );
          streamMap.set(filename, writeStream);
        }
        writeStream.write(data);
      })
      .on("error", (err) => {
        console.log(err);
      });
  })
  .listen(3000, () => {
    console.log("Server is started");
  });
