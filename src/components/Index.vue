<template>
  <header class="header">
    <nav class="nav">
      <router-link to="/">
        <div>
          <img src="/src/assets/images/logo.jpeg" alt="Logo" style="width: 135px; height: auto;" />
        </div>
      </router-link>
    </nav>
  </header>

  <main>
    <section class="hero">
      <div class="hero-content">
        <h1>EnviroGuard</h1>
        <p>Sistem manajemen data center yang canggih dengan interface yang intuitif dan user-friendly untuk efisiensi
          maksimal</p>
        <div class="cta-buttons">
          <router-link to="/dashboard" class="btn btn-primary">
            <i class="fas fa-tachometer-alt"></i>
            Lihat Dashboard
          </router-link>
          <a href="#features" class="btn btn-secondary">
            <i class="fas fa-info-circle"></i>
            Pelajari Lebih Lanjut
          </a>
        </div>
      </div>
    </section>

    <section class="features" id="features">
      <div class="container">
        <h2 class="section-title">Fitur Unggulan</h2>
        <p class="section-subtitle">Jelajahi berbagai modul dan fitur yang dirancang khusus untuk memenuhi kebutuhan
          manajemen data center modern</p>

        <div class="features-grid">
          <router-link to="/dashboard" class="feature-card ai-powered">
            <div class="ai-badge pulse">AI Powered</div>
            <div class="feature-icon"><i class="fas fa-tachometer-alt"></i></div>
            <h3 class="feature-title">Dashboard Utama</h3>
            <p class="feature-description">Monitoring real-time dengan AI analytics dan prediksi otomatis.</p>
          </router-link>

          <router-link to="/rack" class="feature-card ai-powered">
            <div class="ai-badge pulse">MCP Integrated</div>
            <div class="feature-icon"><i class="fas fa-server"></i></div>
            <h3 class="feature-title">Visualisasi Rak</h3>
            <p class="feature-description">Representasi visual 3D dengan AI optimization dan MCP server integration.</p>
          </router-link>

          <router-link to="/asset" class="feature-card ai-powered">
            <div class="ai-badge pulse">Smart AI</div>
            <div class="feature-icon"><i class="fas fa-boxes"></i></div>
            <h3 class="feature-title">Manajemen Aset</h3>
            <p class="feature-description">AI-powered asset tracking dengan predictive maintenance.</p>
          </router-link>

          <router-link to="/visitor" class="feature-card ai-powered">
            <div class="ai-badge">Secure Access</div>
            <div class="feature-icon"><i class="fas fa-id-card"></i></div>
            <h3 class="feature-title">Manajemen Pengunjung</h3>
            <p class="feature-description">Sistem pendaftaran dan pelacakan pengunjung yang aman dan efisien.</p>
          </router-link>

          <router-link to="/monitoring" class="feature-card ai-powered">
            <div class="ai-badge pulse">Real-time</div>
            <div class="feature-icon"><i class="fas fa-thermometer-half"></i></div>
            <h3 class="feature-title">Monitoring Lingkungan</h3>
            <p class="feature-description">Pantau suhu, kelembaban, dan daya secara real-time dengan peringatan cerdas.
            </p>
          </router-link>

          <router-link to="/reports" class="feature-card ai-powered">
            <div class="ai-badge">Insightful</div>
            <div class="feature-icon"><i class="fas fa-chart-line"></i></div>
            <h3 class="feature-title">Laporan & Analitik</h3>
            <p class="feature-description">Hasilkan laporan komprehensif untuk pengambilan keputusan berbasis data.</p>
          </router-link>

          <router-link to="/mobile" class="feature-card ai-powered">
            <div class="ai-badge">On-The-Go</div>
            <div class="feature-icon"><i class="fas fa-mobile-alt"></i></div>
            <h3 class="feature-title">Akses Mobile</h3>
            <p class="feature-description">Kelola data center Anda dari mana saja dengan aplikasi mobile kami.</p>
          </router-link>

          <router-link to="/roi-calculator" class="feature-card ai-powered">
            <div class="ai-badge">Smart Finance</div>
            <div class="feature-icon"><i class="fas fa-calculator"></i></div>
            <h3 class="feature-title">Kalkulator ROI</h3>
            <p class="feature-description">Hitung potensi penghematan dan laba atas investasi Anda dengan EnviroGuard.
            </p>
          </router-link>

          <router-link to="/chatbot" class="feature-card ai-powered">
            <div class="ai-badge pulse">24/7 Support</div>
            <div class="feature-icon"><i class="fas fa-robot"></i></div>
            <h3 class="feature-title">Asisten Chatbot AI</h3>
            <p class="feature-description">Dapatkan bantuan instan dan panduan cerdas dari asisten virtual kami.</p>
          </router-link>
        </div>

        <div class="ai-features-banner">
          <h2 class="ai-features-title">🤖 Powered by Advanced AI & MCP Integration</h2>
          <p class="ai-features-subtitle">Teknologi terdepan untuk monitoring dan optimasi data center yang cerdas</p>

          <div class="ai-features-grid">
            <div class="ai-feature-item">
              <div class="ai-feature-icon">
                <i class="fas fa-brain"></i>
              </div>
              <h4>Machine Learning Analytics</h4>
              <p>Analisis prediktif berbasis ML untuk optimasi performa dan efisiensi energi</p>
            </div>

            <div class="ai-feature-item">
              <div class="ai-feature-icon">
                <i class="fas fa-network-wired"></i>
              </div>
              <h4>MCP Server Integration</h4>
              <p>Koneksi real-time dengan Model Context Protocol untuk data processing yang canggih</p>
            </div>

            <div class="ai-feature-item">
              <div class="ai-feature-icon">
                <i class="fas fa-robot"></i>
              </div>
              <h4>Intelligent Automation</h4>
              <p>Otomasi cerdas untuk maintenance, cooling, dan power management</p>
            </div>

            <div class="ai-feature-item">
              <div class="ai-feature-icon">
                <i class="fas fa-comments"></i>
              </div>
              <h4>Natural Language Interface</h4>
              <p>Chatbot AI dengan pemahaman bahasa natural untuk interaksi yang intuitif</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <router-link to="/chatbot" class="floating-chatbot" title="Tanya AI Assistant">
      <i class="fas fa-robot"></i>
      <div class="chatbot-tooltip">Tanya AI Assistant</div>
    </router-link>

  </main>

  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">EnviroGuard</div>
        <p class="footer-text">Memberdayakan Masa Depan Data Center yang Efisien dan Cerdas.</p>
      </div>
      <div class="footer-bottom">
        &copy; 2024 EnviroGuard. Semua Hak Cipta Dilindungi.
      </div>
    </div>
  </footer>
