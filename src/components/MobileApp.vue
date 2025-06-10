<template>
    <header class="header">
        <nav class="nav">
            <a>
                <div>
                    <img src="/src/assets/images/logo.jpeg" alt="Logo" style="width: 135px; height: auto" />
                </div>
            </a>
            <div class="nav-links">
                <router-link to="/dashboard" class="nav-link"> Dashboard </router-link>
                <router-link to="/rack" class="nav-link"> Rak Server </router-link>
                <router-link to="/asset" class="nav-link"> Aset </router-link>
                <router-link to="/visitor" class="nav-link"> Pengunjung </router-link>
                <router-link to="/monitoring" class="nav-link">
                    Monitoring
                </router-link>
                <router-link to="/laporan" class="nav-link"> Laporan </router-link>
                <router-link to="/mobile" class="nav-link"> Mobile </router-link>
            </div>
        </nav>
    </header>

    <main class="main">
        <div class="page-header">
            <h1 class="page-title">EnviroGuard Mobile</h1>
            <p class="page-subtitle">
                Akses penuh ke sistem monitoring data center Anda dari mana saja, kapan
                saja. Aplikasi mobile yang powerful dengan interface yang intuitif.
            </p>
        </div>

        <div class="app-showcase">
            <div class="app-info">
                <h2 class="app-title">Monitoring On-the-Go</h2>
                <p class="app-description">
                    Dengan aplikasi EnviroGuard Mobile, Anda dapat memantau kondisi data
                    center secara real-time, menerima notifikasi penting, dan mengambil
                    tindakan cepat dari perangkat mobile Anda.
                </p>
                <div class="download-buttons">
                    <a href="#" class="download-btn primary" @click="downloadApp('ios')">
                        <i class="fab fa-apple download-icon"></i>
                        <div>
                            <div style="font-size: 0.8rem; opacity: 0.8">Download on the</div>
                            <div>App Store</div>
                        </div>
                    </a>
                    <a href="#" class="download-btn" @click="downloadApp('android')">
                        <i class="fab fa-google-play download-icon"></i>
                        <div>
                            <div style="font-size: 0.8rem; opacity: 0.8">Get it on</div>
                            <div>Google Play</div>
                        </div>
                    </a>
                </div>
            </div>
            <div class="phone-mockup">
                <div class="phone-frame">
                    <div class="phone-screen">
                        <div class="screen-content">
                            <div class="app-header">
                                <div class="app-logo">EnviroGuard</div>
                                <div class="notification-badge" :class="{ pulsing: notificationPulse }">
                                    3
                                </div>
                            </div>
                            <div class="dashboard-cards">
                                <div class="mini-card">
                                    <div class="mini-card-value">
                                        {{ mockupData.temperature }}°C
                                    </div>
                                    <div class="mini-card-label">Temperature</div>
                                </div>
                                <div class="mini-card">
                                    <div class="mini-card-value">{{ mockupData.humidity }}%</div>
                                    <div class="mini-card-label">Humidity</div>
                                </div>
                                <div class="mini-card">
                                    <div class="mini-card-value">{{ mockupData.power }}kW</div>
                                    <div class="mini-card-label">Power</div>
                                </div>
                                <div class="mini-card">
                                    <div class="mini-card-value">{{ mockupData.uptime }}%</div>
                                    <div class="mini-card-label">Uptime</div>
                                </div>
                            </div>
                            <div class="quick-actions">
                                <div class="action-title">Quick Actions</div>
                                <div class="action-list">
                                    <div class="action-item">
                                        <div>View Reports</div>
                                    </div>
                                    <div class="action-item">
                                        <div>Check Alerts</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="features-grid">
            <div v-for="(feature, index) in features" :key="feature.title" class="feature-card"
                :style="{ animationDelay: `${index * 0.1}s` }">
                <div :class="['feature-icon', feature.color]">
                    <i :class="feature.icon"></i>
                </div>
                <h3 class="feature-title">{{ feature.title }}</h3>
                <p class="feature-description">{{ feature.description }}</p>
            </div>
        </div>

        <div class="screenshots">
            <h2 class="screenshots-title">App Screenshots</h2>
            <p class="screenshots-subtitle">
                Lihat tampilan dan fitur-fitur utama aplikasi EnviroGuard Mobile
            </p>
            <div class="screenshots-grid">
                <div v-for="screenshot in screenshots" :key="screenshot.label" class="screenshot-item">
                    <div class="phone-mockup static">
                        <div class="phone-frame">
                            <div :class="screenshot.screenClass">
                                <div class="screen-content">
                                    <div class="app-header">
                                        <div class="app-logo">EnviroGuard</div>
                                        <div class="notification-badge">3</div>
                                    </div>
                                    <div class="dashboard-cards">
                                        <div class="mini-card">
                                            <div class="mini-card-value">24.5°C</div>
                                            <div class="mini-card-label">Temperature</div>
                                        </div>
                                        <div class="mini-card">
                                            <div class="mini-card-value">59%</div>
                                            <div class="mini-card-label">Humidity</div>
                                        </div>
                                        <div class="mini-card">
                                            <div class="mini-card-value">9.0kW</div>
                                            <div class="mini-card-label">Power</div>
                                        </div>
                                        <div class="mini-card">
                                            <div class="mini-card-value">99.8%</div>
                                            <div class="mini-card-label">Uptime</div>
                                        </div>
                                    </div>
                                    <div class="quick-actions">
                                        <div class="action-title">Quick Actions</div>
                                        <div class="action-list">
                                            <div class="action-item">View Reports</div>
                                            <div class="action-item">Check Alerts</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="screenshot-label">{{ screenshot.label }}</div>
                </div>
            </div>
        </div>

        <div class="qr-section">
            <h2 class="qr-title">Download Sekarang</h2>
            <p class="qr-subtitle">
                Scan QR code di bawah ini untuk mengunduh aplikasi langsung ke perangkat
                Anda
            </p>
            <div class="qr-code">
                <img src="/src/assets/images/qr-code.jpg" alt="QR Code untuk download aplikasi"
                    style="width: 100%; height: 100%; border-radius: 12px" />
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from "vue";

