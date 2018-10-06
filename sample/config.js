const identity = _ => _;

module.exports = {
  ingest: {
    createType: mark => mark.type,
    createName: identity,
    createUnit: identity,
    createValue: identity
  },
  report: {
    output: [
      { name: 'README.md' }
    ]
  }
};