</template>

<script setup>
import '@fortawesome/fontawesome-free/css/all.min.css';

import { onMounted } from 'vue';

// onMounted adalah hook yang akan dijalankan setelah komponen di-render
onMounted(() => {
  // Smooth scrolling untuk anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Header scroll effect
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) { // Cek apakah elemen header ada
      if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
      } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
      }
    }
  });
});
</script>

<style>
:root {
  --primary: #1a73e8;
  --primary-dark: #0d47a1;
  --secondary: #34a853;
  --accent: #fbbc04;
  --danger: #ea4335;
  --dark: #202124;
  --gray: #5f6368;
  --light-gray: #f8f9fa;
  --white: #ffffff;
  --gradient-primary: linear-gradient(135deg, #1a73e8, #0d47a1);
  --gradient-secondary: linear-gradient(135deg, #34a853, #2e7d32);
  --gradient-accent: linear-gradient(135deg, #fbbc04, #f57c00);
  --shadow: 0 8px 32px rgba(26, 115, 232, 0.1);
  --shadow-hover: 0 16px 48px rgba(26, 115, 232, 0.2);
  --border-radius: 16px;
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* TIPS: Gaya untuk body sebaiknya diletakkan di file CSS global atau di App.vue */
body {
  font-family: 'Inter', sans-serif;
  background-color: var(--light-gray);
  /* Latar belakang dasar */
  /* Hapus overflow: hidden agar halaman bisa di-scroll */
  /* overflow: hidden; */
}
</style>

<style scoped>
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Header */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 1000;
  transition: var(--transition);
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

/* Hero Section */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>') repeat;
  opacity: 0.3;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  padding: 0 1rem;
}

.hero h1 {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff, #e3f2fd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
  line-height: 1.1;
}

.hero p {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 3rem;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 1rem 2rem;
  border-radius: var(--border-radius);
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: var(--transition);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background: var(--gradient-primary);
  color: white;
  box-shadow: var(--shadow);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

/* Features Grid */
.features {
  padding: 6rem 0;
  background: var(--white);
}

.section-title {
  text-align: center;
  font-size: 3rem;
  font-weight: 800;
  color: var(--dark);
  margin-bottom: 1rem;
}

.section-subtitle {
  text-align: center;
  font-size: 1.25rem;
  color: var(--gray);
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
}

.feature-card {
  background: var(--white);
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: var(--shadow);
  transition: var(--transition);
  border: 1px solid rgba(26, 115, 232, 0.1);
  position: relative;
  overflow: hidden;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  color: var(--gray);
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(26, 115, 232, 0.1), transparent);
  transition: var(--transition);
}

.feature-card:hover::before {
  left: 100%;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-hover);
}

.feature-card.ai-powered {
  background: linear-gradient(135deg, var(--white) 0%, rgba(26, 115, 232, 0.05) 100%);
  border: 2px solid rgba(26, 115, 232, 0.2);
}

.ai-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--gradient-primary);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.pulse {
  animation: pulse 2s infinite;
}

.feature-icon {
  width: 60px;
  height: 60px;
  background: var(--gradient-primary);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  flex-shrink: 0;
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--dark);
  margin-bottom: 1rem;
}

