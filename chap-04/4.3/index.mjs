import fs from "fs";

function listNestedFiles(dir, keyword, callback) {
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
          fs.readFile(path, (rfErr, content) => {
            if (rfErr) {
              return callback(rfErr);
            }

            if (content.includes(keyword)) {
              result.push(path);
            }
            if (index === files.length - 1) {
              return callback(null, result);
            }
            iterate(index + 1);
          });
        }
        if (stat.isDirectory()) {
          listNestedFiles(path, keyword, (e, r) => {
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

listNestedFiles("../..", "king", (e, r) => {
  if (e) {
    throw new Error(e);
  }
  console.log(r);
});
