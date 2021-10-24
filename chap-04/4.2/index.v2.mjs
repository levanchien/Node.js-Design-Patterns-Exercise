import fs from "fs";

function listNestedFiles(dir, cb) {
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
          listNestedFiles(path, (err, res) => {
            if (err) {
              return cb(err);
            }
            list = list.concat(res);
            if (!--index) {
              return cb(null, list);
            }
          });
        } else {
          list.push(path);
          if (!--index) {
            return cb(null, list);
          }
        }
      });
    }
  });
}

listNestedFiles(".", (err, list) => {
  if (err) {
    throw new Error(err);
  }
  console.log(list);
});
