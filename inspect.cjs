const xlsx = require('xlsx');
const workbook = xlsx.readFile('dataset/dapodik.xlsx');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
for(let i=3; i<8; i++) console.log(i, data[i]);
