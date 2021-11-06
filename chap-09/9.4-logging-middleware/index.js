const Logger = require("./logger");
const timestampedMiddleware = require("./middlewares/timestamped-middleware");
const coloredMiddleware = require("./middlewares/colored-middleware");
const toConsoleMiddleware = require("./middlewares/to-console-middleware");
const toFileMiddleware = require("./middlewares/to-file-middleware");

const logger = new Logger();
logger
  .use(timestampedMiddleware)
  .use(coloredMiddleware("green"))
  .use(toConsoleMiddleware("log"))
  .use(function (message) {
    /* remove colors on message */
    return `${message}`.replace(
      /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
      ""
    );
  })
  .use(toFileMiddleware("logs/test.log"));

logger.log("This is a test message");
