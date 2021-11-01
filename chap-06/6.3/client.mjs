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
      console.log("Sent: " + outBuff.length + " bytes");
      cb();
    },
  });
}

const socket = net.connect(3000, () => {
  files.forEach((file) =>
    createReadStream(file)
      .pipe(addHeader(file))
      .pipe(socket)
      .on("end", () => {
        console.log("File uploaded");
      })
      .on("error", (err) => {
        console.log(err);
      })
  );
});