// --- Reactive State ---

const mockupData = reactive({
    temperature: 24.5,
    humidity: 59,
    power: 9.0,
    uptime: 99.8,
});

const features = reactive([
    {
        title: "Real-time Monitoring",
        description:
            "Pantau kondisi data center secara real-time dengan update otomatis setiap detik. Dapatkan informasi terkini tentang suhu, kelembaban, dan performa sistem.",
        icon: "fas fa-mobile-alt",
        color: "",
    },
    {
        title: "Smart Notifications",
        description:
            "Terima notifikasi push untuk alert penting, maintenance schedule, dan anomali sistem. Kustomisasi pengaturan notifikasi sesuai kebutuhan Anda.",
        icon: "fas fa-bell",
        color: "secondary",
    },
    {
        title: "Interactive Charts",
        description:
            "Visualisasi data dengan grafik interaktif yang responsif. Analisis trend dan pattern dengan mudah melalui interface yang user-friendly.",
        icon: "fas fa-chart-bar",
        color: "accent",
    },
    {
        title: "Secure Access",
        description:
            "Keamanan tingkat enterprise dengan enkripsi end-to-end, biometric authentication, dan multi-factor authentication untuk melindungi data sensitif.",
        icon: "fas fa-shield-alt",
        color: "warning",
    },
]);

// DIUBAH: Menambahkan properti `screenClass` pada setiap objek screenshot
const screenshots = reactive([
    { label: "Dashboard", image: "/src/assets/images/demoApp.png", screenClass: "phone-screen" },
    { label: "Monitoring", image: "/src/assets/images/demoApp.png", screenClass: "phone-screen2" },
    { label: "Alerts", image: "/src/assets/images/demoApp.png", screenClass: "phone-screen3" },
    { label: "Reports", image: "/src/assets/images/demoApp.png", screenClass: "phone-screen4" },
]);

const notificationPulse = ref(false);
let mockupInterval = null;
let notificationInterval = null;

// --- Methods ---

