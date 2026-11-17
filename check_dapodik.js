const XLSX = require('xlsx');
const workbook = XLSX.readFile('dataset/dapodik.xlsx');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
console.log(data[0]);
console.log(data[1]);
