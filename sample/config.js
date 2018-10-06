module.exports = {
  ingest: {
    createUnit: () => 'ms',
  },
  report: {
    output: [{
      file: 'README.md'
    }, {
      file: 'ANOTHER.md',
      options: {
        title: 'Custom Title',
        maxRows: 40,
      }
    }]
  }
};
