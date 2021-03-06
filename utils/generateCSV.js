const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const { csvListPath, csvVerifyPath } = require('../constants/paths');
const { listHeader, verifyHeader } = require('../constants/csvHeaders');
const { Logger } = require('./logger');

const date = new Date();

async function generateCSV(data, type) {
  try {
    let path;
    const header = type === 'list' ? listHeader : verifyHeader;

    if (process.argv[3]) {
      path =
        type === 'list'
          ? `${process.argv[3]}/starlingList-${date}.csv`
          : `${process.argv[3]}/starlingVerify-${date}.csv`;
    } else {
      path = type === 'list' ? csvListPath : csvVerifyPath;
    }

    const csvWriter = createCsvWriter({
      path: path,
      header: header
    });

    await csvWriter.writeRecords(data);

    console.log(`generated csv file at ${path}`);
  } catch (err) {
    Logger.error(err.stack);
    if (err.code === 'ENOENT') {
      console.log('\nplease provide a valid directory');
    } else {
      console.log('could not generate the csv file');
    }
  }
}

module.exports = {
  generateCSV
};