function downloadApp(platform) {
    if (platform === "ios") {
        alert(
            "Mengarahkan ke App Store...\n\nAplikasi akan segera tersedia di App Store."
        );
    } else if (platform === "android") {
        alert(
            "Mengarahkan ke Google Play Store...\n\nAplikasi akan segera tersedia di Google Play Store."
        );
    }
}

function updateMockupData() {
    mockupData.temperature = (20 + Math.random() * 5).toFixed(1);
    mockupData.humidity = Math.floor(50 + Math.random() * 10);
    mockupData.power = (7 + Math.random() * 2).toFixed(1);
    mockupData.uptime = (98 + Math.random() * 1.9).toFixed(1);
}

function animateNotificationBadge() {
    notificationPulse.value = true;
    setTimeout(() => {
        notificationPulse.value = false;
    }, 300);
}

// --- Lifecycle Hooks ---

onMounted(() => {
    mockupInterval = setInterval(updateMockupData, 3000);
    notificationInterval = setInterval(animateNotificationBadge, 5000);
});

onUnmounted(() => {
    clearInterval(mockupInterval);
    clearInterval(notificationInterval);
});
</script>

<style scoped>
/* CSS Variables */
:root {
    --primary: #1a73e8;
    --primary-dark: #0d47a1;
    --secondary: #34a853;
    --accent: #fbbc04;
    --danger: #ea4335;
    --warning: #ff9800;
    --dark: #202124;
    --gray: #5f6368;
    --light-gray: #f8f9fa;
    --white: #ffffff;
    --gradient-primary: linear-gradient(135deg, #1a73e8, #0d47a1);
    --gradient-secondary: linear-gradient(135deg, #34a853, #2e7d32);
    --gradient-accent: linear-gradient(135deg, #fbbc04, #f57c00);
    --gradient-danger: linear-gradient(135deg, #ea4335, #c62828);
    --shadow: 0 8px 32px rgba(26, 115, 232, 0.1);
    --shadow-hover: 0 16px 48px rgba(26, 115, 232, 0.2);
    --border-radius: 16px;
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Global Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:global(body) {
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        sans-serif;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    min-height: 100vh;
    color: var(--dark);
}

/* Header & Nav */
.header {
    background: var(--white);
    box-shadow: var(--shadow);
    position: sticky;
    top: 0;
    z-index: 1000;
    flex-shrink: 0;
}

.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    max-width: 1400px;
    margin: 0 auto;
}

.nav-links {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.nav-link {
    color: var(--gray);
    text-decoration: none;
    font-weight: 500;
    transition: var(--transition);
    padding: 0.5rem 1rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.nav-link:hover,
.nav-link.router-link-active {
    color: var(--primary);
    background: rgba(26, 115, 232, 0.1);
}

/* Main Content */
.main {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
}

.page-header {
    text-align: center;
    margin-bottom: 3rem;
}

.page-title {
    font-size: 3rem;
    font-weight: 800;
    color: var(--dark);
    margin-bottom: 1rem;
}

.page-subtitle {
    color: var(--gray);
    font-size: 1.2rem;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
}

/* App Showcase */
.app-showcase {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    margin-bottom: 4rem;
}

.app-info {
    padding: 2rem 0;
}

.app-title {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 1rem;
}

.app-description {
    color: var(--gray);
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 2rem;
}

.download-buttons {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
}

.download-btn {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.5rem;
    background: var(--dark);
    color: white;
    text-decoration: none;
    border-radius: 12px;
    font-weight: 600;
    transition: var(--transition);
    box-shadow: var(--shadow);
}

.download-btn:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: var(--shadow-hover);
}

.download-btn.primary {
    background: var(--gradient-primary);
}

.download-icon {
    font-size: 1.5rem;
}

.phone-mockup {
    position: relative;
    max-width: 300px;
    margin: 0 auto;
    animation: float 4s ease-in-out infinite;
}

.phone-mockup.static {
    animation: none;
}

.phone-frame {
    width: 300px;
    height: 600px;
    background: var(--dark);
    border-radius: 40px;
    padding: 15px;
    box-shadow: var(--shadow-hover);
    position: relative;
    border: 5px solid #333;
}

/* KELAS-KELAS INI SEKARANG DIGUNAKAN UNTUK SCREENSHOTS */
.phone-screen {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 25px;
    position: relative;
    overflow: hidden;
}

.phone-screen2 {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #ff9a8b 0%, #ff6a88 100%);
    border-radius: 25px;
    position: relative;
    overflow: hidden;
}

.phone-screen3 {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #2eefd0 0%, #1a92a7 100%);
    border-radius: 25px;
    position: relative;
    overflow: hidden;
}

.phone-screen4 {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #96e6a1 0%, #297a39 100%);
    border-radius: 25px;
    position: relative;
    overflow: hidden;
}

.screen-content {
    padding: 1.5rem;
    color: white;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    flex-shrink: 0;
}

.app-logo {
    font-size: 1.2rem;
    font-weight: 700;
}

.notification-badge {
    width: 24px;
    height: 24px;
    background: var(--danger);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: 600;
    border: 2px solid rgba(255, 255, 255, 0.2);
    transition: transform 0.2s ease-out;
}

.notification-badge.pulsing {
    transform: scale(1.25);
}

.dashboard-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.8rem;
    margin-bottom: 1.5rem;
}

.mini-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    padding: 0.8rem;
    text-align: left;
}

.mini-card-value {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
}

.mini-card-label {
    font-size: 0.75rem;
    opacity: 0.8;
}

.quick-actions {
    flex-grow: 1;
}

.action-title {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.8rem;
}

.action-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.action-item {
    padding: 0.75rem 1rem;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    font-size: 0.9rem;
}

/* Features Grid */
.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;
}

.feature-card {
    background: var(--white);
    border-radius: var(--border-radius);
    padding: 2rem;
    box-shadow: var(--shadow);
    transition: var(--transition);
    text-align: center;
    cursor: pointer;
    animation: fadeInUp 0.6s ease-out forwards;
}

.feature-card:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-hover);
}

