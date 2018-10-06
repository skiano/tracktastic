module.exports = {
  ingest: {
    createUnit: () => 'ms',
  },
  report: {
    output: [
      { name: 'README.md' },
      { name: 'ANOTHER.md' }
    ]
  }
};
