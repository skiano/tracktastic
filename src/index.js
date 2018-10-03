const fs = require('fs');
const util = require('util');
const logFile = require('./logFile');
const timestamp = require('./timestamp');
const report = require('./report');

const writeFile = util.promisify(fs.writeFile);

exports.ingest = async (logFilePath, marks) => {
  const now = timestamp.create();
  await logFile.append(logFilePath, marks.map(m => {
    return Object.assign(m, {
      time: now,
    });
  }));
};

exports.report = async (logFilePath, reportFilePath, options) => {
  const dataSet = await logFile.read(logFilePath);
  await writeFile(reportFilePath, report(dataSet, options));
};