.feature-icon {
    width: 80px;
    height: 80px;
    background: var(--gradient-primary);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: white;
    margin: 0 auto 1.5rem;
    transition: transform 0.3s ease;
}

.feature-card:hover .feature-icon {
    transform: scale(1.1) rotate(5deg);
}

.feature-icon.secondary {
    background: var(--gradient-secondary);
}

.feature-icon.accent {
    background: var(--gradient-accent);
}

.feature-icon.warning {
    background: var(--gradient-danger);
}

.feature-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
}

.feature-description {
    color: var(--gray);
    line-height: 1.6;
}

/* Screenshots Section */
.screenshots {
    background: var(--white);
    border-radius: var(--border-radius);
    padding: 3rem 2rem;
    box-shadow: var(--shadow);
    text-align: center;
    margin-bottom: 4rem;
}

.screenshots-title {
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 1rem;
}

.screenshots-subtitle {
    color: var(--gray);
    font-size: 1.1rem;
    margin-bottom: 3rem;
}

.screenshots-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 3rem;
    max-width: 1200px;
    margin: 0 auto;
    align-items: start;
}

.screenshot-item {
    text-align: center;
}

.screenshot-label {
    margin-top: 1.5rem;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--dark);
}

/* QR Code Section */
.qr-section {
    background: var(--gradient-primary);
    color: white;
    border-radius: var(--border-radius);
    padding: 3rem 2rem;
    text-align: center;
}

.qr-title {
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 1rem;
}

.qr-subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
    margin-bottom: 2rem;
}

.qr-code {
    width: 200px;
    height: 200px;
    background: white;
    border-radius: 16px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Responsive Design */
@media (max-width: 992px) {
    .app-showcase {
        grid-template-columns: 1fr;
        gap: 2rem;
        text-align: center;
    }

    .download-buttons {
        justify-content: center;
    }
}

@media (max-width: 768px) {
    .nav {
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
    }

    .nav-links {
        gap: 0.2rem;
        flex-wrap: wrap;
        justify-content: center;
        font-size: 0.9rem;
    }

    .main {
        padding: 1rem;
    }

    .page-title {
        font-size: 2rem;
    }

    .app-title {
        font-size: 2rem;
    }

    .screenshots-grid {
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 2.5rem;
    }
}

/* Animations */
@keyframes float {

    0%,
    100% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-15px);
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
</style>