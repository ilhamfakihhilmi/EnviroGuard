<script setup>
import { ref } from 'vue';

// --- DATA GALERI ---
// Saya sedikit menyesuaikan urutan dan layout untuk alur visual yang lebih baik
const galleryItems = ref([
  { 
    id: 1, 
    src: '/src/assets/images/image1.jpeg', 
    text: 'Dashboard Monitoring', 
    subtext: 'Visualisasi data sensor secara real-time', 
    layout: 'big' 
  },
  { 
    id: 2, 
    src: '/src/assets/images/image2.jpeg', 
    text: 'Sesi Coding', 
    subtext: 'Fokus pada pengembangan perangkat lunak', 
    layout: 'tall'
  },
  { 
    id: 3, 
    src: '/src/assets/images/image3.jpeg', 
    text: 'Diskusi Tim', 
    subtext: 'Kolaborasi dalam pengembangan proyek', 
    layout: 'wide'
  },
  { 
    id: 4, 
    src: '/src/assets/images/image4.jpeg', 
    text: 'Instalasi Hardware', 
    subtext: 'Menghubungkan komponen IoT', 
    layout: ''
  },
  { 
    id: 5, 
    src: '/src/assets/images/image5.jpeg', 
    text: 'Prototyping', 
    subtext: 'Melihat lebih dekat hasil kerja', 
    layout: ''
  },
]);

// --- LOGIKA UNTUK POPUP PREVIEW ---
// Variabel untuk menyimpan data item yang sedang aktif di popup
const activeItem = ref(null);

// Fungsi untuk menampilkan popup dengan data item yang diklik
function showPreview(item) {
  activeItem.value = item;
}

// Fungsi untuk menutup/menyembunyikan popup
function closePreview() {
  activeItem.value = null;
}
</script>

<template>

<header class="header">
        <nav class="nav">
            <router-link to="/">
                <div>
                    <img src="/src/assets/images/logo.jpeg" alt="Logo" style="width: 135px; height: auto;" />
                </div>
            </router-link>
            <div class="nav-links">
                <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
                <router-link to="/rack" class="nav-link">Rak Server</router-link>
                <router-link to="/asset" class="nav-link">Aset</router-link>
                <router-link to="/visitor" class="nav-link">Pengunjung</router-link>
                <router-link to="/laporan" class="nav-link">Laporan</router-link>
                <router-link to="/mobile" class="nav-link">Mobile</router-link>
                <router-link to="/gallery" class="nav-link">Gallery</router-link>
            </div>
        </nav>
    </header>
  <div class="gallery-container">
    <h1 class="gallery-title">Galeri Proyek & Aktivitas</h1>
    <div class="gallery-grid">
      <div v-for="item in galleryItems" :key="item.id" class="gallery-item" :class="item.layout" @click="showPreview(item)">
        <img :src="item.src" :alt="item.text" class="gallery-image">
        <div class="gallery-overlay">
          <p class="gallery-text">{{ item.text }}</p>
          <p class="gallery-subtext">{{ item.subtext }}</p>
        </div>
      </div>
    </div>
  </div>

  <Transition name="fade">
    <div v-if="activeItem" class="popup-overlay" @click.self="closePreview">
      <div class="popup-content">
        <button class="popup-close" @click="closePreview">&times;</button>
        <img :src="activeItem.src" :alt="activeItem.text" class="popup-image">
        <div class="popup-details">
          <h2 class="popup-text">{{ activeItem.text }}</h2>
          <p class="popup-subtext">{{ activeItem.subtext }}</p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background-color: #1a1a1a;
}
</style>

<style scoped>

/* Style untuk Galeri (sebagian besar tidak berubah) */
.gallery-container {
  width: 100vw;
  height: 100vh;
  padding: 15px;
  box-sizing: border-box;
  overflow-y: auto;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  font-family: 'Arial', sans-serif;
}
.gallery-title {
  text-align: center;
  color: #333;
  margin: 15px 0 30px 0;
  font-size: 2.5rem;
  font-weight: bold;
}
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Sedikit lebih lebar */
  grid-auto-rows: 250px;
  grid-auto-flow: dense;
  gap: 15px;
}
.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out; /* Transisi untuk semua properti */
  cursor: pointer;
}
.gallery-item:hover {
  transform: scale(1.03); /* Sedikit lebih besar saat hover */
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  z-index: 10;
}
.wide { grid-column: span 2; }
.tall { grid-row: span 2; }
.big { grid-column: span 2; grid-row: span 2; }
.gallery-image { width: 100%; height: 100%; object-fit: cover; display: block; }
.gallery-overlay { position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(0, 0, 0, 0.85), transparent); color: white; width: 100%; transform: translateY(100%); transition: transform 0.4s ease-in-out; padding: 20px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: flex-end; align-items: center; }
.gallery-item:hover .gallery-overlay { transform: translateY(0); }
.gallery-text { margin: 0; font-size: 1.2rem; text-align: center; font-weight: bold; }
.gallery-subtext { margin: 4px 0 0 0; font-size: 0.9rem; text-align: center; font-weight: normal; opacity: 0.85; }

/* --- STYLE BARU UNTUK POPUP --- */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.popup-content {
  position: relative;
  background-color: #fff;
  border-radius: 15px;
  padding: 25px;
  width: 90%;
  max-width: 800px; /* Batas lebar popup */
  max-height: 90vh; /* Batas tinggi popup */
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 40px rgba(0,0,0,0.5);
}
.popup-close {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 2.5rem;
  font-weight: bold;
  color: #555;
  background: none;
  border: none;
  cursor: pointer;
  line-height: 1;
}
.popup-image {
  width: 100%;
  max-height: 65vh; /* Tinggi maksimum gambar agar teks muat */
  object-fit: contain; /* Tampilkan seluruh gambar tanpa terpotong */
  border-radius: 8px;
}
.popup-details {
  text-align: center;
  padding: 20px 0 0 0;
  color: #333;
}
.popup-text {
  font-size: 1.8rem;
  margin: 0 0 10px 0;
}
.popup-subtext {
  font-size: 1.1rem;
  color: #666;
  margin: 0;
}

/* --- Animasi Fade untuk Transisi --- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Media Query (Tidak diubah) */
@media (max-width: 768px) {
  .wide, .big { grid-column: span 2; grid-row: span 1; }
  .tall { grid-row: span 2; grid-column: span 1; }
  .gallery-grid { grid-auto-rows: 200px; }
  .popup-text { font-size: 1.4rem; }
  .popup-subtext { font-size: 1rem; }
}
</style>