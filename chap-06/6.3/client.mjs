import { createReadStream } from "fs";
import net from "net";
import path from "path";

const files = process.argv.slice(2).map((t) => path.basename(t));

const socket = net.connect(3000, () => {
  let uploaded = 0;
  files.forEach((file) => {
    (function proccess() {
      const filename = path.basename(file);
      createReadStream(file, {
        highWaterMark: 64 * 1024 - 1 - file.length,
      })
        .on("readable", function () {
          let chunk = null;
          while ((chunk = this.read()) !== null) {
            const outBuff = Buffer.alloc(1 + filename.length + chunk.length);
            outBuff.writeUInt8(filename.length, 0);
            Buffer.from(filename).copy(outBuff, 1);
            chunk.copy(outBuff, 1 + filename.length);
            socket.write(outBuff);
          }
        })
        /*
          incoming data: 64 * 1024 + 1 + file.length = 65537 + file.length
          the limit of writing to socket - highWaterMark: 64 * 1024 = 65536
          => backpressure = 65537 + file.length - 65536 = 1 + file.length
        */
        .on("end", () => {
          console.log("Uploaded " + filename);
          if (++uploaded === files.length) {
            socket.end();
          }
        })
        .on("error", (err) => {
          console.log(err);
        });
    })();
  });
});
