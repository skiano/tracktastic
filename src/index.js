const fs = require('fs');
const path = require('path');
const util = require('util');
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

  const finnessedMarks = data.map((mark) => {
    const type = options.createType(mark);

    return {
      time: now,
      name: options.createName(mark.name, type),
      unit: options.createUnit(mark.unit, type),
      value: options.createValue(mark.value, type),
    };
  });

  await logFile.append(log, finnessedMarks);
};

exports.report = async (folder) => {
  const options = getOptions(folder).report;
  const log = path.resolve(folder, LOG_NAME);
  const dataSet = await logFile.read(log);

  await Promise.all(options.output.map(async (reportOptions) => {
    reportOptions = Object.assign({
      file: 'README.md',
      title: 'Tracktastic',
      reporter: require('./report') // make this variable
    }, reportOptions);

    const out = path.resolve(folder, reportOptions.file);
    const reportString = reportOptions.reporter(dataSet, reportOptions);

    await writeFile(out, reportString);
  }))
};
