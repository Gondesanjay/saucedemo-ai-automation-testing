# 🤖 AI-Driven Automation Testing: SauceDemo

Repositori ini berisi *source code* pengujian perangkat lunak (*automation testing*) untuk platform e-commerce simulasi [SauceDemo](https://www.saucedemo.com/). Proyek ini merupakan bagian dari tugas mata kuliah **Jaminan Kualitas Sistem Informasi** di Sekolah Tinggi Teknologi Terpadu Nurul Fikri (STT-NF).

Keunikan dari proyek ini adalah pemanfaatan **Artificial Intelligence (Google Gemini)** menggunakan teknik *prompt engineering* untuk mempercepat proses pembuatan dan penulisan *script* pengujian otomatis.

## 🛠️ Tech Stack
Proyek ini dibangun menggunakan teknologi berikut:
* **Runtime:** Node.js
* **Automation Tool:** Selenium WebDriver
* **Test Framework:** Mocha
* **Assertion Library:** Node.js built-in `assert`
* **Reporting:** Mochawesome (HTML Visual Reporter)
* **AI Assistant:** Google Gemini

## 📂 Struktur Skenario Pengujian
Pengujian dibagi ke dalam 4 modul utama yang berada di dalam folder `test/`:

1. `01_error_handling.test.js` : Menguji pertahanan sistem terhadap kelalaian input pengguna (misal: *Login* akun diblokir, *Login* tanpa *password*, *Checkout* dengan *field* kosong).
2. `02_functional_bug.test.js` : Menguji cacat visual dan logika fitur menggunakan akun `problem_user` (misal: Bug *Broken Image*, Bug *Sorting* harga produk).
3. `03_state_management.test.js` : Memvalidasi integritas data dan sinkronisasi sistem (misal: Bug kalkulasi angka pada *cart badge*).
4. `04_performance.test.js` : Menguji batas waktu respons server (*timeout*) menggunakan akun `performance_glitch_user`.

## 🚀 Cara Menjalankan (How to Run)

Jika Anda ingin menjalankan *script* pengujian ini di komputer lokal Anda, ikuti langkah-langkah berikut:

**1. Clone repositori ini**
```bash
git clone [https://github.com/username-kamu/nama-repo-kamu.git](https://github.com/username-kamu/nama-repo-kamu.git)

2. Masuk ke direktori proyek

Bash
cd nama-repo-kamu
3. Install seluruh dependencies (Selenium, Mocha, Mochawesome)

Bash
npm install
4. Jalankan pengujian

Bash
npm test
(Perintah ini akan secara otomatis membuka browser, menjalankan seluruh skenario pengujian, dan meng-generate laporan)

📊 Pelaporan (Reporting)
Setelah pengujian selesai (menjalankan npm test), laporan visual berbasis HTML akan otomatis di-generate oleh Mochawesome. Anda bisa membuka file HTML yang muncul di dalam folder mochawesome-report/ menggunakan browser untuk melihat status pengujian (PASSED/FAILED) secara detail.

🎥 Video Demonstrasi
Untuk melihat bagaimana script ini berjalan secara otomatis mengendalikan browser dan membedah laporan bug-nya, silakan tonton presentasi dan demo lengkap kelompok kami di YouTube:

Disusun Oleh:
Ikmal Rizal (0110124148) - Kelompok 14 / 4E01
