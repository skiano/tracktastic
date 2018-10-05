#! /usr/bin/env node

const path = require('path');
const readline = require('readline');
const tracktastic = require('../src');

const folder = process.argv[process.argv.findIndex(a => a === '--folder') + 1] || 'tracktastic';
const folderPath = path.resolve(process.cwd(), folder);
const shouldIngest = process.argv.includes('--ingest');
const shouldReport = process.argv.includes('--report');

const report = async () => {
  await tracktastic.report(folderPath);
};

const ingest = () => new Promise((resolve, reject) => {
  const rl = readline.createInterface({ input: process.stdin });

  rl.on('line', async (line) => {
    try {
      await tracktastic.ingest(folderPath, JSON.parse(line));
      resolve();
    } catch (error) {
      reject(error);
    }
  });

  rl.on('error', reject);
});

const main = async () => {
  try {
    if (shouldIngest) {
      await ingest();
    } else if (shouldReport) {
      await report();
    } else {
      await ingest();
      await report();
    }
  } catch (e) {
    console.log(e);
  }
}

main();
