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

                    Dashboard
                </router-link>
                <router-link to="/rack" class="nav-link">

                    Rak Server
                </router-link>
                <router-link to="/asset" class="nav-link">

                    Aset
                </router-link>
                <router-link to="/visitor" class="nav-link">

                    Pengunjung
                </router-link>
                <router-link to="/monitoring" class="nav-link">

                    Monitoring
                </router-link>
                <router-link to="/laporan" class="nav-link">

                    Laporan
                </router-link>
                <router-link to="/mobile" class="nav-link">

                    Mobile
                </router-link>
            </div>
        </nav>
    </header>

    <main class="main">
        <div class="page-header">
            <h1 class="page-title">Laporan & Analitik</h1>
            <p class="page-subtitle">Analisis komprehensif performa, keamanan, dan efisiensi data center</p>
        </div>

        <div class="report-controls">
            <div class="control-group">
                <label class="control-label">Periode Laporan</label>
                <select class="control-input" v-model="reportParams.period">
                    <option value="daily">Harian</option>
                    <option value="weekly">Mingguan</option>
                    <option value="monthly">Bulanan</option>
                    <option value="quarterly">Kuartalan</option>
                    <option value="yearly">Tahunan</option>
                </select>
            </div>
            <div class="control-group">
                <label class="control-label">Tanggal Mulai</label>
                <input type="date" class="control-input" v-model="reportParams.startDate">
            </div>
            <div class="control-group">
                <label class="control-label">Tanggal Akhir</label>
                <input type="date" class="control-input" v-model="reportParams.endDate">
            </div>
            <div class="control-group">
                <label class="control-label">Format Export</label>
                <select class="control-input" v-model="reportParams.format">
                    <option value="pdf">PDF</option>
                    <option value="excel">Excel</option>
                    <option value="csv">CSV</option>
                </select>
            </div>
            <div class="control-group">
                <button class="btn btn-primary" @click="generateReport">
                    <i class="fas fa-chart-bar"></i>
                    Generate Laporan
                </button>
            </div>
        </div>

        <div class="report-types">
            <div v-for="(report, index) in reportTypes" :key="report.type"
                :class="['report-card', report.color, { 'selected': selectedReportType === report.type }]"
                :style="{ animationDelay: `${index * 0.1}s` }" @click="selectReportType(report.type)">
                <div class="report-header">
                    <div :class="['report-icon', report.color]">
                        <i :class="report.icon"></i>
                    </div>
                </div>
                <div class="report-title">{{ report.title }}</div>
                <div class="report-description">{{ report.description }}</div>
                <div class="report-stats">
                    <div v-for="stat in report.stats" :key="stat.label" class="stat-item">
                        <div class="stat-value">{{ stat.value }}</div>
                        <div class="stat-label">{{ stat.label }}</div>
                    </div>
                </div>
                <div class="report-actions">
                    <button class="action-btn" @click.stop="handleCardAction(report, 'generate')">Generate</button>
                    <button class="action-btn secondary"
                        @click.stop="handleCardAction(report, 'preview')">Preview</button>
                </div>
            </div>
        </div>

        <div class="recent-reports">
            <div class="section-header">
                <h3 class="section-title">Laporan Terbaru</h3>
                <button class="btn btn-secondary" @click="viewAllReports">
                    <i class="fas fa-list"></i>
                    Lihat Semua
                </button>
            </div>
            <table class="reports-table">
                <thead>
                    <tr>
                        <th>Nama Laporan</th>
                        <th>Tipe</th>
                        <th>Periode</th>
                        <th>Dibuat</th>
                        <th>Status</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="report in recentReports" :key="report.id">
                        <td class="report-name">{{ report.name }}</td>
                        <td><span :class="['report-type', `type-${report.type.toLowerCase()}`]">{{ report.type }}</span>
                        </td>
                        <td>{{ report.period }}</td>
                        <td>{{ report.createdAt }}</td>
                        <td>{{ report.status }}</td>
                        <td>
                            <button class="download-btn" @click="downloadReport(report)">
                                <i class="fas fa-download"></i> Download
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue';

// --- State Reaktif ---

const reportParams = reactive({
    period: 'monthly',
    startDate: '',
    endDate: '',
    format: 'pdf',
});

const selectedReportType = ref(null); // Menyimpan tipe laporan yang dipilih

