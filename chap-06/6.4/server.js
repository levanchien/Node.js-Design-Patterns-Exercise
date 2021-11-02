const fs = require("fs");
const http = require("http");
const { Readable } = require("stream");
const { clearInterval } = require("timers");
const colors = require("colors");

const root = "data";
const files = fs.readdirSync(root);

const colorsOptions = [
  "red",
  "yellow",
  "green",
  "blue",
  "magenta",
  "cyan",
  "white",
];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function colorfy(data) {
  return colors[colorsOptions[getRandomInt(colorsOptions.length)]](data);
}

http
  .createServer((req, res) => {
    if (
      req.headers &&
      req.headers["user-agent"] &&
      !req.headers["user-agent"].includes("curl")
    ) {
      res.writeHead(302, {
        Location:
          "https://github.com/levanchien/Node.js-Design-Patterns-Exercise/tree/master/chap-06/6.4",
      });
      return res.end();
    }

    const stream = new Readable();
    stream._read = function noop() {};
    stream.pipe(res);
    let fileIndex = 0;

    const inteval = setInterval(() => {
      if (++fileIndex > files.length) {
        fileIndex = 1;
      }
      const data = fs.readFileSync(`${root}/${files[fileIndex - 1]}`);
      stream.push("\033[2J\033[3J\033[H");
      stream.push(colorfy(data.toString()));
    }, 500);

    req.on("close", () => {
      console.log("Close request");
      clearInterval(inteval);
    });
  })
  .listen(3000, () => {
    console.log("Server started");
  });
