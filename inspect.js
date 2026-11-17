const xlsx = require('xlsx');
const workbook = xlsx.readFile('dataset/dapodik.xlsx');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
console.log(data[0]);
console.log(data[1]);
console.log(data[2]);
