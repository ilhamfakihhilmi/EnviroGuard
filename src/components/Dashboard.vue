<template>
    <Dashboard v-if="showRakServer" />

    <header class="header">
        <nav class="nav">
            <a href="index.html">
                <div>
                    <img src="/src/assets/images/logo.jpeg" alt="Logo" style="width: 135px; height: auto;" />
                </div>
            </a>
            <div class="nav-links">
                <router-link to="/dashboard" class="nav-link">
                    <i class="fas fa-tachometer-alt"></i>
                    Dashboard
                </router-link>
                <router-link to="/rack" class="nav-link">
                    <i class="fas fa-tachometer-alt"></i>
                    Rak Server
                </router-link>
                <router-link to="/asset" class="nav-link">
                    <i class="fas fa-tachometer-alt"></i>
                    Aset
                </router-link>
                <router-link to="/visitor" class="nav-link">
                    <i class="fas fa-tachometer-alt"></i>
                    Pengunjung
                </router-link>
                <router-link to="/monitoring" class="nav-link">
                    <i class="fas fa-tachometer-alt"></i>
                    Monitoring
                </router-link>
                <router-link to="/laporan" class="nav-link">
                    <i class="fas fa-tachometer-alt"></i>
                    Laporan
                </router-link>
                <router-link to="/mobile" class="nav-link">
                    <i class="fas fa-tachometer-alt"></i>
                    Mobile
                </router-link>
            </div>
        </nav>
    </header>

    <main class="main">
        <div class="page-header">
            <h1 class="page-title">EnviroGuard Dashboard</h1>
            <p class="page-subtitle">Real-time monitoring dengan AI analytics dan MCP server integration</p>
            <div class="ai-insights-banner">
                <div class="ai-insight-item">
                    <i class="fas fa-brain"></i>
                    <span>{{ aiInsightEfficiency }}</span>
                </div>
                <div class="ai-insight-item">
                    <i class="fas fa-bolt"></i>
                    <span>{{ aiInsightEnergy }}</span>
                </div>
                <div class="ai-insight-item">
                    <i class="fas fa-shield-alt"></i>
                    <span>{{ aiInsightAnomaly }}</span>
                </div>
            </div>
        </div>

        <div class="dashboard-grid">
            <div class="dashboard-card ai-enhanced">
                <div class="ai-badge">AI Optimized</div>
                <div class="card-header">
                    <div class="card-title">Total Rak</div>
                    <div class="card-icon" style="background: var(--gradient-primary);">
                        <i class="fas fa-server"></i>
                    </div>
                </div>
                <div class="card-value">{{ totalRacks }}</div>
                <div class="card-subtitle">Server racks aktif</div>
                <div class="mcp-data">MCP: {{ mcpLastUpdate }}</div>
            </div>

            <div class="dashboard-card">
                <div class="card-header">
                    <div class="card-title">Penggunaan Kapasitas</div>
                    <div class="card-icon" style="background: var(--gradient-secondary);">
                        <i class="fas fa-chart-pie"></i>
                    </div>
                </div>
                <div class="card-value">{{ capacity }}%</div>
                <div class="card-subtitle">Dari total kapasitas</div>
                <div class="usage-bar">
                    <div class="usage-fill" :style="{ width: capacity + '%', background: 'var(--gradient-secondary)' }">
                    </div>
                </div>
            </div>

            <div class="dashboard-card">
                <div class="card-header">
                    <div class="card-title">Penggunaan Power</div>
                    <div class="card-icon" style="background: var(--gradient-accent);">
                        <i class="fas fa-bolt"></i>
                    </div>
                </div>
                <div class="card-value">{{ power }}%</div>
                <div class="card-subtitle">Dari total daya tersedia</div>
                <div class="usage-bar">
                    <div class="usage-fill" :style="{ width: power + '%', background: 'var(--gradient-accent)' }">
                    </div>
                </div>
            </div>

            <div class="dashboard-card">
                <div class="card-header">
                    <div class="card-title">Pengunjung Hari Ini</div>
                    <div class="card-icon" style="background: var(--gradient-primary);">
                        <i class="fas fa-users"></i>
                    </div>
                </div>
                <div class="card-value">{{ visitors }}</div>
                <div class="card-subtitle">8 Terjadwal, 4 Check-in</div>
            </div>
        </div>

        <div class="status-grid">
            <div class="status-card status-active">
                <div class="status-number">{{ statusActive }}</div>
                <div class="status-label">Aktif</div>
            </div>
            <div class="status-card status-maintenance">
                <div class="status-number">{{ statusMaintenance }}</div>
                <div class="status-label">Maintenance</div>
            </div>
            <div class="status-card status-critical">
                <div class="status-number">{{ statusCritical }}</div>
                <div class="status-label">Perlu Perhatian</div>
            </div>
        </div>

        <div class="chart-container">
            <div class="chart-header">
                <h3 class="chart-title">Trend Penggunaan Daya (7 Hari Terakhir)</h3>
            </div>
            <div style="height: 350px;">
                <Line :data="chartData" :options="chartOptions" />
            </div>
        </div>
        <div class="activity-list">
            <div class="activity-header">
                <h3 class="activity-title">Aktivitas Terbaru</h3>
            </div>
            <div class="activity-item">
                <div class="activity-icon" style="background: var(--gradient-secondary);">
                    <i class="fas fa-check"></i>
                </div>
                <div class="activity-content">
                    <div class="activity-text">Server maintenance completed - Rack AB-12</div>
                    <div class="activity-time">2 menit yang lalu</div>
                </div>
            </div>
            <div class="activity-item">
                <div class="activity-icon" style="background: var(--gradient-accent);">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <div class="activity-content">
                    <div class="activity-text">Temperature alert - Room 302</div>
                    <div class="activity-time">15 menit yang lalu</div>
                </div>
            </div>
            <div class="activity-item">
                <div class="activity-icon" style="background: var(--gradient-primary);">
                    <i class="fas fa-user-plus"></i>
                </div>
                <div class="activity-content">
                    <div class="activity-text">New visitor checked in - Ahmad Khairi</div>
                    <div class="activity-time">1 jam yang lalu</div>
                </div>
            </div>
            <div class="activity-item">
                <div class="activity-icon" style="background: var(--gradient-secondary);">
                    <i class="fas fa-plus"></i>
                </div>
                <div class="activity-content">
                    <div class="activity-text">New asset added - Dell PowerEdge R740</div>
                    <div class="activity-time">3 jam yang lalu</div>
                </div>
            </div>
        </div>
    </main>

    <div class="ai-notification-container">
        <transition-group name="slide">
            <div v-for="notification in notifications" :key="notification.id" class="ai-notification">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-robot" style="color: #4caf50;"></i>
                    <span>{{ notification.message }}</span>
                </div>
            </div>
        </transition-group>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import RakServer from './Rack.vue';

