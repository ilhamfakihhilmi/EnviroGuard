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
            <h1 class="page-title">Visualisasi Rak Server</h1>
            <p class="page-subtitle">Kelola dan visualisasikan tata letak server rack dengan detail kapasitas dan status
            </p>
        </div>

        <div class="legend">
            <h3 class="legend-title">Status Perangkat</h3>
            <div class="legend-items">
                <div v-for="item in legendItems" :key="item.label" class="legend-item">
                    <div class="legend-color" :style="item.style"></div>
                    <span class="legend-label">{{ item.label }}</span>
                </div>
            </div>
        </div>

        <div class="rack-container">
            <div class="rack-visual">
                <h3 class="rack-title">Rack Server AB-12</h3>
                <p class="rack-location">Lokasi: PLN Pusat - Lantai 3 - Room 302</p>

                <div class="rack-frame">
                    <div class="rack-units">
                        <div v-for="unit in rackUnits" :key="unit.number" :class="['rack-unit', unit.statusClass]"
                            :title="unit.title" @click="showUnitDetails(unit)">
                            {{ unit.displayName }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="rack-details">
                <div class="details-header">
                    <h3 class="details-title">Detail Rak</h3>
                </div>

                <div class="details-grid">
                    <div class="detail-card">
                        <div class="detail-label">Kapasitas</div>
                        <div class="detail-value">
                            {{ rackStats.capacity.used }}U
                            <span class="detail-unit">
                                ({{ rackStats.capacity.total }}U Terpakai - {{ rackStats.capacity.percentage }}%)
                            </span>
                        </div>
                    </div>
                    <div class="detail-card">
                        <div class="detail-label">Power</div>
                        <div class="detail-value">
                            {{ rackStats.power.used.toFixed(1) }} kW
                            <span class="detail-unit">
                                / {{ rackStats.power.total }} kW ({{ rackStats.power.percentage }}%)
                            </span>
                        </div>
                    </div>
                    <div class="detail-card">
                        <div class="detail-label">Berat</div>
                        <div class="detail-value">
                            {{ rackStats.weight.used }} kg
                            <span class="detail-unit">
                                / {{ rackStats.weight.total }} kg
                            </span>
                        </div>
                    </div>
                    <div class="detail-card">
                        <div class="detail-label">Suhu</div>
                        <div class="detail-value">
                            {{ rackStats.temperature.value.toFixed(1) }}°C
                            <span class="detail-unit">
                                ({{ rackStats.temperature.status }})
                            </span>
                        </div>
                    </div>
                    <div class="detail-card">
                        <div class="detail-label">Koneksi Jaringan</div>
                        <div class="detail-value">
                            {{ rackStats.network.speed }}
                            <span class="detail-unit">
                                {{ rackStats.network.status }}
                            </span>
                        </div>
                    </div>
                    <div class="detail-card">
                        <div class="detail-label">Kelembaban</div>
                        <div class="detail-value">
                            {{ rackStats.humidity.value }}%
                            <span class="detail-unit">
                                ({{ rackStats.humidity.status }})
                            </span>
                        </div>
                    </div>
                </div>

                <div class="equipment-section">
                    <h4 class="section-title">Perangkat Terpasang</h4>
                    <table class="equipment-table">
                        <thead>
                            <tr>
                                <th>Unit</th>
                                <th>Perangkat</th>
                                <th>Status</th>
                                <th>Power</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="device in installedDevices" :key="device.unit">
                                <td>{{ device.unit }}</td>
                                <td>{{ device.name }}</td>
                                <td><span :class="['status-badge', `status-${device.status.toLowerCase()}`]">{{
                                    device.status }}</span></td>
                                <td>{{ device.power }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { computed, onMounted, onUnmounted, reactive } from 'vue';

// --- State Reaktif (Data yang menggerakkan aplikasi) ---

const totalUnits = 42;

// Data perangkat yang terpasang. Di dunia nyata, ini akan datang dari API.
const installedDevices = reactive([
    { unit: 'U1-U2', start: 1, end: 2, name: 'Dell PowerEdge R740', status: 'Active', power: '450W' },
    { unit: 'U3-U4', start: 3, end: 4, name: 'HP ProLiant DL380', status: 'Active', power: '380W' },
    { unit: 'U5-U6', start: 5, end: 6, name: 'Cisco Nexus 9336C', status: 'Maintenance', power: '200W' },
    { unit: 'U7-U10', start: 7, end: 10, name: 'NetApp AFF A400', status: 'Active', power: '650W' },
    { unit: 'U11-U12', start: 11, end: 12, name: 'UPS Module', status: 'Critical', power: '100W' },
    { unit: 'U15-U16', start: 15, end: 16, name: 'Server #5', status: 'Active', power: '300W' }
]);

// Statistik rak yang bisa diperbarui secara real-time
const rackStats = reactive({
    capacity: { used: 16, total: 42, percentage: 38 },
    power: { used: 3.2, total: 5.0, percentage: 64 },
    weight: { used: 320, total: 750 },
    temperature: { value: 24.2, status: 'Normal' },
    network: { speed: '10 Gbps', status: 'Redundan' },
    humidity: { value: 45, status: 'Normal' }
});

const legendItems = [
    { label: 'Aktif', style: 'background: var(--gradient-primary)' },
    { label: 'Maintenance', style: 'background: var(--gradient-accent)' },
    { label: 'Critical', style: 'background: var(--gradient-danger)' },
    { label: 'Kosong', style: 'background: var(--light-gray); border: 1px dashed var(--gray)' },
];

let updateInterval = null;

// --- Computed Properties (Data turunan yang dihitung dari state) ---

// Membuat array unit rak secara dinamis.
// Ini jauh lebih efisien daripada manipulasi DOM manual.
const rackUnits = computed(() => {
    const units = [];
    for (let i = totalUnits; i >= 1; i--) {
        const device = installedDevices.find(d => i >= d.start && i <= d.end);

        let statusMap = {
            'Active': 'used',
            'Maintenance': 'maintenance',
            'Critical': 'critical'
        }

        if (device) {
            units.push({
                number: i,
                status: device.status,
                statusClass: statusMap[device.status] || 'used',
                displayName: device.name,
                title: `Unit ${i} - ${device.name}`,
                deviceData: device,
            });
        } else {
            units.push({
                number: i,
                status: 'Kosong',
                statusClass: 'empty',
                displayName: `U${i}`,
                title: `Unit ${i} - Kosong`,
                deviceData: null,
            });
        }
    }
    return units;
});

// --- Metode (Fungsi yang akan dipanggil oleh event) ---

function showUnitDetails(unit) {
    const message = unit.deviceData
        ? `Unit ${unit.number}: ${unit.deviceData.name}\nStatus: ${unit.status}`
        : `Unit ${unit.number}: Kosong\nTersedia untuk instalasi perangkat baru.`;
    alert(message);
}

// Simulasi pembaruan data real-time
function updateRackStatus() {
    // Langsung ubah data reaktif, Vue akan memperbarui tampilan.
    rackStats.temperature.value = (Math.random() * 2 + 23.5);

    const newPower = (Math.random() * 0.5 + 3.0);
    rackStats.power.used = newPower;
    rackStats.power.percentage = Math.round((newPower / rackStats.power.total) * 100);
}


// --- Lifecycle Hooks (Kode yang berjalan pada siklus hidup komponen) ---

onMounted(() => {
    // Mulai interval pembaruan saat komponen dimuat
    updateInterval = setInterval(updateRackStatus, 5000); // Dipercepat untuk demo
});

onUnmounted(() => {
    // Hentikan interval saat komponen dihancurkan untuk mencegah kebocoran memori
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

/* Rack Container */
.rack-container {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
}

.rack-visual {
    background: var(--white);
    border-radius: var(--border-radius);
    padding: 2rem;
    box-shadow: var(--shadow);
    position: relative;
    animation: fadeInUp 0.6s ease-out;
}

.rack-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--dark);
    margin-bottom: 0.5rem;
}

.rack-location {
    color: var(--gray);
    font-size: 0.9rem;
    margin-bottom: 2rem;
}

.rack-frame {
    background: linear-gradient(135deg, #e3f2fd, #f5f5f5);
    border-radius: 12px;
    padding: 1rem;
    border: 2px solid var(--light-gray);
    position: relative;
    height: 600px;
    /* Atur tinggi tetap */
    overflow-y: auto;
    /* Tambahkan scroll jika konten melebihi */
}

.rack-units {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.rack-unit {
    height: 15px;
    border-radius: 4px;
    transition: var(--transition);
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 0.5rem;
    font-size: 0.6rem;
    font-weight: 500;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.rack-unit.empty {
    background: var(--light-gray);
    border: 1px dashed var(--gray);
}

.rack-unit.used {
    background: var(--gradient-primary);
    color: white;
}

.rack-unit.maintenance {
    background: var(--gradient-accent);
    color: white;
}

.rack-unit.critical {
    background: var(--gradient-danger);
    color: white;
}

.rack-unit:hover {
    transform: scaleX(1.02);
    z-index: 10;
    font-weight: bold;
}

/* Rack Details */
.rack-details {
    background: var(--white);
    border-radius: var(--border-radius);
    padding: 2rem;
    box-shadow: var(--shadow);
    animation: fadeInUp 0.6s ease-out 0.2s;
    animation-fill-mode: both;
}

.details-header {
    margin-bottom: 2rem;
}

.details-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--dark);
    margin-bottom: 1rem;
}

.details-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.detail-card {
    background: var(--light-gray);
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;
    transition: var(--transition);
}

.detail-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-hover);
    background: var(--white);
}

.detail-label {
    color: var(--gray);
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
}

.detail-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--dark);
}

