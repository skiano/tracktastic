const logFile = require('./logFile');
const timestamp = require('./timestamp');

exports.ingest = async (logFilePath, marks) => {
  const now = timestamp.create()
  await logFile.append(logFilePath, marks.map(m => {
    return Object.assign(m, {
      time: now,
    });
  }));
};

exports.report = async (reportFilePath, options) => {
  console.log('generate a report!');
};
