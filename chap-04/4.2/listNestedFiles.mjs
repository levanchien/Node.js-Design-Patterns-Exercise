import fs from "fs";

export function listNestedFiles(dir, callback) {
  let result = [];
  fs.readdir(dir, (rdErr, files) => {
    if (rdErr) {
      return callback(rdErr);
    }

    if (files.length === 0) {
      return process.nextTick(() => callback(null, result));
    }

    function iterate(index) {
      const path = `${dir}/${files[index]}`;
      fs.stat(path, (sErr, stat) => {
        if (sErr) {
          return callback(sErr);
        }
        if (stat.isFile()) {
          result.push(path);
          if (index === files.length - 1) {
            return callback(null, result);
          }
          iterate(index + 1);
        }
        if (stat.isDirectory()) {
          listNestedFiles(path, (e, r) => {
            if (e) {
              return callback(e);
            }
            result = result.concat(r);
            if (index === files.length - 1) {
              return callback(null, result);
            }
            iterate(index + 1);
          });
        }
      });
    }
    iterate(0);
  });
}

listNestedFiles("../..", (err, files) => {
  if (err) {
    throw new Error(err);
  }

  console.log(files.length + " files");
  console.log(files);
});
