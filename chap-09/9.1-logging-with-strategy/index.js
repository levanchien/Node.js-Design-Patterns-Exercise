const Logger = require("./logger");
const { createTimestampedLogger } = require("./timestamped-log");
const { consoleStrategy } = require("./console-strategy");
const { fileStrategy } = require("./file-strategy");

const consoleLogger = createTimestampedLogger(new Logger(consoleStrategy));
consoleLogger.info([1, 2, 3]);
consoleLogger.debug("debug", "debug1");
consoleLogger.warn("warn", "warn1");
consoleLogger.error("error", "error1");

const fileLogger = createTimestampedLogger(new Logger(fileStrategy));
fileLogger.info("info", "info1");
fileLogger.debug("debug", "debug1");
fileLogger.warn("warn", "warn1");
fileLogger.error("error", "error1");
