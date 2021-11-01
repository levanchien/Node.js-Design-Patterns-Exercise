import { createWriteStream } from "fs";
import net from "net";

let streamMap = new Map();

function getWriteStream(filename) {
  if (!streamMap.get(filename)) {
    streamMap.set(filename, createWriteStream(filename));
  }
  return streamMap.get(filename);
}

function demultiplexFile(source) {
  let currentFilename = null;
  let currentFilenameLength = null;
  let currentDataLength = null;
  let writeableStream = null;
  source
    .on("readable", () => {
      let chunk;
      if (currentFilename === null) {
        chunk = source.read(4);
        currentFilenameLength = chunk && chunk.readUInt32BE(0);
        if (!currentFilenameLength) {
          return null;
        }
        currentFilename = source.read(currentFilenameLength).toString();
        if (writeableStream === null) {
          writeableStream = getWriteStream(`uploaded/${currentFilename}`);
        }
      }
      if (currentDataLength === null) {
        chunk = source.read(4);
        currentDataLength = chunk && chunk.readUInt32BE(0);
        if (currentDataLength === null) {
          return null;
        }
      }

      chunk = source.read(currentDataLength);
      if (chunk === null) {
        return null;
      }

      console.log(`Received packet from file: ${currentFilename}`);
      writeableStream.write(chunk);

      currentDataLength = null;
      currentFilenameLength = null;
      currentFilename = null;
      writeableStream = null;
    })
    .on("end", () => {
      console.log("File saved");
      streamMap.forEach((v, k) => {
        v.close();
        v.end();
      });
      streamMap = new Map();
    })
    .on("error", (err) => {});
}

net
  .createServer((socket) => {
    demultiplexFile(socket);
  })
  .listen(3000, () => {
    console.log("Server is started");
  });
