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
  
                
            </div>
        </nav>
    </header>

    <main class="main">
        <div class="page-header">
            <h1 class="page-title">Manajemen Aset</h1>
            <p class="page-subtitle">Inventarisasi lengkap semua aset IT dengan tracking lifecycle dan maintenance</p>
        </div>

        <div class="controls">
            <div class="search-container">
                <input type="text" class="search-box" placeholder="Cari aset (nama, ID, tipe)..." v-model="searchTerm">
                <select class="filter-select" v-model="statusFilter">
                    <option value="all">Semua Status</option>
                    <option value="Active">Aktif</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Inactive">Tidak Aktif</option>
                </select>
                <select class="filter-select" v-model="typeFilter">
                    <option value="all">Semua Tipe</option>
                    <option value="Server">Server</option>
                    <option value="Switch">Switch</option>
                    <option value="Storage">Storage</option>
                    <option value="UPS">UPS</option>
                </select>
                <select class="filter-select" v-model="rackFilter">
                    <option value="all">Semua Rak</option>
                    <option value="AB-12">Rack AB-12</option>
                    <option value="CD-05">Rack CD-05</option>
                    <option value="EF-08">Rack EF-08</option>
                    <option value="GH-11">Rack GH-11</option>
                </select>
            </div>
            <div>
                <button class="btn btn-primary" @click="addAsset">
                    <i class="fas fa-plus"></i>
                    Tambah Aset
                </button>
                <button class="btn btn-secondary" @click="exportAssets">
                    <i class="fas fa-download"></i>
                    Export
                </button>
            </div>
        </div>

        <div class="asset-grid">
            <div v-for="(asset, index) in filteredAssets" :key="asset.id" class="asset-card"
                :style="{ animationDelay: `${index * 0.05}s` }">
                <div class="asset-header">
                    <div class="asset-info">
                        <div class="asset-id">{{ asset.id }}</div>
                        <div class="asset-name">{{ asset.name }}</div>
                        <div class="asset-type">{{ asset.type }}</div>
                    </div>
                    <div :class="['asset-status', `status-${asset.status.toLowerCase()}`]">{{ asset.status }}</div>
                </div>
                <div class="asset-details">
                    <div class="detail-item">
                        <div class="detail-label">Lokasi</div>
                        <div class="detail-value">{{ asset.location }}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Terakhir Diperbarui</div>
                        <div class="detail-value">{{ asset.lastUpdated }}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">{{ asset.detail1.label }}</div>
                        <div class="detail-value">{{ asset.detail1.value }}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">{{ asset.detail2.label }}</div>
                        <div class="detail-value">{{ asset.detail2.value }}</div>
                    </div>
                </div>
                <div class="asset-actions">
                    <button class="action-btn view" title="Lihat Detail" @click="viewAsset(asset)">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit" title="Edit" @click="editAsset(asset)">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete" title="Hapus" @click="deleteAsset(asset.id)">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
        <div v-if="filteredAssets.length === 0" class="no-results">
            <p>Tidak ada aset yang cocok dengan kriteria pencarian.</p>
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
import { ref, reactive, computed } from 'vue';

// --- State Reaktif ---

// Filter dan search state
const searchTerm = ref('');
const statusFilter = ref('all');
const typeFilter = ref('all');
const rackFilter = ref('all');

// Master data untuk semua aset. Di aplikasi nyata, ini akan diambil dari API.
const allAssets = reactive([
    {
        id: 'AST-2025-0342', name: 'Dell PowerEdge R740', type: 'Server', status: 'Active',
        location: 'PLN Pusat - Rack AB-12', rack: 'AB-12', lastUpdated: '18 Mar 2025',
        detail1: { label: 'Serial Number', value: 'DL740-2025-001' },
        detail2: { label: 'Warranty', value: 'Valid hingga 2028' }
    },
    {
        id: 'AST-2025-0343', name: 'Cisco Nexus 9336C', type: 'Switch', status: 'Active',
        location: 'PLN Pusat - Rack AB-12', rack: 'AB-12', lastUpdated: '16 Mar 2025',
        detail1: { label: 'Serial Number', value: 'CS9336-2025-002' },
        detail2: { label: 'Ports', value: '36 x 40GbE' }
    },
    {
        id: 'AST-2025-0344', name: 'NetApp AFF A400', type: 'Storage', status: 'Active',
        location: 'PLN Pusat - Rack AB-12', rack: 'AB-12', lastUpdated: '15 Mar 2025',
        detail1: { label: 'Kapasitas', value: '24TB SSD' },
        detail2: { label: 'RAID Level', value: 'RAID 6' }
    },
    {
        id: 'AST-2025-0345', name: 'APC Smart-UPS 3000', type: 'UPS', status: 'Maintenance',
        location: 'PLN Pusat - Rack CD-05', rack: 'CD-05', lastUpdated: '10 Mar 2025',
        detail1: { label: 'Kapasitas', value: '3000VA / 2700W' },
        detail2: { label: 'Battery Status', value: 'Perlu Penggantian' }
    },
    {
        id: 'AST-2025-0346', name: 'HP ProLiant DL380', type: 'Server', status: 'Inactive',
        location: 'Storage Room', rack: 'Storage', lastUpdated: '05 Mar 2025',
        detail1: { label: 'Status', value: 'Menunggu Deployment' },
        detail2: { label: 'Kondisi', value: 'Baru' }
    },
    {
        id: 'AST-2025-0347', name: 'Juniper EX4300', type: 'Switch', status: 'Active',
        location: 'PLN Pusat - Rack EF-08', rack: 'EF-08', lastUpdated: '12 Mar 2025',
        detail1: { label: 'Ports', value: '48 x 1GbE + 4 x 10GbE' },
        detail2: { label: 'Firmware', value: 'v18.4R3.3' }
    },
    {
        id: 'AST-2025-0348', name: 'IBM Power System S922', type: 'Server', status: 'Active',
        location: 'PLN Pusat - Rack GH-11', rack: 'GH-11', lastUpdated: '14 Mar 2025',
        detail1: { label: 'CPU', value: 'POWER9 16-core' },
        detail2: { label: 'Memory', value: '128GB DDR4' }
    }
]);

