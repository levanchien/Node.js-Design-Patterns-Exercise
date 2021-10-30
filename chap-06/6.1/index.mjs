import fs from "fs";
import { PassThrough } from "stream";
import zlib from "zlib";

function Logger(label) {
  this.label = label;
  this.start = 0;
  this.end = 0;
  this.initalSize = 0;
  this.compressedSize = 0;
}

const compareTable = [];
const inputs = [
  {
    type: "gzip",
    logger: new Logger("gzip"),
    stream: zlib.createGzip(),
  },
  {
    type: "brotli",
    logger: new Logger("brotli"),
    stream: zlib.createBrotliCompress(),
  },
  {
    type: "deflate",
    logger: new Logger("deflate"),
    stream: zlib.createDeflate(),
  },
];
let done = 0;
const overFlow = () => PassThrough({ highWaterMark: Number.MAX_SAFE_INTEGER });
function onOpen(log) {
  console.log("Start proccess of: " + log.label + "...");
  log.start = new Date().getTime();
}
function onClose(log, zipFile) {
  log.end = new Date().getTime();
  log.timeExecuted = `${log.end - log.start} (ms)`;
  log.initalSize = (fs.statSync(sourceFile).size / 1024).toFixed(2) + ` (kB)`;
  log.compressedSize = (fs.statSync(zipFile).size / 1024).toFixed(2) + ` (kB)`;
  compareTable.push(log);
  if (++done === inputs.length) {
    console.table(compareTable, [
      "label",
      "timeExecuted",
      "initalSize",
      "compressedSize",
    ]);
  }
}
const sourceFile = process.argv[2];
const readStream = fs.createReadStream(sourceFile);
inputs.forEach((input) =>
  readStream
    .on("open", () => onOpen(input.logger))
    .pipe(overFlow())
    .pipe(input.stream)
    .on("close", () => {
      console.log("Done: " + input.logger.label);
    })
    .pipe(fs.createWriteStream(`${sourceFile}.${input.type}.zip`))
    .on("close", () => onClose(input.logger, `${sourceFile}.${input.type}.zip`))
);
