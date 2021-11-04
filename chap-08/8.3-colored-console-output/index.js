const { createColoredConsole } = require("./colored-console-output");

const corloredConsole = createColoredConsole(console);
corloredConsole.red("yellow", "green");
corloredConsole.yellow("green", "red");
corloredConsole.green("red", "yellow");
