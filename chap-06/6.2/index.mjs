import { createReadStream } from "fs";
import parse from "csv-parse";
import { AnalyzeCrime } from "./AnalyzeCrime.mjs";

const requests = [
  {
    analyzeBy: "year",
    analyze: (results) => {
      let str = "";
      results
        .sort((a, b) => Number.parseInt(a.key) - Number.parseInt(b.key))
        .forEach((t) => {
          str += `${t.key} - ${t.value} (crimes)\n`;
        });
      return `Number of crimes over years: \n${str}\n`;
    },
  },
  {
    analyzeBy: "borough",
    limit: 10,
    order: "desc",
    analyze: (results) => {
      let str = "";
      results.forEach((t, index) => {
        str += `${index + 1}. ${t.key} - ${t.value} (crimes)\n`;
      });
      return `The most dangerous areas of London: \n${str}\n`;
    },
  },
  {
    analyzeBy: (record) => {
      return `${record.borough}:${record.major_category}`;
    },
    order: "desc",
    analyze: (results) => {
      let str = "";
      let index = 1;
      results.forEach((t) => {
        if (!str.includes(t.key.split(":")[0])) {
          str += `${index++}. ${t.key.split(":")[0]} - ${
            t.key.split(":")[1]
          } - ${t.value} (crimes)\n`;
        }
      });
      return `The most common crime per area: \n${str}\n`;
    },
  },
  {
    analyzeBy: (record) => {
      return `${record.borough}:${record.major_category}`;
    },
    order: "asc",
    analyze: (results) => {
      let str = "";
      let index = 1;
      results.forEach((t) => {
        if (!str.includes(t.key.split(":")[0])) {
          str += `${index++}. ${t.key.split(":")[0]} - ${
            t.key.split(":")[1]
          } - ${t.value} (crimes)\n`;
        }
      });
      return `The least common crime: \n${str}\n`;
    },
  },
];

const csvParser = parse({ columns: true });
const source = createReadStream(process.argv[2]).pipe(csvParser);

requests.forEach((request) =>
  source
    .pipe(
      new AnalyzeCrime(
        request.analyzeBy,
        request.order,
        request.limit,
        request.analyze
      )
    )
    .pipe(process.stdout)
);
