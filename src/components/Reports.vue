<template>
    <header class="header">
        <nav class="nav">
            <router-link to="/index">
                <div>
                    <img src="/src/assets/images/logo.jpeg" alt="Logo" style="width: 135px; height: auto;" />
                </div>
            </router-link>
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

        <div class="report-cards">
            <div class="report-card" v-for="report in reports" :key="report.id" @click="generateReport(report)">
                <div class="report-icon">
                    <i :class="report.icon"></i>
                </div>
                <div class="report-content">
                    <h3 class="report-title">{{ report.title }}</h3>
                    <p class="report-description">{{ report.description }}</p>
                    <div class="report-meta">
                        <span class="report-frequency">{{ report.frequency }}</span>
                        <span class="report-last-generated">{{ report.lastGenerated }}</span>
                    </div>
                </div>
                <div class="report-actions">
                    <button class="btn-icon" @click.stop="downloadReport(report)" title="Download">
                        <i class="fas fa-download"></i>
                    </button>
                    <button class="btn-icon" @click.stop="scheduleReport(report)" title="Schedule">
                        <i class="fas fa-clock"></i>
                    </button>
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
                        <td><span :class="['report-type', `type-${report.type.toLowerCase()}`]">{{ report.type
                                }}</span>
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

    <router-link to="/chatbot" class="floating-chatbot">
        <i class="fas fa-robot"></i>
        <div class="chatbot-tooltip">
            Asisten Chatbot AI
        </div>
    </router-link>
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

const reports = reactive([
    {
        id: 1,
        title: 'Laporan Power',
        description: 'Analisis konsumsi daya, efisiensi energi, dan trend penggunaan listrik data center.',
        icon: 'fas fa-bolt',
        frequency: 'Harian',
        lastGenerated: '12 Jun 2025'
    },
    {
        id: 2,
        title: 'Laporan Lingkungan',
        description: 'Monitoring suhu, kelembaban, dan status pintu untuk keamanan lingkungan.',
        icon: 'fas fa-leaf',
        frequency: 'Real-time',
        lastGenerated: '12 Jun 2025'
    },
    {
        id: 3,
        title: 'Laporan Pengunjung',
        description: 'Data kunjungan, akses masuk-keluar, dan statistik pengunjung data center.',
        icon: 'fas fa-users',
        frequency: 'Mingguan',
        lastGenerated: '09 Jun 2025'
    },
    {
        id: 4,
        title: 'Laporan Aset',
        description: 'Inventori aset, status perangkat, dan lifecycle management equipment.',
        icon: 'fas fa-server',
        frequency: 'Bulanan',
        lastGenerated: '01 Jun 2025'
    },
    {
        id: 5,
        title: 'Laporan Sentiment Analitik Trend & Prediktif',
        description: 'Analisis prediktif untuk Power, Suhu, dan Humidity dengan machine learning.',
        icon: 'fas fa-chart-line',
        frequency: 'Mingguan',
        lastGenerated: '08 Jun 2025'
    }
]);

const recentReports = reactive([
    { id: 1, name: 'Laporan Performa Mei 2025', type: 'Performance', period: '01 Mei - 31 Mei 2025', createdAt: '10 Jun 2025, 14:30', status: 'Selesai' },
    { id: 2, name: 'Audit Keamanan Q2 2025', type: 'Security', period: '01 Apr - 30 Jun 2025', createdAt: '05 Jun 2025, 09:15', status: 'Selesai' },
    { id: 3, name: 'Monitoring Lingkungan Mingguan', type: 'Environmental', period: '03 Jun - 09 Jun 2025', createdAt: '10 Jun 2025, 08:00', status: 'Selesai' },
    { id: 4, name: 'Jadwal Maintenance Juli 2025', type: 'Maintenance', period: '01 Jul - 31 Jul 2025', createdAt: '01 Jun 2025, 16:45', status: 'Selesai' },
    { id: 5, name: 'Analisis Efisiensi Energi', type: 'Environmental', period: '01 Mei - 31 Mei 2025', createdAt: '02 Jun 2025, 11:20', status: 'Selesai' },
]);


// --- Metode ---

function generateReport(report) {
    alert(`Generating ${report.title}...\n\nLaporan akan tersedia dalam beberapa menit dan akan muncul di tabel "Laporan Terbaru".`);
}

function scheduleReport(report) {
    alert(`Mengatur jadwal otomatis untuk ${report.title}...\n\nAnda dapat mengatur frekuensi dan waktu pengiriman laporan.`);
}

function downloadReport(report) {
    alert(`Mengunduh laporan: ${report.name || report.title}`);
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
    // Format tanggal ke yyyy-MM-dd
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

.report-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.report-card {
    background: var(--white);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    box-shadow: var(--shadow);
    transition: var(--transition);
    display: flex;
    gap: 1.5rem;
    align-items: flex-start;
    cursor: pointer;
}

.report-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-hover);
}

.report-icon {
    flex-shrink: 0;
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

.report-content {
    flex-grow: 1;
}

.report-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--dark);
    margin-bottom: 0.5rem;
}

.report-description {
    color: var(--gray);
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 1rem;
}

.report-meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: var(--gray);
    border-top: 1px solid var(--light-gray);
    padding-top: 0.75rem;
}

.report-actions {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.btn-icon {
    background: transparent;
    border: none;
    color: var(--gray);
    font-size: 1.1rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    transition: var(--transition);
}

.btn-icon:hover {
    background-color: var(--light-gray);
    color: var(--primary);
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
    animation-play-state: paused;
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

@keyframes float {
    0% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-10px);
    }

    100% {
        transform: translateY(0px);
    }
}
</style>