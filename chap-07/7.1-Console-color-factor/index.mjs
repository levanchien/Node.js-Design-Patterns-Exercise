export class ColorConsole {
  log() {}
}

export class RedConsole extends ColorConsole {
  log(str) {
    console.log("\x1b[31m", str);
  }
}

export class BlueConsole extends ColorConsole {
  log(str) {
    console.log("\x1b[34m", str);
  }
}

export class GreenConsole extends ColorConsole {
  log(str) {
    console.log("\x1b[32m", str);
  }
}

export function createColorConsole(color) {
  switch (color) {
    case "red":
      return new RedConsole();
    case "blue":
      return new BlueConsole();
    case "green":
      return new GreenConsole();
    default:
      break;
  }
}

(function test() {
  let colorConsole = createColorConsole("red");
  colorConsole.log("This is red color !");

  colorConsole = createColorConsole("blue");
  colorConsole.log("This is blue color !");

  colorConsole = createColorConsole("green");
  colorConsole.log("This is green color !");
})();
