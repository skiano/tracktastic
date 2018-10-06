module.exports = {
  ingest: {
    createUnit: () => 'ms',
  },
  report: {
    output: [{
      file: 'README.md'
    }, {
      file: 'ANOTHER.md',
      reporterOptions: {
        title: 'Custom Title',
        maxRows: 40,
      }
    }]
  }
};
