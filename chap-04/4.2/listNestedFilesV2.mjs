import fs from "fs";

function listNestedFiles(dir, callback) {
  let result = [];
  fs.readdir(dir, (rdErr, files) => {
    if (rdErr) {
      return callback(rdErr);
    }

    if (files.length === 0) {
      return process.nextTick(() => callback(null, result));
    }

    let length = 0;

    /* index loop quá nhanh dẫn đến  khi check thì index luôn === files.length */
    for (let index = 0; index < files.length; index++) {
      const path = `${dir}/${files[index]}`;
      fs.stat(path, (sErr, stat) => {
        if (sErr) {
          return callback(sErr);
        }
        if (stat.isFile()) {
          result.push(path);
          if (++length === files.length) {
            return callback(null, result);
          }
        }
        if (stat.isDirectory()) {
          listNestedFiles(path, (e, r) => {
            if (e) {
              return callback(e);
            }
            result = result.concat(r);
            if (++length === files.length) {
              return callback(null, result);
            }
          });
        }
      });
    }
  });
}

listNestedFiles("../..", (err, files) => {
  if (err) {
    throw new Error(err);
  }

  console.log(files.length + " files");
  console.log(files);
});
