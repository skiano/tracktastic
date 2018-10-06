module.exports = {
  ingest: {
    createUnit: () => 'ms',
  },
  report: {
    output: [
      { file: 'README.md' },
      { file: 'ANOTHER.md', title: 'Custom Title' }
    ]
  }
};
