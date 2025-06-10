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
            <h1 class="page-title">Manajemen Pengunjung</h1>
            <p class="page-subtitle">Sistem registrasi dan tracking pengunjung data center dengan keamanan tinggi</p>
        </div>

        <div class="stats-grid">
            <div v-for="(stat, index) in stats" :key="index" :class="['stat-card', stat.color]"
                :style="{ animationDelay: `${index * 0.1}s` }">
                <div class="stat-header">
                    <div class="stat-title">{{ stat.title }}</div>
                    <div :class="['stat-icon', stat.color]">
                        <i :class="stat.icon"></i>
                    </div>
                </div>
                <div class="stat-value">{{ stat.value }}</div>
                <div :class="['stat-change', stat.change.type]">
                    <i :class="stat.change.icon"></i> {{ stat.change.text }}
                </div>
            </div>
        </div>

        <div class="controls">
            <div class="search-container">
                <input type="text" class="search-box" placeholder="Cari pengunjung, perusahaan, tujuan..."
                    v-model="searchTerm">
                <select class="filter-select" v-model="statusFilter">
                    <option value="all">Semua Status</option>
                    <option value="Active">Sedang di Dalam</option>
                    <option value="Pending">Menunggu Approval</option>
                    <option value="Completed">Selesai</option>
                </select>
                <input type="date" class="filter-select" v-model="dateFilter">
            </div>
            <div>
                <button class="btn btn-primary" @click="addVisitor">
                    <i class="fas fa-plus"></i>
                    Daftar Pengunjung
                </button>
                <button class="btn btn-secondary" @click="exportVisitors">
                    <i class="fas fa-download"></i>
                    Export
                </button>
            </div>
        </div>

        <div class="visitor-table-container">
            <div class="table-header">
                <h3 class="table-title">Daftar Pengunjung untuk {{ formattedDate }}</h3>
            </div>
            <table class="visitor-table">
                <thead>
                    <tr>
                        <th>Pengunjung</th>
                        <th>Tujuan</th>
                        <th>Waktu Masuk</th>
                        <th>Waktu Keluar</th>
                        <th>Status</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="visitor in filteredVisitors" :key="visitor.id">
                        <td>
                            <div class="visitor-info">
                                <div class="visitor-avatar">{{ getInitials(visitor.name) }}</div>
                                <div class="visitor-details">
                                    <div class="visitor-name">{{ visitor.name }}</div>
                                    <div class="visitor-company">{{ visitor.company }}</div>
                                </div>
                            </div>
                        </td>
                        <td>{{ visitor.purpose }}</td>
                        <td>{{ visitor.timeIn }}</td>
                        <td>{{ visitor.timeOut }}</td>
                        <td>
                            <span :class="['status-badge', `status-${visitor.status.toLowerCase()}`]">{{
                                formatStatus(visitor.status) }}</span>
                        </td>
                        <td>
                            <div class="action-buttons">
                                <template v-if="visitor.status === 'Pending'">
                                    <button class="action-btn approve" title="Approve" @click="approveVisitor(visitor)">
                                        <i class="fas fa-check"></i>
                                    </button>
                                    <button class="action-btn reject" title="Reject" @click="rejectVisitor(visitor.id)">
                                        <i class="fas fa-times"></i>
                                    </button>
                                </template>
                                <button class="action-btn view" title="Lihat Detail" @click="viewVisitor(visitor)">
                                    <i class="fas fa-eye"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="filteredVisitors.length === 0">
                        <td colspan="6" style="text-align: center; color: var(--gray); padding: 2rem;">
                            Tidak ada pengunjung yang cocok dengan kriteria filter.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';

// --- State Reaktif ---

const searchTerm = ref('');
const statusFilter = ref('all');
const dateFilter = ref(new Date().toISOString().slice(0, 10)); // Default ke tanggal hari ini

const stats = reactive({
    today: { title: 'Pengunjung Hari Ini', value: 24, color: 'primary', icon: 'fas fa-users', change: { type: 'positive', icon: 'fas fa-arrow-up', text: '+12% dari kemarin' } },
    inside: { title: 'Sedang di Dalam', value: 8, color: 'secondary', icon: 'fas fa-user-check', change: { type: 'positive', icon: 'fas fa-arrow-up', text: '3 baru masuk' } },
    pending: { title: 'Menunggu Approval', value: 5, color: 'accent', icon: 'fas fa-clock', change: { type: 'negative', icon: 'fas fa-arrow-down', text: '-2 dari kemarin' } },
    monthly: { title: 'Total Bulan Ini', value: 342, color: 'danger', icon: 'fas fa-chart-line', change: { type: 'positive', icon: 'fas fa-arrow-up', text: '+18% dari bulan lalu' } },
});