// --- IMPOR UNTUK CHART.JS ---
import { Line } from 'vue-chartjs';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

// --- REGISTRASI KOMPONEN CHART.JS ---
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

// --- DATA & OPSI UNTUK CHART ---
const chartData = {
    labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
    datasets: [{
        label: 'Penggunaan Daya (%)',
        data: [65, 68, 72, 70, 75, 77, 72],
        backgroundColor: 'rgba(26, 115, 232, 0.2)',
        borderColor: '#1a73e8',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#1a73e8',
        pointHoverBorderColor: '#0d47a1',
        pointHoverRadius: 7,
    },],
};

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            enabled: true,
            backgroundColor: '#202124',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            borderColor: '#5f6368',
            borderWidth: 1,
            displayColors: false,
            callbacks: {
                label: function (context) {
                    return `Penggunaan: ${context.parsed.y}%`;
                }
            }
        },
    },
    scales: {
        y: {
            beginAtZero: false,
            grid: {
                color: '#f1f3f4',
            },
            ticks: {
                callback: function (value) {
                    return value + '%'
                }
            }
        },
        x: {
            grid: {
                display: false,
            },
        },
    },
};


// --- State Reaktif Dashboard ---
const showRakServer = ref(false);

const navigateToRakServer = () => {
    showRakServer.value = true;
};

const totalRacks = ref(128);
const capacity = ref(68);
const power = ref(72);
const visitors = ref(12);

const statusActive = ref(512);
const statusMaintenance = ref(23);
const statusCritical = ref(7);

const aiInsightEfficiency = ref('AI Prediction: 98.5% system efficiency next 24h');
const aiInsightEnergy = ref('Energy optimization: 15% savings detected');
const aiInsightAnomaly = ref('Anomaly detection: All systems normal');

const mcpIsConnected = ref(true);
const mcpLastUpdate = ref(`Last update ${new Date().toLocaleTimeString('id-ID')}`);

const notifications = ref([]);
let metricInterval = null;
let learningInterval = null;

// --- Logika (Methods) Dashboard ---

function updateAIMetrics() {
    capacity.value = Math.floor(Math.random() * 5) + 66; // 66-70%
    power.value = Math.floor(Math.random() * 6) + 70; // 70-75%
    visitors.value = Math.floor(Math.random() * 5) + 10; // 10-14

    const efficiencyPrediction = (95 + Math.random() * 4).toFixed(1);
    const confidence = (94 + Math.random() * 5).toFixed(1);
    aiInsightEfficiency.value = `AI Prediction: ${efficiencyPrediction}% system efficiency (${confidence}% confidence)`;
    aiInsightEnergy.value = `Energy optimization: ${(12 + Math.random() * 8).toFixed(1)}% savings detected`;
    aiInsightAnomaly.value = `Anomaly detection: ${Math.random() > 0.1 ? 'Minor anomaly in Rack-B' : 'All systems normal'}`;

    updateMCPStatus();
}

function updateMCPStatus() {
    mcpIsConnected.value = Math.random() > 0.05; // Simulasi uptime 95%
    mcpLastUpdate.value = `Last update ${new Date().toLocaleTimeString('id-ID')}`;
}

function showAINotification(message) {
    const id = Date.now();
    notifications.value.push({ id, message });

    setTimeout(() => {
        notifications.value = notifications.value.filter(n => n.id !== id);
    }, 4000);
}

