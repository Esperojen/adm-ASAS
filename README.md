# Sistem Administrasi Ruang & Denah Ujian

Sistem Pembagian Ruang Tes & Denah Tempat Duduk adalah aplikasi web berbasis *offline-first* yang dirancang untuk mempermudah panitia ujian sekolah dalam mendistribusikan siswa ke dalam ruang-ruang ujian, mengatur tempat duduk, serta mencetak dokumen administrasi ujian secara otomatis.

## ✨ Fitur Utama

- **Manajemen Tahun Ajaran & Kegiatan**: Kelola berbagai kegiatan asesmen (seperti PTS, PAS, Asesmen Sumatif) berdasarkan Tahun Ajaran dengan antarmuka yang bersih.
- **Distribusi Cerdas**: Mendukung berbagai model pembagian ruang (Homogen, Heterogen, Sekuensial) dan strategi persilangan antar jenjang kelas, lengkap dengan deteksi pelanggaran (gender/jenjang) di meja yang sama.
- **Konfigurasi Universal & Fleksibel**: 
  - Pengaturan nama sekolah, dinas, identitas panitia, serta rentang tanggal pelaksanaan ujian yang terformat secara otomatis (Format Indonesia).
  - Tampilan UI minimalis dan profesional dengan pewarisan data otomatis (Tahun Ajaran induk akan diwariskan langsung ke dalam kegiatan asesmen).
  - Pratinjau langsung unggahan logo kiri & kanan untuk Kop Surat dokumen.
- **Cetak Dokumen Lengkap (PDF)**: Otomatis menghasilkan file PDF siap cetak untuk Denah Ruang, Daftar Hadir, Daftar Peserta, Cek Kehadiran, Rekapitulasi, Label Meja, hingga Berita Acara.
- **Penghapusan Bersusun (Cascading Delete) & Aman**: Perlindungan tinggi saat menghapus Tahun Ajaran atau Kegiatan, dilengkapi dengan pop-up konfirmasi yang mewajibkan pengetikan kata "HAPUS" untuk mencegah kehilangan data tidak sengaja.
- **Offline-First (IndexedDB)**: Semua data siswa, ruangan, dan pengaturan disimpan secara lokal di browser pengguna menggunakan IndexedDB (Dexie.js), membuat aplikasi berjalan sangat cepat tanpa memerlukan server *backend*.

## 🛠️ Teknologi yang Digunakan

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Database Lokal**: Dexie.js (IndexedDB wrapper)
- **Pembuatan PDF**: jsPDF + jspdf-autotable
- **Ikon**: Lucide React

## 🚀 Cara Menjalankan Aplikasi (Development)

1. Pastikan Anda telah menginstal Node.js di komputer Anda.
2. Lakukan instalasi *dependencies*:
   ```bash
   npm install
   ```
3. Jalankan server *development*:
   ```bash
   npm run dev
   ```
4. Buka tautan `http://localhost:3000` di browser Anda.

## 📦 Build untuk Produksi

Untuk menghasilkan file statis produksi:
```bash
npm run build
```
File hasil *build* akan tersedia di dalam folder `dist/`.

## 📜 Lisensi
Aplikasi ini dikembangkan untuk kebutuhan internal administrasi sekolah/pendidikan.
