const table = require('text-table');
const timestamp = require('./timestamp');

const NEW_LINE = '\n';

const sortNames = (a, b) => a > b ? 1 : -1;
const sortByTime = (a, b) => a.time.unix < b.time.unix ? 1 : -1;
const min = (values, prop) => values.reduce((min, x) => x[prop] < min ? x[prop] : min, Infinity);
const max = (values, prop) => values.reduce((max, x) => x[prop] > max ? x[prop] : max, 0);

const mapChunks = (arr, chunkSize, fn) => {
  const result = [];

  let i = 0;
  while (i < arr.length) {
    result.push(fn(arr.slice(i, i + chunkSize)));
    i += chunkSize;
  }

  return result;
};

const joinColumns = (columns) => {
  const final = [];
  const maxRows = max(columns, 'length');

  for (let r = 0; r < maxRows; r += 1) {
    const row = [];

    columns.forEach((column) => {
      row.push(`${column[r] || ''}`);
    })

    final.push(row);
  }

  return final;
};

const gangUpTables = (tables, columns) => {
  return mapChunks(tables, columns, (ts) => {
    const columns = ts.map(t => t.split(NEW_LINE));
    return table(joinColumns(columns));
  }).join(NEW_LINE + NEW_LINE);
};

const makeSingleTable = (name, values, maxLineLength = 10) => {
  const minData = min(values, 'data');
  const maxData = max(values, 'data');

  const t = table(values.map(({ time, data, unit = '' }) => {
    const barLength = Math.max(1, Math.ceil((data - minData) / (maxData - minData) * maxLineLength));
    return [
      timestamp.display(time),
      data.toFixed(2) + unit,
      ('=').repeat(barLength)
    ];
  }), {
    align: [ 'l', 'r', 'l' ]
  });

  const tWidth = Math.max(
    name.length,
    max(t.split(NEW_LINE), 'length')
  );

  const header = [
    '='.repeat(tWidth),
    name,
    '-'.repeat(tWidth),
    ' ',
  ].join(NEW_LINE);

  return header + NEW_LINE + t;
};

const reportMarkdown = (dataSet, options) => {
  options = Object.assign({
    maxRows: 10,
    maxColumns: 3,
    barLength: 20,
    title: 'Tracktastic!'
  }, options);

  const names = Object.keys(dataSet).sort(sortNames);

  const tables = names.map(name => {
    const marks = dataSet[name]
      .slice()
      .sort(sortByTime)
      .slice(0, options.maxRows);

    return makeSingleTable(name, marks, options.barLength);
  });

  const infoGraphic = '```\n' + + '```\n'

  return [
    `# ${options.title}`,
    '```',
    gangUpTables(tables, options.maxColumns),
    '```',
  ].join(NEW_LINE);
};

module.exports = reportMarkdown;