const reportTypes = reactive([
    { type: 'performance', title: 'Laporan Performa', description: 'Analisis performa sistem, CPU usage, memory utilization, dan throughput network.', icon: 'fas fa-tachometer-alt', color: '', stats: [{ value: '98.5%', label: 'Uptime' }, { value: '67%', label: 'Avg CPU' }, { value: '8.2kW', label: 'Power' }] },
    { type: 'environmental', title: 'Laporan Lingkungan', description: 'Monitoring suhu, kelembaban, kualitas udara, dan efisiensi pendinginan.', icon: 'fas fa-leaf', color: 'secondary', stats: [{ value: '22.5°C', label: 'Avg Temp' }, { value: '55%', label: 'Humidity' }, { value: '1.4', label: 'PUE' }] },
    { type: 'security', title: 'Laporan Keamanan', description: 'Audit akses, log keamanan, deteksi intrusi, dan compliance report.', icon: 'fas fa-shield-alt', color: 'accent', stats: [{ value: '342', label: 'Visitors' }, { value: '0', label: 'Incidents' }, { value: '100%', label: 'Compliance' }] },
    { type: 'maintenance', title: 'Laporan Maintenance', description: 'Jadwal maintenance, riwayat perbaikan, lifecycle aset, dan prediksi kebutuhan.', icon: 'fas fa-tools', color: 'warning', stats: [{ value: '12', label: 'Scheduled' }, { value: '3', label: 'Pending' }, { value: '95%', label: 'On Time' }] },
]);

const recentReports = reactive([
    { id: 1, name: 'Laporan Performa Mei 2025', type: 'Performance', period: '01 Mei - 31 Mei 2025', createdAt: '10 Jun 2025, 14:30', status: 'Selesai' },
    { id: 2, name: 'Audit Keamanan Q2 2025', type: 'Security', period: '01 Apr - 30 Jun 2025', createdAt: '05 Jun 2025, 09:15', status: 'Selesai' },
    { id: 3, name: 'Monitoring Lingkungan Mingguan', type: 'Environmental', period: '03 Jun - 09 Jun 2025', createdAt: '10 Jun 2025, 08:00', status: 'Selesai' },
    { id: 4, name: 'Jadwal Maintenance Juli 2025', type: 'Maintenance', period: '01 Jul - 31 Jul 2025', createdAt: '01 Jun 2025, 16:45', status: 'Selesai' },
    { id: 5, name: 'Analisis Efisiensi Energi', type: 'Environmental', period: '01 Mei - 31 Mei 2025', createdAt: '02 Jun 2025, 11:20', status: 'Selesai' },
]);


// --- Metode ---

function selectReportType(type) {
    selectedReportType.value = type;
    console.log('Selected report type:', type);
}

function generateReport() {
    if (!reportParams.startDate || !reportParams.endDate) {
        alert('Mohon pilih tanggal mulai dan akhir');
        return;
    }
    if (!selectedReportType.value) {
        alert('Mohon pilih tipe laporan terlebih dahulu dari salah satu kartu di atas.');
        return;
    }

    const reportName = `${selectedReportType.value}-${reportParams.period}-${reportParams.startDate}-ke-${reportParams.endDate}.${reportParams.format}`;
    alert(`Generating laporan: ${reportName}\n\nLaporan akan tersedia dalam beberapa menit dan akan muncul di tabel "Laporan Terbaru".`);

    // Reset selection
    selectedReportType.value = null;
}

function handleCardAction(report, action) {
    if (action === 'generate') {
        alert(`Generating ${report.title} dengan pengaturan default...`);
    } else if (action === 'preview') {
        alert(`Membuka preview untuk ${report.title}...`);
    }
}

function downloadReport(report) {
    alert(`Mengunduh laporan: ${report.name}`);
}

function viewAllReports() {
    alert('Membuka halaman arsip laporan lengkap...');
}


// --- Watcher ---

// Fungsi untuk mengubah tanggal berdasarkan periode
function setDatesFromPeriod(period) {
    const today = new Date();
    let startDate = new Date();
    let endDate = new Date();

    switch (period) {
        case 'daily':
            startDate = endDate = today;
            break;
        case 'weekly':
            startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
            endDate = today;
            break;
        case 'monthly':
            startDate = new Date(today.getFullYear(), today.getMonth(), 1);
            endDate = today;
            break;
        case 'quarterly':
            const quarter = Math.floor(today.getMonth() / 3);
            startDate = new Date(today.getFullYear(), quarter * 3, 1);
            endDate = today;
            break;
        case 'yearly':
            startDate = new Date(today.getFullYear(), 0, 1);
            endDate = today;
            break;
    }
    // Format tanggal ke YYYY-MM-DD
    reportParams.startDate = startDate.toISOString().split('T')[0];
    reportParams.endDate = endDate.toISOString().split('T')[0];
}

// Memantau perubahan pada dropdown periode
watch(() => reportParams.period, (newPeriod) => {
    setDatesFromPeriod(newPeriod);
});