// Data master pengunjung (di aplikasi nyata, ini dari API)
const allVisitors = reactive([
    { id: 1, name: 'John Doe', company: 'PT. Tech Solutions', purpose: 'Maintenance Server', date: '2025-06-10', timeIn: '09:30', timeOut: '-', status: 'Active' },
    { id: 2, name: 'Alice Smith', company: 'DataCorp Inc.', purpose: 'Audit Keamanan', date: '2025-06-10', timeIn: '-', timeOut: '-', status: 'Pending' },
    { id: 3, name: 'Michael Brown', company: 'Network Systems', purpose: 'Instalasi Equipment', date: '2025-06-10', timeIn: '08:00', timeOut: '11:30', status: 'Completed' },
    { id: 4, name: 'Sarah Johnson', company: 'Cloud Services Ltd.', purpose: 'Konsultasi Teknis', date: '2025-06-10', timeIn: '10:15', timeOut: '-', status: 'Active' },
    { id: 5, name: 'Robert Wilson', company: 'Security Audit Co.', purpose: 'Pemeriksaan Rutin', date: '2025-06-10', timeIn: '-', timeOut: '-', status: 'Pending' },
    { id: 6, name: 'Budi Santoso', company: 'Vendor AC', purpose: 'Perbaikan Pendingin', date: '2025-06-09', timeIn: '14:00', timeOut: '16:00', status: 'Completed' },
]);

let statUpdateInterval = null;

// --- Computed Properties ---

// Filter pengunjung berdasarkan semua kriteria
const filteredVisitors = computed(() => {
    return allVisitors.filter(visitor => {
        const search = searchTerm.value.toLowerCase();

        const matchesSearch =
            visitor.name.toLowerCase().includes(search) ||
            visitor.company.toLowerCase().includes(search) ||
            visitor.purpose.toLowerCase().includes(search);

        const matchesStatus =
            statusFilter.value === 'all' || visitor.status === statusFilter.value;

        const matchesDate =
            !dateFilter.value || visitor.date === dateFilter.value;

        return matchesSearch && matchesStatus && matchesDate;
    });
});

const formattedDate = computed(() => {
    if (!dateFilter.value) return 'Semua Tanggal';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateFilter.value + 'T00:00:00').toLocaleDateString('id-ID', options);
});


// --- Metode ---

const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

const formatStatus = (status) => {
    const map = {
        'Active': 'Sedang di Dalam',
        'Pending': 'Menunggu Approval',
        'Completed': 'Selesai'
    };
    return map[status] || status;
}

function addVisitor() {
    alert('Fitur ini akan membuka form registrasi pengunjung baru.');
}

function exportVisitors() {
    alert('Fitur ini akan men-download data pengunjung yang difilter sebagai file CSV/Excel.');
}

function approveVisitor(visitor) {
    if (confirm(`Approve kunjungan untuk: ${visitor.name}?`)) {
        visitor.status = 'Active';
        visitor.timeIn = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
        alert(`${visitor.name} telah diapprove dan check-in.`);
    }
}

function rejectVisitor(visitorId) {
    const visitor = allVisitors.find(v => v.id === visitorId);
    if (confirm(`Tolak dan hapus permintaan kunjungan dari: ${visitor.name}?`)) {
        const index = allVisitors.findIndex(v => v.id === visitorId);
        if (index > -1) {
            allVisitors.splice(index, 1);
        }
        alert(`Kunjungan ${visitor.name} telah ditolak.`);
    }
}

function viewVisitor(visitor) {
    alert(`Detail Pengunjung:\nNama: ${visitor.name}\nPerusahaan: ${visitor.company}\nTujuan: ${visitor.purpose}\nStatus: ${visitor.status}`);
}

// Simulasi pembaruan statistik
function updateStats() {
    Object.values(stats).forEach(stat => {
        if (Math.random() > 0.8) { // 20% chance to update
            const change = Math.random() > 0.5 ? 1 : -1;
            stat.value = Math.max(0, stat.value + change);
        }
    });
}

// --- Lifecycle Hooks ---

onMounted(() => {
    statUpdateInterval = setInterval(updateStats, 5000);
});

onUnmounted(() => {
    clearInterval(statUpdateInterval);
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

/* Stats Cards */
.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.stat-card {
    background: var(--white);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    box-shadow: var(--shadow);
    transition: var(--transition);
    position: relative;
    overflow: hidden;
    animation: fadeInUp 0.6s ease-out forwards;
}

.stat-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--gradient-primary);
}

.stat-card.secondary::before {
    background: var(--gradient-secondary);
}

