const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');
const XLSX = require('xlsx');

const wb = XLSX.readFile('dataset/dapodik.xlsx');
const sheet = wb.Sheets[wb.SheetNames[0]];
const dapoData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

const students = [];
for (let i = 5; i < dapoData.length; i++) {
  const row = dapoData[i];
  if (!row || !row[1]) continue;
  students.push({
    nama: (row[1] || '').toString().trim().toUpperCase(),
    nis: (row[2] || '').toString().trim(),
    jk: (row[3] || '').toString().trim().toUpperCase(),
    nisn: (row[4] || '').toString().trim(),
    kelas: (row[42] || '').toString().trim(),
    nilai: 0
  });
}

const parseFloatIndo = (str) => {
  if (!str) return 0;
  const s = str.toString().replace(/,/g, '.');
  const f = parseFloat(s);
  return isNaN(f) ? 0 : f;
};

const raw7 = fs.readFileSync('dataset/data-nilai-kelas-7-2627.csv', 'utf8');
const parsed7 = Papa.parse(raw7, { header: true, skipEmptyLines: true });
const scoreMap7 = {};
parsed7.data.forEach(row => {
  const nisn = (row['NO_USBN'] || '').toString().trim();
  const nama = (row['NAMA'] || '').toString().trim().toUpperCase();
  const cols = ['UN_PEND_AGAMA', 'UN_PENDIDIKAN_PANCASILA', 'UN_BHS_INDONESIA', 'UN_MATEMATIKA', 'UN_IPAS', 'UN_PJOK', 'UN_SENI_BUDAYA', 'UN_MUATAN_LOKAL'];
  let total = 0;
  cols.forEach(c => total += parseFloatIndo(row[c]));
  if (nisn) scoreMap7[nisn] = total;
  if (nama) scoreMap7[nama] = total;
});

const raw8 = fs.readFileSync('dataset/data-nilai-kelas-8-2627.csv', 'utf8');
const parsed8 = Papa.parse(raw8, { header: true, skipEmptyLines: true });
const scoreMap8 = {};
parsed8.data.forEach(row => {
  const nisn = (row['NISN'] || '').toString().trim();
  const nama = (row['NAMA SISWA'] || '').toString().trim().toUpperCase();
  const total = parseFloatIndo(row['JUMLAH']);
  if (nisn) scoreMap8[nisn] = total;
  if (nama) scoreMap8[nama] = total;
});

const raw9 = fs.readFileSync('dataset/data-nilai-kelas-9-2627.csv', 'utf8');
const parsed9 = Papa.parse(raw9, { header: true, skipEmptyLines: true, delimiter: ';' });
const scoreMap9 = {};
parsed9.data.forEach(row => {
  const nisn = (row['NISN'] || '').toString().trim();
  const nama = (row['NAMA SISWA'] || '').toString().trim().toUpperCase();
  const cols = ['Agama', 'Pancasila', 'Indonesia', 'Inggris', 'MULOK', 'Matematika', 'IPA', 'IPS', 'PJOK', 'Prakarya', 'Informatika'];
  let total = 0;
  cols.forEach(c => total += parseFloatIndo(row[c]));
  if (nisn) scoreMap9[nisn] = total;
  if (nama) scoreMap9[nama] = total;
});

students.forEach(s => {
  let score = 0;
  if (s.kelas.startsWith('7')) score = scoreMap7[s.nisn] || scoreMap7[s.nama] || 0;
  else if (s.kelas.startsWith('8')) score = scoreMap8[s.nisn] || scoreMap8[s.nama] || 0;
  else if (s.kelas.startsWith('9')) score = scoreMap9[s.nisn] || scoreMap9[s.nama] || 0;
  
  if (score === 0) {
    score = scoreMap7[s.nisn] || scoreMap7[s.nama] ||
            scoreMap8[s.nisn] || scoreMap8[s.nama] ||
            scoreMap9[s.nisn] || scoreMap9[s.nama] || 0;
  }
  s.nilai = Math.round(score * 100) / 100;
});

const outCsv = Papa.unparse(students.map(s => ({
  nisn: s.nisn,
  nis: s.nis,
  nama: s.nama,
  gender: s.jk,
  kelas: s.kelas,
  nilai: s.nilai
})));

fs.writeFileSync('dataset/dataset_2627.csv', outCsv);
console.log(`Generated dataset_2627.csv with ${students.length} records.`);