.detail-unit {
    font-size: 0.8rem;
    color: var(--gray);
    display: block;
    /* Agar span turun ke bawah */
}

/* Equipment Table */
.equipment-section {
    margin-top: 2rem;
}

.section-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--dark);
    margin-bottom: 1rem;
}

.equipment-table {
    width: 100%;
    border-collapse: collapse;
    background: var(--white);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: var(--shadow);
}

.equipment-table th {
    background: var(--light-gray);
    padding: 1rem;
    text-align: left;
    font-weight: 600;
    color: var(--dark);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.equipment-table td {
    padding: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.equipment-table tr:hover {
    background: var(--light-gray);
}

.status-badge {
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

.status-critical {
    background: rgba(234, 67, 53, 0.1);
    color: var(--danger);
}

/* Legend */
.legend {
    background: var(--white);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    box-shadow: var(--shadow);
    margin-bottom: 2rem;
    animation: fadeInUp 0.6s ease-out 0.4s;
    animation-fill-mode: both;
}

.legend-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--dark);
    margin-bottom: 1rem;
}

.legend-items {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.legend-color {
    width: 16px;
    height: 16px;
    border-radius: 4px;
}

.legend-label {
    font-size: 0.9rem;
    color: var(--gray);
}

/* Responsive Design */
@media (max-width: 1024px) {
    .rack-container {
        grid-template-columns: 1fr;
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

    .nav-link {
        padding: 0.5rem;
    }

    .main {
        padding: 1rem;
    }

    .page-title {
        font-size: 2rem;
    }

    .details-grid {
        grid-template-columns: 1fr;
    }

    .legend-items {
        flex-direction: column;
        gap: 1rem;
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
</style>