// --- Computed Property untuk Filtering ---
// Ini adalah cara Vue yang elegan untuk menangani search & filter.
// Tampilan akan otomatis update saat searchTerm, statusFilter, typeFilter, atau rackFilter berubah.
const filteredAssets = computed(() => {
    return allAssets.filter(asset => {
        const search = searchTerm.value.toLowerCase();

        // Kondisi pencarian
        const matchesSearch =
            asset.name.toLowerCase().includes(search) ||
            asset.id.toLowerCase().includes(search) ||
            asset.type.toLowerCase().includes(search);

        // Kondisi filter status
        const matchesStatus =
            statusFilter.value === 'all' || asset.status === statusFilter.value;

        // Kondisi filter tipe
        const matchesType =
            typeFilter.value === 'all' || asset.type === typeFilter.value;

        // Kondisi filter rak
        const matchesRack =
            rackFilter.value === 'all' || asset.rack === rackFilter.value;

        return matchesSearch && matchesStatus && matchesType && matchesRack;
    });
});

// --- Metode untuk Aksi ---

function addAsset() {
    alert('Fitur tambah aset akan membuka form untuk menambahkan aset baru.');
    // Di aplikasi nyata, ini bisa membuka modal atau halaman baru.
}

function exportAssets() {
    alert('Fitur export akan mengunduh data aset dalam format Excel/CSV.');
}

function viewAsset(asset) {
    alert(`Melihat detail untuk: ${asset.name}\nID: ${asset.id}\nStatus: ${asset.status}`);
}

function editAsset(asset) {
    alert(`Mengedit: ${asset.name}`);
}

function deleteAsset(assetId) {
    const asset = allAssets.find(a => a.id === assetId);
    if (confirm(`Apakah Anda yakin ingin menghapus: ${asset.name}?`)) {
        const index = allAssets.findIndex(a => a.id === assetId);
        if (index !== -1) {
            allAssets.splice(index, 1); // Hapus aset dari array, Vue akan update UI
        }
        alert(`${asset.name} telah dihapus.`);
    }
}
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

.no-results {
    text-align: center;
    padding: 3rem;
    color: var(--gray);
    background: var(--white);
    border-radius: var(--border-radius);
    margin-top: 2rem;
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
}

.filter-select:focus {
    outline: none;
    border-color: var(--primary);
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

/* Asset Grid */
.asset-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.asset-card {
    background: var(--white);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    box-shadow: var(--shadow);
    transition: var(--transition);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    animation: fadeInUp 0.5s ease-out forwards;
}

.asset-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--gradient-primary);
}

.asset-card .status-maintenance+.asset-card::before {
    background: var(--gradient-accent);
}

.asset-card .status-inactive+.asset-card::before {
    background: var(--gray);
}


.asset-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-hover);
}

.asset-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
}

.asset-info {
    flex: 1;
}

.asset-id {
    font-size: 0.8rem;
    color: var(--gray);
    font-weight: 500;
    margin-bottom: 0.25rem;
}

.asset-name {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--dark);
    margin-bottom: 0.5rem;
}

.asset-type {
    font-size: 0.9rem;
    color: var(--gray);
}

.asset-status {
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
    text-transform: capitalize;
}

.status-active {
    background: rgba(52, 168, 83, 0.1);
    color: var(--secondary);
}

.status-maintenance {
    background: rgba(251, 188, 4, 0.1);
    color: var(--accent);
}

.status-inactive {
    background: rgba(95, 99, 104, 0.1);
    color: var(--gray);
}

.asset-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1rem;
    border-top: 1px solid var(--light-gray);
    padding-top: 1rem;
}

.detail-item {
    display: flex;
    flex-direction: column;
}

.detail-label {
    font-size: 0.8rem;
    color: var(--gray);
    margin-bottom: 0.25rem;
}

.detail-value {
    font-weight: 600;
    color: var(--dark);
    font-size: 0.9rem;
}

.asset-actions {
    display: flex;
    gap: 0.5rem;
    margin-top: auto;
    /* Mendorong tombol ke bawah */
    padding-top: 1rem;
    border-top: 1px solid var(--light-gray);
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
    width: 36px;
    height: 36px;
}

.action-btn.view {
    background: rgba(26, 115, 232, 0.1);
    color: var(--primary);
}

.action-btn.edit {
    background: rgba(251, 188, 4, 0.1);
    color: var(--accent);
}

.action-btn.delete {
    background: rgba(234, 67, 53, 0.1);
    color: var(--danger);
}

.action-btn:hover {
    transform: scale(1.1);
    filter: brightness(1.1);
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
        max-width: none;
    }

    .asset-grid {
        grid-template-columns: 1fr;
    }

    .asset-details {
        grid-template-columns: 1fr;
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