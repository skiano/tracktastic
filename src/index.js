const fs = require('fs');
const path = require('path');
const util = require('util');
const report = require('./report');
const logFile = require('./logFile');
const timestamp = require('./timestamp');
const getOptions = require('./getOptions');

const writeFile = util.promisify(fs.writeFile);
const LOG_NAME = '.tracktastic';

exports.ingest = async (folder, marks) => {
  const options = getOptions(folder).ingest;
  const now = timestamp.create();
  const log = path.resolve(folder, LOG_NAME);
  const data = Array.isArray(marks) ? marks : [marks];
  const dataWithTime = data.map(m => Object.assign(m, { time: now }))
  await logFile.append(log, dataWithTime, options);
};

exports.report = async (folder) => {
  const options = getOptions(folder).report;
  const log = path.resolve(folder, LOG_NAME);
  const out = path.resolve(folder, 'README.md');
  const dataSet = await logFile.read(log);
  await writeFile(out, report(dataSet, options));
};
