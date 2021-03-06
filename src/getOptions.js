const path = require('path');

const identity = _ => _;

const ingest = {
  createType: mark => mark.type,
  createName: identity,
  createUnit: identity,
  createValue: identity
};

const report = {
  output: [{}]
};

let cached;

const getOptions = (folder) => {
  if (cached) return cached;

  let options;

  try {
    const userOptions = require(path.resolve(folder, 'config.js'));
    options = {
      ingest: Object.assign({}, ingest, userOptions.ingest),
      report: Object.assign({}, report, userOptions.report)
    };
  } catch (_) {
    options = { ingest, report };
  }

  cached = options;

  return cached;
};

module.exports = getOptions;
