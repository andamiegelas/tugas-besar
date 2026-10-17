# TaskMate - Student Task Tracker

Tugas Web Programming (S1 Rekayasa Perangkat Lunak)  
Nama: Mikdam Huda  
NIM: 1302223034  

---

## Deskripsi
TaskMate adalah web sederhana untuk mencatat tugas-tugas kuliah. Di web ini kita bisa melihat daftar tugas yang sedang berjalan, menambah tugas baru beserta deadlinenya, dan melihat detail serta status pengerjaan tugas biar tidak terlewat.

Web ini dibuat pakai HTML, CSS (style.css), framework Bootstrap 5, JavaScript murni, dan library jQuery.

---

## Fitur JavaScript & jQuery (Tugas 5)
Di tugas 5 ini ditambahkan interaktivitas:

1. **JavaScript Murni**:
   - Data tugas disimpan di array of object (data dummy).
   - Baris tabel tugas di `index.html` dan 4 kotak status di atas di-render otomatis pakai perulangan dan percabangan JavaScript (bukan ditulis manual di HTML).
   - Ada fungsi untuk menghitung total status tugas (`hitungStatistik`) dan fungsi filter tugas berdasarkan statusnya (`filterDataTugas`).

2. **jQuery**:
   - Efek animasi `slideToggle` untuk buka tutup panel filter dan daftar sub-tugas di halaman detail.
   - Efek `fadeIn` dan `fadeOut` saat menghapus baris tabel dan memunculkan notifikasi alert.
   - Event klik tombol filter, tombol hapus tugas, tombol reset data awal, dan validasi form tambah tugas (mengecek jika ada input yang masih kosong sebelum disimpan).

---

## Video Demo
Video interaktivitas bisa dilihat di:
- [docs/videos/demo_interaktivitas_tugas5.webm](docs/videos/demo_interaktivitas_tugas5.webm)

---

## Screenshot Interaktivitas

### 1. Filter Tugas
- Sebelum filter:  
  ![Sebelum Filter](docs/screenshots/sebelum-filter.png)

- Sesudah filter (panel terbuka dan data terfilter):  
  ![Sesudah Filter](docs/screenshots/sesudah-filter.png)

### 2. Hapus Tugas
- Sebelum hapus:  
  ![Sebelum Hapus](docs/screenshots/sebelum-hapus.png)

- Sesudah hapus (baris hilang dan notifikasi muncul):  
  ![Sesudah Hapus](docs/screenshots/sesudah-hapus.png)

### 3. Validasi Form Tambah Tugas
- Sebelum validasi (form masih kosong):  
  ![Sebelum Validasi](docs/screenshots/sebelum-validasi.png)

- Sesudah klik simpan (muncul alert merah):  
  ![Sesudah Validasi Error](docs/screenshots/sesudah-validasi.png)

- Sesudah form diisi dan disimpan (muncul alert hijau):  
  ![Sesudah Tambah Sukses](docs/screenshots/sesudah-tambah-sukses.png)

### 4. Detail Sub-Tugas
- Tampilan awal sub-tugas:  
  ![Sebelum Subtugas](docs/screenshots/sebelum-subtugas.png)

- Saat sub-tugas diklik (selesai):  
  ![Sesudah Coret Subtugas](docs/screenshots/sesudah-subtugas.png)

- Saat sub-tugas disembunyikan (slideToggle):  
  ![Sesudah Toggle Subtugas](docs/screenshots/sesudah-subtugas-toggle.png)

---

## Screenshot Tampilan

### Desktop
1. **Dashboard (`index.html`)**  
   ![Dashboard Desktop](docs/screenshots/desktop-index.png)

2. **Form Tambah Tugas (`tambah-tugas.html`)**  
   ![Form Tambah Tugas Desktop](docs/screenshots/desktop-tambah.png)

3. **Detail Tugas (`detail-tugas.html`)**  
   ![Detail Tugas Desktop](docs/screenshots/desktop-detail.png)

### Mobile
1. **Dashboard Mobile**  
   ![Dashboard Mobile](docs/screenshots/mobile-index.png)

2. **Form Tambah Tugas Mobile**  
   ![Form Tambah Tugas Mobile](docs/screenshots/mobile-tambah.png)

3. **Detail Tugas Mobile**  
   ![Detail Tugas Mobile](docs/screenshots/mobile-detail.png)
