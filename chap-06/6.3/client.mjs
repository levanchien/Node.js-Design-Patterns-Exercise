import { createReadStream } from "fs";
import net from "net";
import { Transform } from "stream";
import path from "path";

const files = process.argv.slice(2).map((t) => path.basename(t));

function addHeader(str = "") {
  return new Transform({
    transform(chunk, ec, cb) {
      const outBuff = Buffer.alloc(4 + 4 + str.length + chunk.length);
      outBuff.writeUInt32BE(str.length, 0);
      Buffer.from(str).copy(outBuff, 4);
      outBuff.writeUInt32BE(chunk.length, 4 + str.length);
      chunk.copy(outBuff, 8 + str.length);
      this.push(outBuff);
      cb();
    },
  });
}

const socket = net.connect(3000, () => {
  let done = 0;
  files.forEach((file) => {
    console.log(file);
    createReadStream(file)
      .pipe(addHeader(file))
      .on("readable", function () {
        let chunk = null;
        while ((chunk = this.read()) !== null) {
          socket.write(chunk);
        }
      })
      .on("end", () => {
        console.log("File uploaded");
        if (++done === files.length) {
          console.log("end");
          socket.end();
        }
      })
      .on("error", (err) => {
        console.log(err);
      });
  });
});
