# 🏥 Sistem Rekam Medis Digital Klinik Pratama Adhyaksa Kejaksaan Tinggi Jambi

Platform Digital Terintegrasi untuk Pelayanan Kesehatan Modern dengan React.js

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18.2.0-61dafb)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.5-38bdf8)
![License](https://img.shields.io/badge/license-MIT-green)

## 📋 Deskripsi

Aplikasi Rekam Medis Digital yang modern dan user-friendly, dirancang khusus untuk membantu tenaga medis dalam mengelola data pasien dan rekam medis dengan efisien. Menggunakan teknologi React.js dan TailwindCSS untuk tampilan yang responsif dan menarik dengan tema warna kejaksaan (teal/emerald).

## ✨ Fitur Utama

### 👨‍⚕️ Portal Dokter (Admin)

- ✅ Dashboard interaktif dengan statistik real-time
- ✅ Manajemen data pasien lengkap (CRUD)
- ✅ Input dan kelola rekam medis
- ✅ Poli Umum dengan fitur lengkap
- ✅ Poli Gigi (Coming Soon)
- ✅ Search dan filter data
- ✅ Quick actions untuk akses cepat

### 👤 Portal Pasien

- ✅ Lihat riwayat rekam medis pribadi
- ✅ Detail pemeriksaan dan diagnosa
- ✅ Informasi resep dan terapi
- ✅ Profil kesehatan

### 🎨 Design Features

- ✅ Modern UI/UX dengan glassmorphism
- ✅ Smooth animations dan micro-interactions
- ✅ Responsive design (Mobile, Tablet, Desktop)
- ✅ Dark gradient backgrounds
- ✅ Color-coded badges dan cards
- ✅ Interactive charts dan widgets

## 🚀 Cara Instalasi

### Prasyarat

- Node.js (v14.0.0 atau lebih tinggi)
- npm atau yarn

### Langkah Instalasi

1. **Clone atau Download Project**

```bash
git clone <repository-url>
cd medical-record-app
```

2. **Install Dependencies**

```bash
npm install
```

Atau jika menggunakan yarn:

```bash
yarn install
```

3. **Setup Environment Variables**

```bash
cp .env.example .env
```

Edit file `.env` sesuai kebutuhan:

```env
REACT_APP_NAME=Medical Record System
REACT_APP_VERSION=1.0.0
REACT_APP_API_URL=http://localhost:5000/api
```

4. **Jalankan Aplikasi**

```bash
npm start
```

Aplikasi akan berjalan di `http://localhost:5173`

5. **Build untuk Production**

```bash
npm run build
```

## 🎯 Cara Menggunakan

### Login

1. Buka aplikasi di browser
2. Pilih role login:
   - **Portal Dokter**: Untuk admin/dokter
   - **Portal Pasien**: Untuk pasien

### Admin/Dokter

**Dashboard**

- Lihat statistik total pasien, rekam medis, dan distribusi poli
- Quick actions untuk akses cepat
- Aktivitas terbaru

**Data Pasien**

- Tambah pasien baru dengan klik tombol "Tambah Pasien"
- Edit data pasien dengan klik icon edit
- Hapus pasien dengan klik icon hapus
- Cari pasien dengan search bar

**Rekam Medis**

- Tambah rekam medis baru
- Pilih pasien dari dropdown
- Pilih poli (Umum/Gigi)
- Isi form: Anamnesa, Objektif, Diagnosa, Terapi
- Filter berdasarkan poli
- Edit atau hapus rekam medis

**Poli Umum**

- View khusus untuk rekam medis poli umum
- Semua fitur sama dengan halaman rekam medis

**Poli Gigi**

- Coming soon (dalam pengembangan)

### Pasien

**Dashboard**

- Lihat ringkasan kesehatan
- Riwayat kunjungan terakhir

**Rekam Medis Saya**

- Lihat semua riwayat rekam medis
- Detail pemeriksaan, diagnosa, dan terapi
- Informasi dokter pemeriksa

## 🎨 Tema Warna

### Primary Colors (Kejaksaan)

- Teal 500: `#14b8a6`
- Teal 600: `#0d9488`
- Emerald 500: `#10b981`
- Emerald 600: `#059669`

### Secondary Colors

- Blue: `#3b82f6` (Info)
- Purple: `#a855f7` (Poli Umum)
- Orange: `#f97316` (Poli Gigi)
- Red: `#ef4444` (Danger)
- Green: `#22c55e` (Success)

## 🛠️ Teknologi yang Digunakan

- **React 18.2.0** - JavaScript library untuk UI
- **TailwindCSS 3.3.5** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Context API** - State management
- **React Hooks** - useState, useEffect, useContext

## 📦 Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "lucide-react": "^0.263.1",
  "tailwindcss": "^3.3.5"
}
```

## 🔧 Scripts Available

```bash
# Development
npm start

# Build production
npm run build

# Run tests
npm test

# Eject (tidak recommended)
npm run eject
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🎓 Best Practices yang Diterapkan

1. **Component-Based Architecture** - Komponen reusable dan terpisah
2. **Context API** - State management yang efisien
3. **Custom Hooks** - Logic reusability
4. **Utility Functions** - Helper functions terorganisir
5. **Consistent Naming** - Penamaan yang konsisten
6. **Error Handling** - Proper error management
7. **Code Organization** - Struktur folder yang jelas
8. **Performance Optimization** - React best practices
9. **Accessibility** - Semantic HTML dan ARIA labels
10. **Documentation** - Inline comments dan docs

## 🚧 Roadmap

### Phase 1 (Current) ✅

- [x] Authentication system
- [x] Dashboard
- [x] Patient management
- [x] Medical records (Poli Umum)
- [x] Responsive design

### Phase 2 (Next)

- [ ] Poli Gigi implementation
- [ ] Appointment scheduling
- [ ] Print medical records
- [ ] Export to PDF
- [ ] Email notifications

### Phase 3 (Future)

- [ ] Backend integration (REST API)
- [ ] Real-time updates
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Mobile app version

## 🐛 Known Issues

Tidak ada issue yang diketahui saat ini. Silakan laporkan jika menemukan bug.

## 🤝 Contributing

Kontribusi selalu welcome! Silakan:

1. Fork repository
2. Create feature branch (`git checkout -b master`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin master`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- **Development Team** - Initial work

## 🙏 Acknowledgments

- Design inspiration from modern healthcare applications
- Icons by Lucide React
- Color palette inspired by Indonesian government institutions

## 📞 Support

Untuk pertanyaan atau dukungan, silakan hubungi:

- Email: support@medrecord.com
- Website: <https://medrecord.com>

---

**Dibuat dengan ❤️ untuk Sistem Kesehatan Modern Indonesia**

© 2025 Sistem Rekam Medis Digital. All rights reserved.
