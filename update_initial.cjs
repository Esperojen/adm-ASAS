const fs = require('fs');
const Papa = require('papaparse');
const raw = fs.readFileSync('dataset/dataset_2627.csv', 'utf8');
const parsed = Papa.parse(raw, { header: true, skipEmptyLines: true });

const students = parsed.data.map((row, i) => {
  const jenjangMatch = row.kelas.match(/([789])/);
  const jenjang = jenjangMatch ? parseInt(jenjangMatch[1]) : 7;
  return {
    id: `stu_${i}`,
    nomorPeserta: '',
    nisn: row.nisn,
    nis: row.nis,
    nama: row.nama,
    jenisKelamin: row.gender,
    jenjang: jenjang,
    kelasAsal: row.kelas,
    nilaiRataRata: parseFloat(row.nilai) || 0,
    peringkatKeseluruhan: 0,
    nilaiMataPelajaran: {}
  };
});

const fileContent = `import { Student } from "../types";\n\nexport const INITIAL_STUDENTS: Student[] = ${JSON.stringify(students, null, 2)};\n`;
fs.writeFileSync('src/data/initialData.ts', fileContent);
console.log('Updated src/data/initialData.ts');
