#! /usr/bin/env node

const path = require('path');
const readline = require('readline');
const tracktastic = require('../src');

const folder = process.argv[process.argv.findIndex(a => a === '--folder') + 1] || '';
const folderPath = path.resolve(process.cwd(), folder);
const logFilePath = path.resolve(folderPath, '.tracktastic');
const reportFilePath = path.resolve(folderPath, 'README.md');

const ingest = async () => {
  const rl = readline.createInterface({ input: process.stdin });

  rl.on('line', async (line) => {
    try {
      await tracktastic.ingest(logFilePath, JSON.parse(line));
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log(`could not write to '${logFilePath}'`)
      }
    }
  });

  rl.on('error', (e) => {
    console.error(e);
    process.exit(1);
  })
};

const report = async () => {
  await tracktastic.report(logFilePath, reportFilePath);
};

if (process.argv.includes('--ingest')) {
  ingest();
}

if (process.argv.includes('--report')) {
  report();
}
