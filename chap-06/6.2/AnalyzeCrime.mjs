import { Transform } from "stream";

export class AnalyzeCrime extends Transform {
  constructor(
    analyzeBy,
    order,
    limit,
    analyze = (t) => t.toString(),
    options = {}
  ) {
    options.objectMode = true;
    super(options);
    this.analyzeBy = analyzeBy;
    this.data = new Map();
    this.order = order;
    this.limit = limit;
    this.analyze = analyze;
  }

  _transform(record, enc, cb) {
    const key =
      typeof this.analyzeBy === "function"
        ? this.analyzeBy(record)
        : record[this.analyzeBy];
    const value = Number.parseInt(record.value) || 0;
    const existedValue = this.data.get(key);
    if (existedValue) {
      this.data.set(key, existedValue + value);
    } else {
      this.data.set(key, value);
    }
    cb();
  }

  _flush(cb) {
    this.push(this.analyze(this.proccessData()));
    cb();
  }

  proccessData() {
    const results = [];
    this.data.forEach((value, key) => {
      results.push({
        key,
        value,
      });
    });
    if (this.order) {
      const order = this.order;
      results.sort((a, b) =>
        order === "asc" ? a.value - b.value : b.value - a.value
      );
    }

    return this.limit ? results.slice(0, this.limit) : results;
  }
}
