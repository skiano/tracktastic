#! /usr/bin/env node

const path = require('path');
const readline = require('readline');
const tracktastic = require('../src');

const dataFolder = process.argv[process.argv.findIndex(a => a === '--log') + 1] || '';
const logFilePath = path.resolve(process.cwd(), dataFolder, '.tracktastic');

const ingest = async () => {
  const rl = readline.createInterface({ input: process.stdin });

  rl.on('line', async (line) => {
    try {
      await tracktastic.ingest(logFilePath, JSON.parse(line));
    } catch (_) {}
  });

  rl.on('error', (e) => {
    console.error(e);
    process.exit(1);
  })
}

ingest();
