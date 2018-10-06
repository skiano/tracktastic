const path = require('path');

const ingest = {
  createName: mark => mark.name,
};

const report = {
  output: [
    { name: 'README.md' }
  ]
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
