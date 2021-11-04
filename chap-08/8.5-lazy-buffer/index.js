const { createLazyBuffer } = require("./lazy-buffer");

const lazyBuffer = createLazyBuffer();

/* Try some props */

console.log(lazyBuffer.length);

lazyBuffer.write("Trieu Van");
console.log(lazyBuffer.length);
console.log(lazyBuffer.slice(0, 5).toString());

const buffer = Buffer.alloc(lazyBuffer.length);
console.log(buffer.toString());
lazyBuffer.copy(buffer, 0);
console.log(buffer.toString());
