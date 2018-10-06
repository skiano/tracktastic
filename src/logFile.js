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
  assert(
    typeof mark.value === 'number',
    `'mark.value' must be a number`
  );

  assert(
    (new Date(mark.time)).getTime() > 0,
    `'mark.time' must be a valid timestamp`
  );

  assert(
    typeof mark.name === 'string',
    `'mark.name' must be a string`
  );

  if (mark.unit) {
    assert(
      typeof mark.unit === 'string',
      '`mark.unit` must be a string'
    )
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
      const [encodedName, encodedTime, encodedData, encodedUnit] = input.split(SEPARATOR);
      const name = fromBase64(encodedName);
      const time = timestamp.parse(encodedTime);
      const data = parseFloat(encodedData, 10);
      const unit = fromBase64(encodedUnit);

      if (!dataSet[name]) dataSet[name] = [];
      dataSet[name].push({ time, data, unit });
    } catch (_) {}
  });
});

module.exports = {
  read: readLogFile,
  append: appendToLogFile,
  clean: () => {}
}