.stat-card.accent::before {
    background: var(--gradient-accent);
}

.stat-card.danger::before {
    background: var(--gradient-danger);
}

.stat-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-hover);
}

.stat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.stat-title {
    font-size: 0.9rem;
    color: var(--gray);
    font-weight: 500;
}

.stat-icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: white;
}

.stat-icon.primary {
    background: var(--gradient-primary);
}

.stat-icon.secondary {
    background: var(--gradient-secondary);
}

.stat-icon.accent {
    background: var(--gradient-accent);
}

.stat-icon.danger {
    background: var(--gradient-danger);
}

.stat-value {
    font-size: 2rem;
    font-weight: 800;
    color: var(--dark);
    margin-bottom: 0.5rem;
}

.stat-change {
    font-size: 0.8rem;
    font-weight: 500;
}

.stat-change.positive {
    color: var(--secondary);
}

.stat-change.negative {
    color: var(--danger);
}

/* Controls */
.controls {
    background: var(--white);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    box-shadow: var(--shadow);
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
}

.search-container {
    display: flex;
    gap: 1rem;
    align-items: center;
    flex: 1;
    min-width: 300px;
    flex-wrap: wrap;
}

.search-box {
    flex: 1;
    padding: 0.75rem 1rem;
    border: 2px solid var(--light-gray);
    border-radius: 12px;
    font-size: 1rem;
    transition: var(--transition);
}

.search-box:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.1);
}

.filter-select {
    padding: 0.75rem 1rem;
    border: 2px solid var(--light-gray);
    border-radius: 12px;
    font-size: 1rem;
    background: var(--white);
    cursor: pointer;
    transition: var(--transition);
    font-family: 'Inter', sans-serif;
}

.filter-select:focus {
    outline: none;
    border-color: var(--primary);
}

.btn {
    padding: 0.75rem 1.5rem;
    border-radius: 12px;
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
    background: var(--light-gray);
    color: var(--gray);
    border: 2px solid var(--light-gray);
}

.btn-secondary:hover {
    background: #e0e0e0;
    color: var(--dark);
}

/* Visitor Table */
.visitor-table-container {
    background: var(--white);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    overflow: hidden;
}

.table-header {
    padding: 1.5rem;
    border-bottom: 1px solid var(--light-gray);
}

.table-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--dark);
}

.visitor-table {
    width: 100%;
    border-collapse: collapse;
}

.visitor-table th {
    background: var(--light-gray);
    padding: 1rem;
    text-align: left;
    font-weight: 600;
    color: var(--dark);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.visitor-table td {
    padding: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    vertical-align: middle;
}

.visitor-table tr:hover {
    background: var(--light-gray);
}

.visitor-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--gradient-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    margin-right: 1rem;
    flex-shrink: 0;
}

.visitor-info {
    display: flex;
    align-items: center;
}

.visitor-details {
    display: flex;
    flex-direction: column;
}

.visitor-name {
    font-weight: 600;
    color: var(--dark);
    margin-bottom: 0.25rem;
}

.visitor-company {
    font-size: 0.8rem;
    color: var(--gray);
}

.status-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
    text-transform: capitalize;
}

.status-active,
.status-completed,
.status-pending {
    text-transform: none;
}

.status-active {
    background: rgba(52, 168, 83, 0.1);
    color: var(--secondary);
}

.status-pending {
    background: rgba(251, 188, 4, 0.1);
    color: var(--accent);
}

.status-completed {
    background: rgba(95, 99, 104, 0.1);
    color: var(--gray);
}

.action-buttons {
    display: flex;
    gap: 0.5rem;
}

.action-btn {
    padding: 0.5rem;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
}

.action-btn.approve {
    background: rgba(52, 168, 83, 0.1);
    color: var(--secondary);
}

.action-btn.approve:hover {
    background: var(--secondary);
    color: white;
}

.action-btn.reject {
    background: rgba(234, 67, 53, 0.1);
    color: var(--danger);
}

.action-btn.reject:hover {
    background: var(--danger);
    color: white;
}


.action-btn.view {
    background: rgba(26, 115, 232, 0.1);
    color: var(--primary);
}

.action-btn.view:hover {
    background: var(--primary);
    color: white;
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
        justify-content: center;
    }

    .main {
        padding: 1rem;
    }

    .page-title {
        font-size: 2rem;
    }

    .controls {
        flex-direction: column;
        align-items: stretch;
    }

    .search-container {
        flex-direction: column;
        align-items: stretch;
    }

    .stats-grid {
        grid-template-columns: 1fr;
    }

    .visitor-table {
        display: block;
        overflow-x: auto;
    }
}

/* Animations */
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