function simulateAILearning() {
    const learningMessages = [
        'AI model updated with new patterns',
        'Machine learning optimization complete',
        'Predictive algorithms recalibrated',
        'Neural network training in progress',
        'AI insights generation completed'
    ];
    if (Math.random() > 0.7) {
        const message = learningMessages[Math.floor(Math.random() * learningMessages.length)];
        showAINotification(message);
    }
}

// --- Lifecycle Hooks ---

onMounted(() => {
    updateAIMetrics();
    setTimeout(() => {
        showAINotification('AI system initialized successfully');
    }, 1500);

    metricInterval = setInterval(updateAIMetrics, 3000);
    learningInterval = setInterval(simulateAILearning, 15000);
});

onUnmounted(() => {
    clearInterval(metricInterval);
    clearInterval(learningInterval);
});

</script>

<style>
/* --- CSS --- */
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
    --gradient-danger: linear-gradient(135deg, #ea4335, #c62828);
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

html,
body {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
}

#app {
    height: 100%;
    display: flex;
    flex-direction: column;
}

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

.logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--primary);
    text-decoration: none;
}

.nav-links {
    display: flex;
    gap: 2rem;
    align-items: center;
}

.nav-link {
    color: var(--gray);
    text-decoration: none;
    font-weight: 500;
    transition: var(--transition);
    padding: 0.5rem 1rem;
    border-radius: 8px;
}

.nav-link:hover {
    color: var(--primary);
    background: rgba(26, 115, 232, 0.1);
}

.main {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
    width: 100%;
    flex-grow: 1;
}

.page-header {
    margin-bottom: 2rem;
}

.page-title {
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--dark);
    margin-bottom: 0.5rem;
}

.page-subtitle {
    color: var(--gray);
    font-size: 1.1rem;
}

.dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.dashboard-card {
    background: var(--white);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    box-shadow: var(--shadow);
    transition: var(--transition);
    position: relative;
    overflow: hidden;
    animation: fadeInUp 0.6s ease-out;
}

.dashboard-card:nth-child(1) {
    animation-delay: 0.1s;
}

.dashboard-card:nth-child(2) {
    animation-delay: 0.2s;
}

.dashboard-card:nth-child(3) {
    animation-delay: 0.3s;
}

.dashboard-card:nth-child(4) {
    animation-delay: 0.4s;
}

.dashboard-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--gradient-primary);
}

.dashboard-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-hover);
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.card-title {
    font-size: 0.9rem;
    color: var(--gray);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.card-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.2rem;
}

.card-value {
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--dark);
    margin-bottom: 0.5rem;
}

.card-subtitle {
    color: var(--gray);
    font-size: 0.9rem;
}

.usage-bar {
    height: 8px;
    background: var(--light-gray);
    border-radius: 4px;
    overflow: hidden;
    margin-top: 1rem;
}

.usage-fill {
    height: 100%;
    border-radius: 4px;
    transition: width var(--transition);
}

.status-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
}

.status-card {
    background: var(--white);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    text-align: center;
    box-shadow: var(--shadow);
    transition: var(--transition);
}

.status-card:hover {
    transform: translateY(-4px);
}

.status-number {
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
}

.status-label {
    color: var(--gray);
    font-size: 0.9rem;
    font-weight: 500;
}

.status-active .status-number {
    color: var(--secondary);
}

.status-maintenance .status-number {
    color: var(--accent);
}

.status-critical .status-number {
    color: var(--danger);
}

.chart-container {
    background: var(--white);
    border-radius: var(--border-radius);
    padding: 2rem;
    box-shadow: var(--shadow);
    margin-bottom: 2rem;
}

.chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.chart-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--dark);
}

.activity-list {
    background: var(--white);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    overflow: hidden;
}

.activity-header {
    padding: 1.5rem;
    border-bottom: 1px solid var(--light-gray);
}

.activity-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--dark);
}

.activity-item {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--light-gray);
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: var(--transition);
}

.activity-item:hover {
    background: var(--light-gray);
}

.activity-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1rem;
}

.activity-content {
    flex: 1;
}

.activity-text {
    font-weight: 500;
    color: var(--dark);
    margin-bottom: 0.25rem;
}

.activity-time {
    font-size: 0.8rem;
    color: var(--gray);
}

.ai-notification-container {
    position: fixed;
    top: 100px;
    right: 20px;
    z-index: 2000;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.ai-notification {
    background: linear-gradient(135deg, #1a73e8, #4285f4);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    font-size: 0.9rem;
    max-width: 300px;
    transition: all 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    transform: translateX(100%);
}

.slide-leave-active {
    position: absolute;
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

@media (max-width: 768px) {
    .nav {
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
    }

    .nav-links {
        gap: 0.5rem;
        flex-wrap: wrap;
        justify-content: center;
    }

    .main {
        padding: 1rem;
    }

    .page-title {
        font-size: 2rem;
    }

    .dashboard-grid {
        grid-template-columns: 1fr;
    }
}
</style>