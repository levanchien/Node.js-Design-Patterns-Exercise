import { FindRegex } from "./findRegex.mjs";

const findRegexObject = new FindRegex(/hello \w+/);

findRegexObject
  .addFile("fileA.txt")
  .addFile("fileB.json")
  .find()
  .on("start", () => {
    console.log("Start...");
  })
  .on("found", (file, elemen) =>
    console.log(`Found regex "${elemen}" on file: ${file}`)
  )
  .on("error", (err) => console.log("Error: ", err));
