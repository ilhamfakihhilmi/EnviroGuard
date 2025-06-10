<template>
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
                <!-- <router-link to="/roi" class="nav-link">
                    <i class="fas fa-tachometer-alt"></i>
                    Roi
                </router-link> -->
            </div>
        </nav>
    </header>

    <main class="main">
        <div class="page-header">
            <div>
                <h1 class="page-title">Monitoring Real-time</h1>
                <p class="page-subtitle">Pemantauan kondisi lingkungan dan sistem data center secara real-time</p>
            </div>
            <div class="status-indicator">
                <div class="status-dot"></div>
                <span>Sistem Aktif</span>
            </div>
        </div>

        <div class="monitoring-grid">
            <div v-for="(metric, index) in processedMetrics" :key="metric.title"
                :class="['monitor-card', metric.statusInfo.cardClass]" :style="{ animationDelay: `${index * 0.05}s` }">
                <div class="monitor-header">
                    <div class="monitor-title">{{ metric.title }}</div>
                    <div :class="['monitor-icon', metric.statusInfo.cardClass]">
                        <i :class="metric.icon"></i>
                    </div>
                </div>
                <div class="monitor-value">
                    <span>{{ metric.value.toFixed(metric.unit === 'kW' ? 1 : 0) }}</span>
                    <span class="monitor-unit">{{ metric.unit }}</span>
                </div>
                <div class="monitor-status">
                    <span :class="['status-badge', metric.statusInfo.badgeClass]">{{ metric.statusInfo.text }}</span>
                </div>
                <div class="monitor-chart">
                    <div class="chart-line" :style="{ height: `${metric.chartHeight}%` }"></div>
                </div>
            </div>
        </div>

        <div class="alert-panel">
            <div class="alert-header">
                <h3 class="alert-title">Alert Terbaru</h3>
                <span class="alert-count">{{ activeAlerts.length }}</span>
            </div>
            <div class="alert-list">
                <div v-for="alert in activeAlerts" :key="alert.id" class="alert-item">
                    <div :class="['alert-icon', alert.type]">
                        <i :class="alert.icon"></i>
                    </div>
                    <div class="alert-content">
                        <div class="alert-message">{{ alert.message }}</div>
                        <div class="alert-time">{{ alert.time }}</div>
                    </div>
                    <button class="alert-action" @click="handleAlert(alert)">
                        {{ alert.actionText }}
                    </button>
                </div>
                <div v-if="activeAlerts.length === 0" style="text-align: center; padding: 2rem; color: var(--gray);">
                    <i class="fas fa-check-circle"
                        style="font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--secondary);"></i>
                    <p>Tidak ada alert aktif. Sistem berjalan normal.</p>
                </div>
            </div>
        </div>

        <div class="system-overview">
            <div class="overview-chart">
                <div class="chart-header">
                    <h3 class="chart-title">Tren Konsumsi Daya</h3>
                    <div class="chart-controls">
                        <button v-for="timespan in chartTimespans" :key="timespan"
                            :class="['chart-btn', { active: activeTimespan === timespan }]"
                            @click="activeTimespan = timespan">
                            {{ timespan }}
                        </button>
                    </div>
                </div>
                <div class="chart-placeholder">
                    <i class="fas fa-chart-line" style="font-size: 3rem; margin-right: 1rem;"></i>
                    Grafik Konsumsi Daya Real-time ({{ activeTimespan }})
                </div>
            </div>

            <div class="system-stats">
                <h3 class="stats-title">Statistik Sistem</h3>
                <div v-for="stat in systemStats" :key="stat.label" class="stat-item">
                    <span class="stat-label">{{ stat.label }}</span>
                    <span class="stat-value">{{ stat.value }}</span>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';

// --- State Reaktif (Data Mentah) ---

const metrics = reactive({
    temperature: { title: 'Suhu Ruangan', value: 22.5, unit: '°C', icon: 'fas fa-thermometer-half' },
    humidity: { title: 'Kelembaban', value: 58, unit: '%', icon: 'fas fa-tint' },
    power: { title: 'Konsumsi Daya', value: 8.2, unit: 'kW', icon: 'fas fa-bolt' },
    cpu: { title: 'CPU Usage', value: 87, unit: '%', icon: 'fas fa-microchip' },
    memory: { title: 'Memory Usage', value: 64, unit: '%', icon: 'fas fa-memory' },
    network: { title: 'Network Traffic', value: 245, unit: 'Mbps', icon: 'fas fa-network-wired' },
});

