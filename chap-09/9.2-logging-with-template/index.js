const ConsoleLogger = require("./console-logger");
const FileLogger = require("./file-logger");

const consoleLogger = new ConsoleLogger();
consoleLogger.info([1, 2, 3]);
consoleLogger.debug("debug", "debug1");
consoleLogger.warn("warn", "warn1");
consoleLogger.error("error", "error1");

const fileLogger = new FileLogger();
fileLogger.info([1, 2, 3]);
fileLogger.debug("debug", "debug1");
fileLogger.warn("warn", "warn1");
fileLogger.error("error", "error1");