// --- Lifecycle Hook ---

// Atur tanggal default saat komponen pertama kali dimuat
onMounted(() => {
    setDatesFromPeriod('monthly');
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

/* Header */
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

/* Report Controls */
.report-controls {
    background: var(--white);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    box-shadow: var(--shadow);
    margin-bottom: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    align-items: end;
}

.control-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.control-label {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--dark);
}

.control-input {
    padding: 0.75rem 1rem;
    border: 2px solid var(--light-gray);
    border-radius: 12px;
    font-size: 1rem;
    background: var(--white);
    transition: var(--transition);
    font-family: 'Inter', sans-serif;
}

.control-input:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.1);
}

.btn {
    padding: 0.75rem 1.5rem;
    border-radius: 12px;
    text-decoration: none;
    font-weight: 600;
    font-size: 1rem;
    transition: var(--transition);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border: none;
    cursor: pointer;
    width: 100%;
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
    background: var(--light-gray);
    color: var(--gray);
    border: 2px solid var(--light-gray);
}

.btn-secondary:hover {
    background: var(--gray);
    color: white;
}

/* Report Types Grid */
.report-types {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.report-card {
    background: var(--white);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    box-shadow: var(--shadow);
    transition: var(--transition);
    position: relative;
    overflow: hidden;
    cursor: pointer;
    border: 2px solid transparent;
}

.report-card.selected {
    transform: translateY(-4px);
    box-shadow: var(--shadow-hover);
    border-color: var(--primary);
}

.report-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--gradient-primary);
}

.report-card.secondary::before {
    background: var(--gradient-secondary);
}

.report-card.accent::before {
    background: var(--gradient-accent);
}

.report-card.warning::before {
    background: var(--gradient-warning);
}

.report-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-hover);
}

.report-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.report-icon {
    width: 50px;
    height: 50px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: white;
    background: var(--gradient-primary);
}

.report-icon.secondary {
    background: var(--gradient-secondary);
}

.report-icon.accent {
    background: var(--gradient-accent);
}

.report-icon.warning {
    background: var(--gradient-warning);
}

.report-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--dark);
    margin-bottom: 0.5rem;
}

.report-description {
    color: var(--gray);
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 1rem;
    min-height: 54px;
}

.report-stats {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    border-top: 1px solid var(--light-gray);
    padding-top: 1rem;
}

.stat-item {
    text-align: center;
}

.stat-value {
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--dark);
}

.stat-label {
    font-size: 0.8rem;
    color: var(--gray);
}

.report-actions {
    display: flex;
    gap: 0.5rem;
    margin-top: auto;
}

.action-btn {
    flex: 1;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    border: 2px solid var(--primary);
    background: transparent;
    color: var(--primary);
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition);
    font-size: 0.9rem;
}

.action-btn:hover {
    background: var(--primary);
    color: white;
}

.action-btn.secondary {
    border-color: var(--gray);
    color: var(--gray);
}

.action-btn.secondary:hover {
    background: var(--gray);
    color: white;
}

/* Recent Reports */
.recent-reports {
    background: var(--white);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    overflow: hidden;
}

.section-header {
    padding: 1.5rem;
    border-bottom: 1px solid var(--light-gray);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.section-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--dark);
}

.reports-table {
    width: 100%;
    border-collapse: collapse;
}

.reports-table th {
    background: var(--light-gray);
    padding: 1rem;
    text-align: left;
    font-weight: 600;
    color: var(--dark);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.reports-table td {
    padding: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    vertical-align: middle;
}

.reports-table tr:hover {
    background: var(--light-gray);
}

.report-name {
    font-weight: 600;
    color: var(--dark);
}

.report-type {
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
    text-transform: capitalize;
}

.type-performance {
    background: rgba(26, 115, 232, 0.1);
    color: var(--primary);
}

.type-environmental {
    background: rgba(52, 168, 83, 0.1);
    color: var(--secondary);
}

.type-security {
    background: rgba(234, 67, 53, 0.1);
    color: var(--danger);
}

.type-maintenance {
    background: rgba(251, 188, 4, 0.1);
    color: var(--accent);
}

.download-btn {
    padding: 0.5rem 1rem;
    border-radius: 8px;
    border: none;
    background: var(--gradient-primary);
    color: white;
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition);
    font-size: 0.9rem;
}

.download-btn:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow);
}

/* Responsive Design */
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

    .report-controls {
        grid-template-columns: 1fr;
    }

    .report-types {
        grid-template-columns: 1fr;
    }

    .reports-table {
        display: block;
        overflow-x: auto;
    }
}

/* Animations */
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

.report-card {
    animation: fadeInUp 0.6s ease-out;
}
</style>