const alerts = reactive([
    { id: 1, type: 'critical', icon: 'fas fa-exclamation-triangle', message: 'CPU Usage mencapai 87% pada Server-01', time: '2 menit yang lalu', actionText: 'Tindak Lanjut', metric: 'cpu', threshold: 85 },
    { id: 2, type: 'warning', icon: 'fas fa-exclamation', message: 'Kelembaban ruangan melebihi batas normal (58%)', time: '5 menit yang lalu', actionText: 'Tindak Lanjut', metric: 'humidity', threshold: 60 },
    { id: 3, type: 'info', icon: 'fas fa-info-circle', message: 'Maintenance terjadwal untuk UPS-02 besok pagi', time: '1 jam yang lalu', actionText: 'Lihat Detail' },
]);

const systemStats = reactive([
    { label: 'Uptime', value: '99.98%' },
    { label: 'Total Server', value: '24' },
    { label: 'Server Aktif', value: '23' },
    { label: 'Maintenance', value: '1' },
    { label: 'Kapasitas Rak', value: '78%' },
    { label: 'Efisiensi Daya', value: '92%' },
    { label: 'Redundansi', value: 'N+1' },
]);

const chartTimespans = ['1H', '6H', '24H', '7D'];
const activeTimespan = ref('1H');
let updateInterval = null;


// --- Computed Properties (Data yang diturunkan/diproses dari state mentah) ---

// Fungsi helper untuk menentukan status berdasarkan nilai
function getStatusInfo(type, value) {
    let status = { text: 'Normal', badgeClass: 'status-normal', cardClass: 'success' };
    switch (type) {
        case 'temperature':
            if (value > 24) status = { text: 'Tinggi', badgeClass: 'status-warning', cardClass: 'warning' };
            else if (value < 20) status = { text: 'Rendah', badgeClass: 'status-warning', cardClass: 'warning' };
            break;
        case 'humidity':
            if (value > 60) status = { text: 'Tinggi', badgeClass: 'status-warning', cardClass: 'warning' };
            else if (value < 40) status = { text: 'Rendah', badgeClass: 'status-warning', cardClass: 'warning' };
            break;
        case 'power':
            if (value > 9.5) status = { text: 'Overload', badgeClass: 'status-critical', cardClass: 'danger' };
            break;
        case 'cpu':
            if (value > 85) status = { text: 'Kritis', badgeClass: 'status-critical', cardClass: 'danger' };
            else if (value > 70) status = { text: 'Tinggi', badgeClass: 'status-warning', cardClass: 'warning' };
            break;
        case 'memory':
            if (value > 75) status = { text: 'Tinggi', badgeClass: 'status-warning', cardClass: 'warning' };
            break;
        case 'network':
            if (value > 280) status = { text: 'Padat', badgeClass: 'status-warning', cardClass: 'warning' };
            break;
    }
    return status;
}

// Computed property yang memproses data mentah untuk ditampilkan di view
const processedMetrics = computed(() => {
    return Object.entries(metrics).map(([key, metric]) => {
        return {
            ...metric,
            statusInfo: getStatusInfo(key, metric.value),
            chartHeight: (key === 'cpu' || key === 'humidity' || key === 'memory') ? metric.value : Math.random() * 60 + 20,
        };
    });
});

const activeAlerts = computed(() => {
    return alerts.filter(alert => {
        if (!alert.metric) return true; // Untuk alert yang tidak terkait metrik
        const metric = metrics[alert.metric];
        if (!metric) return false;

        // Cek jika metrik terkait melewati threshold
        if (alert.metric === 'cpu' && metric.value > alert.threshold) return true;
        if (alert.metric === 'humidity' && metric.value > alert.threshold) return true;

        return false;
    });
});


// --- Metode (Aksi yang bisa dipicu) ---

function updateMonitoringData() {
    metrics.temperature.value = 20 + Math.random() * 5;
    metrics.humidity.value = 45 + Math.random() * 20;
    metrics.power.value = 7 + Math.random() * 3;
    metrics.cpu.value = 60 + Math.random() * 35;
    metrics.memory.value = 50 + Math.random() * 30;
    metrics.network.value = 200 + Math.random() * 100;
}

function handleAlert(alert) {
    alert(`Menangani alert: "${alert.message}"`);
}


// --- Lifecycle Hooks (Kode yang berjalan pada siklus hidup komponen) ---

onMounted(() => {
    updateInterval = setInterval(updateMonitoringData, 3000);
});

onUnmounted(() => {
    clearInterval(updateInterval);
});

</script>

