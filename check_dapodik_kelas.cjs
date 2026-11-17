const XLSX = require('xlsx');
const workbook = XLSX.readFile('dataset/dapodik.xlsx');
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
const kelasSet = new Set();
for(let i=5; i<data.length; i++) {
  if (data[i] && data[i][42]) kelasSet.add(data[i][42]);
}
console.log(Array.from(kelasSet));
