import fs from "fs";

function listNestedFiles(dir, keyword, cb) {
  let list = [];
  fs.readdir(dir, (rdError, files) => {
    if (rdError) {
      return cb(rdError);
    }

    let index = files.length;
    if (!index) {
      return cb(null, list);
    }

    for (const f of files) {
      const path = dir + "/" + f;
      fs.stat(path, (sError, stats) => {
        if (sError) {
          return cb(sError);
        }
        if (stats.isDirectory()) {
          listNestedFiles(path, keyword, (err, res) => {
            if (err) {
              return cb(err);
            }
            list = list.concat(res);
            if (!--index) {
              return cb(null, list);
            }
          });
        } else {
          fs.readFile(path, { encoding: "utf-8" }, (rError, content) => {
            if (rError) {
              return cb(rError);
            }
            if (content.includes(keyword)) {
              list.push(path);
            }
            if (!--index) {
              return cb(null, list);
            }
          });
        }
      });
    }
  });
}

listNestedFiles("../.", "king", (error, list) => {
  if (error) {
    throw new Error(error);
  }
  console.log(list);
});