<style scoped>
/* Seluruh kode CSS dari file asli ditempelkan di sini */
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
    --gradient-warning: linear-gradient(135deg, #ff9800, #f57c00);
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

:global(body) {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    min-height: 100vh;
    color: var(--dark);
}



.header {
    background: var(--white);
    box-shadow: var(--shadow);
    position: sticky;
    top: 0;
    z-index: 1000;
    flex-shrink: 0;
    /* Mencegah header menyusut */
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

.logo-icon {
    width: 40px;
    height: 40px;
    background: var(--gradient-primary);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.2rem;
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

.nav-link.active {
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
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
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

.status-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: var(--white);
    border-radius: 12px;
    box-shadow: var(--shadow);
}

.status-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--secondary);
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% {
        opacity: 1;
        transform: scale(1);
    }

    50% {
        opacity: 0.5;
        transform: scale(0.8);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
}

/* Monitoring Grid */
.monitoring-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.monitor-card {
    background: var(--white);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    box-shadow: var(--shadow);
    transition: var(--transition);
    position: relative;
    overflow: hidden;
    animation: fadeInUp 0.6s ease-out forwards;
}

.monitor-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    transition: background 0.5s ease;
}

.monitor-card.warning::before {
    background: var(--gradient-warning);
}

.monitor-card.danger::before {
    background: var(--gradient-danger);
}

.monitor-card.success::before {
    background: var(--gradient-secondary);
}

.monitor-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-hover);
}

.monitor-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.monitor-title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--dark);
}

.monitor-icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: white;
    transition: background 0.5s ease;
}

.monitor-icon.warning {
    background: var(--gradient-warning);
}

.monitor-icon.danger {
    background: var(--gradient-danger);
}

.monitor-icon.success {
    background: var(--gradient-secondary);
}

.monitor-value {
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--dark);
    margin-bottom: 0.5rem;
}

.monitor-unit {
    font-size: 1rem;
    color: var(--gray);
    margin-left: 0.5rem;
}

.monitor-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.status-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
}

.status-normal {
    background: rgba(52, 168, 83, 0.1);
    color: var(--secondary);
}

.status-warning {
    background: rgba(255, 152, 0, 0.1);
    color: var(--warning);
}

.status-critical {
    background: rgba(234, 67, 53, 0.1);
    color: var(--danger);
}

.monitor-chart {
    height: 60px;
    background: var(--light-gray);
    border-radius: 8px;
    position: relative;
    overflow: hidden;
}

.chart-line {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, rgba(26, 115, 232, 0.3), rgba(26, 115, 232, 0.1));
    border-radius: 8px;
    transition: height 1s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Alert Panel */
.alert-panel {
    background: var(--white);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    margin-bottom: 2rem;
}

.alert-header {
    padding: 1.5rem;
    border-bottom: 1px solid var(--light-gray);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.alert-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--dark);
}

.alert-count {
    background: var(--gradient-danger);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
}

.alert-list {
    max-height: 300px;
    overflow-y: auto;
}

.alert-item {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: var(--transition);
}

.alert-item:hover {
    background: var(--light-gray);
}

.alert-item:last-child {
    border-bottom: none;
}

.alert-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    color: white;
    flex-shrink: 0;
}

.alert-icon.critical {
    background: var(--gradient-danger);
}

.alert-icon.warning {
    background: var(--gradient-warning);
}

.alert-icon.info {
    background: var(--gradient-primary);
}


.alert-content {
    flex: 1;
}

.alert-message {
    font-weight: 600;
    color: var(--dark);
    margin-bottom: 0.25rem;
}

.alert-time {
    font-size: 0.8rem;
    color: var(--gray);
}

.alert-action {
    padding: 0.5rem 1rem;
    border: 2px solid var(--primary);
    border-radius: 8px;
    background: transparent;
    color: var(--primary);
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition);
}

.alert-action:hover {
    background: var(--primary);
    color: white;
}

/* System Overview */
.system-overview {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
}

.overview-chart,
.system-stats {
    background: var(--white);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    box-shadow: var(--shadow);
}

.chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    gap: 1rem;
}

.chart-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--dark);
}

.chart-controls {
    display: flex;
    gap: 0.5rem;
}

.chart-btn {
    padding: 0.5rem 1rem;
    border: 2px solid var(--light-gray);
    border-radius: 8px;
    background: var(--white);
    color: var(--gray);
    font-size: 0.8rem;
    cursor: pointer;
    transition: var(--transition);
}

.chart-btn.active {
    background: var(--primary);
    color: white;
    border-color: var(--primary);
}

.chart-placeholder {
    height: 300px;
    background: var(--light-gray);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--gray);
    font-size: 1.1rem;
}

.stats-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--dark);
    margin-bottom: 1.5rem;
}

.stat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.stat-item:last-child {
    border-bottom: none;
}

.stat-label {
    color: var(--gray);
    font-weight: 500;
}

.stat-value {
    font-weight: 700;
    color: var(--dark);
}

/* Responsive Design */
@media (max-width: 992px) {
    .system-overview {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {

    .nav,
    .page-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }

    .nav-links {
        gap: 0.5rem;
        justify-content: flex-start;
    }

    .main {
        padding: 1rem;
    }

    .page-title {
        font-size: 2rem;
    }

    .monitoring-grid {
        grid-template-columns: 1fr;
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>