.feature-description {
  color: var(--gray);
  line-height: 1.6;
  margin-bottom: 0;
}

/* AI Features Banner */
.ai-features-banner {
  background: linear-gradient(135deg, rgba(26, 115, 232, 0.05) 0%, rgba(52, 168, 83, 0.05) 100%);
  border: 1px solid rgba(26, 115, 232, 0.1);
  border-radius: var(--border-radius);
  padding: 3rem 2rem;
  margin-top: 5rem;
  /* Beri jarak dari grid di atasnya */
  text-align: center;
  position: relative;
  overflow: hidden;
}

.ai-features-banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  animation: shimmer 4s infinite;
}

.ai-features-title {
  font-size: 2rem;
  font-weight: 700;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
}

.ai-features-subtitle {
  font-size: 1.1rem;
  color: var(--gray);
  margin-bottom: 2.5rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.ai-features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.ai-feature-item {
  background: rgba(255, 255, 255, 0.7);
  padding: 1.5rem;
  border-radius: var(--border-radius);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  transition: var(--transition);
}

.ai-feature-item:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow);
}

.ai-feature-icon {
  width: 50px;
  height: 50px;
  background: var(--gradient-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  margin: 0 auto 1rem;
}

.ai-feature-item h4 {
  color: var(--dark);
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.ai-feature-item p {
  color: var(--gray);
  font-size: 0.9rem;
  line-height: 1.5;
}


/* Floating Chatbot */
.floating-chatbot {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  background: var(--gradient-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: var(--shadow-hover);
  transition: var(--transition);
  z-index: 1000;
  animation: float 3s ease-in-out infinite;
}

.floating-chatbot:hover {
  transform: scale(1.1);
  box-shadow: 0 10px 30px rgba(26, 115, 232, 0.4);
}

.chatbot-tooltip {
  position: absolute;
  bottom: 70px;
  right: 0;
  background: var(--dark);
  color: white;
  padding: 0.75rem 1rem;
  border-radius: var(--border-radius);
  font-size: 0.9rem;
  white-space: nowrap;
  opacity: 0;
  transform: translateY(10px);
  transition: var(--transition);
  pointer-events: none;
}

.chatbot-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  right: 20px;
  border: 8px solid transparent;
  border-top-color: var(--dark);
}

.floating-chatbot:hover .chatbot-tooltip {
  opacity: 1;
  transform: translateY(0);
}

/* Footer */
.footer {
  background: var(--dark);
  color: white;
  padding: 3rem 0 1rem;
  text-align: center;
}

.footer-content {
  margin-bottom: 2rem;
}

.footer-logo {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.footer-text {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1rem;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1rem;
  color: rgba(255, 255, 255, 0.5);
}

/* Responsive Design */
@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
  }

  .ai-features-grid {
    grid-template-columns: 1fr;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }

  .hero h1 {
    font-size: 3rem;
  }

  .section-title,
  .ai-features-title {
    font-size: 2.2rem;
  }
}

/* Animations */
@keyframes shimmer {
  0% {
    left: -100%;
  }

  100% {
    left: 100%;
  }
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

@keyframes pulse {

  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(26, 115, 232, 0.7);
    opacity: 1;
  }

  70% {
    box-shadow: 0 0 0 10px rgba(26, 115, 232, 0);
    opacity: 0.7;
  }

  100% {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.feature-card,
.ai-features-banner {
  animation: fadeInUp 0.5s ease-out forwards;
}

.feature-card:nth-child(1) {
  animation-delay: 0.1s;
}

.feature-card:nth-child(2) {
  animation-delay: 0.2s;
}

.feature-card:nth-child(3) {
  animation-delay: 0.3s;
}

.feature-card:nth-child(4) {
  animation-delay: 0.4s;
}

.feature-card:nth-child(5) {
  animation-delay: 0.5s;
}

.feature-card:nth-child(6) {
  animation-delay: 0.6s;
}

.feature-card:nth-child(7) {
  animation-delay: 0.7s;
}

.feature-card:nth-child(8) {
  animation-delay: 0.8s;
}

.feature-card:nth-child(9) {
  animation-delay: 0.9s;
}

.ai-features-banner {
  animation-delay: 1s;
}
</style>