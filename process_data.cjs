const fs = require('fs');
const xlsx = require('xlsx');

// Read dapodik.xlsx
const workbook = xlsx.readFile('dataset/dapodik.xlsx');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const dapodikData = xlsx.utils.sheet_to_json(sheet, { header: 1 });

const dapodikMap = new Map(); // NISN -> data

// Start reading from row 6
for (let i = 6; i < dapodikData.length; i++) {
  const row = dapodikData[i];
  if (!row || !row[4]) continue; // Skip if no NISN

  const nisn = row[4].toString();
  const nis = row[2] ? row[2].toString() : '';
  const nama = row[1] ? row[1].toString() : '';
  const gender = row[3] ? row[3].toString() : '';
  const kelas = row[40] ? row[40].toString() : '';

  dapodikMap.set(nisn, { nisn, nis, nama, gender, kelas, nilai: '' });
}

// Read CSV files to get nilai (RANGKING)
const csvFiles = [
  'dataset/data-nilai-kelas-7-2627.csv',
  'dataset/data-nilai-kelas-8-2627.csv',
  'dataset/data-nilai-kelas-9-2627.csv'
];

for (const file of csvFiles) {
  if (fs.existsSync(file)) {
    const csvContent = fs.readFileSync(file, 'utf8');
    const lines = csvContent.split('\n');
    if (lines.length === 0) continue;
    const header = lines[0].split(',');
    const nisnIndex = header.indexOf('NO_USBN');
    const rankIndex = header.indexOf('RANGKING');
    
    if (nisnIndex !== -1 && rankIndex !== -1) {
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (!line.trim()) continue;
        
        // simple CSV split, ignoring quotes since NO_USBN and RANGKING don't have commas
        // Wait, some fields might have commas (like numbers "84,4"). 
        // Let's just use a simple regex split for CSV if needed, but since NO_USBN and RANGKING are just numbers, we can find them.
        
        let cols = [];
        let inQuote = false;
        let col = '';
        for (let j = 0; j < line.length; j++) {
            if (line[j] === '"') {
                inQuote = !inQuote;
            } else if (line[j] === ',' && !inQuote) {
                cols.push(col);
                col = '';
            } else {
                col += line[j];
            }
        }
        cols.push(col);

        if (cols.length > nisnIndex) {
          const nisn = cols[nisnIndex].trim();
          const rank = cols[rankIndex] ? cols[rankIndex].trim() : '';
          
          if (dapodikMap.has(nisn)) {
            dapodikMap.get(nisn).nilai = rank;
          }
        }
      }
    }
  }
}

// Convert Map to array and sort by kelas then nama (ascending)
let finalData = Array.from(dapodikMap.values());
finalData.sort((a, b) => {
  if (a.kelas === b.kelas) {
    return a.nama.localeCompare(b.nama);
  }
  return a.kelas.localeCompare(b.kelas);
});

// Write to dataset_2627.csv
let outputCsv = 'nisn,nis,nama,gender,kelas,nilai\n';
for (const item of finalData) {
    // Wrap strings in quotes if they contain commas
    const escapeCsv = (str) => {
        if (str.includes(',')) return `"${str}"`;
        return str;
    };
    outputCsv += `${escapeCsv(item.nisn)},${escapeCsv(item.nis)},${escapeCsv(item.nama)},${escapeCsv(item.gender)},${escapeCsv(item.kelas)},${escapeCsv(item.nilai)}\n`;
}

fs.writeFileSync('dataset/dataset_2627.csv', outputCsv, 'utf8');
console.log('Dataset created successfully with ' + finalData.length + ' rows.');

