const fs = require('fs');
const util = require('util');
const assert = require('assert');
const readline = require('readline');
const timestamp = require('./timestamp');

const appendFile = util.promisify(fs.appendFile);

const SEPARATOR = '|';
const NEW_LINE = '\r\n';

const toBase64 = v => Buffer.from(v).toString('base64');
const fromBase64 = v => Buffer.from(v, 'base64').toString('utf8');

const validateMark = (mark) => {
  if (typeof mark.value !== 'number') {
    throw new assert.AssertionError({
      message: '`mark.value` must be a number',
      actual: JSON.stringify(mark),
      expected: Number,
    });
  }

  if (!(new Date(mark.time)).getTime() > 0) {
    throw new assert.AssertionError({
      message: '`mark.time` must be a valid timestamp',
      actual: JSON.stringify(mark),
      expected: String,
    });
  }

  if (typeof mark.name !== 'string') {
    throw new assert.AssertionError({
      message: '`mark.name` must be strings',
      actual: JSON.stringify(mark),
      expected: String,
    });
  }

  if (mark.unit && typeof mark.unit !== 'string') {
    throw new assert.AssertionError({
      message: '`mark.unit` must be a string',
      actual: JSON.stringify(mark),
      expected: String,
    });
  }
};

const appendToLogFile = async (logFile, marks) => {
  const str = marks.map((mark) => {
    validateMark(mark);

    return [
      toBase64(mark.name),
      mark.time,
      mark.value,
      mark.unit && toBase64(mark.unit)
    ].join(SEPARATOR);
  }).join(NEW_LINE);

  await appendFile(logFile, NEW_LINE + str);
};

const readLogFile = (logFile) => new Promise((resolve, reject) => {
  const dataSet = {};
  const reader = fs.createReadStream(logFile);
  const stream = readline.createInterface({ input: reader });

  stream.on('error', reject);
  stream.on('close', () => { resolve(dataSet); });

  stream.on('line', (input) => {
    if (!input.trim()) return

    try {
      const [encodedName, encodedTime, encodedData] = input.split(SEPARATOR);
      const name = fromBase64(encodedName);
      const time = timestamp.parse(encodedTime);
      const data = parseFloat(encodedData, 10);

      if (!dataSet[name]) dataSet[name] = [];
      dataSet[name].push({ time, data });
    } catch (_) {}
  });
});

module.exports = {
  read: readLogFile,
  append: appendToLogFile,
  clean: () => {}
}
