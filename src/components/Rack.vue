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

        <div class="racks-grid">
            <div v-for="rack in racks" :key="rack.id" class="rack-container"
                :class="{ 'selected': selectedRack && rack.id === selectedRack.id }" @click="selectRack(rack)">
                <div class="rack-visual">
                    <h3 class="rack-title">{{ rack.name }}</h3>
                    <p class="rack-location">{{ rack.location }}</p>

                    <div class="rack-alerts">
                        <div v-for="alert in rack.alerts" :key="alert.id" :class="['alert-badge', alert.type]">
                            <i :class="alert.icon"></i>
                            {{ alert.message }}
                        </div>
                    </div>

                    <div class="door-status">
                        <div class="status-item">
                            <i class="fas fa-door-open"></i>
                            <span>Pintu: {{ rack.doorStatus }}</span>
                            <div :class="['status-indicator', rack.doorStatus.toLowerCase()]"></div>
                        </div>
                    </div>

                    <div class="surveillance-status">
                        <div class="status-item">
                            <i class="fas fa-video"></i>
                            <span>Camera: {{ rack.cameraStatus }}</span>
                            <div :class="['status-indicator', rack.cameraStatus.toLowerCase()]"></div>
                        </div>
                    </div>

                    <div class="rack-frame">
                        <div class="rack-units">
                            <div v-for="unit in rack.units" :key="unit.number" :class="['rack-unit', unit.statusClass]"
                                :title="unit.title" @click.stop="showUnitDetails(unit)">
                                {{ unit.displayName }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="selectedRack" class="rack-details-container">
            <div class="rack-details">
                <div class="details-header">
                    <h3 class="details-title">Detail Rak: {{ selectedRack.name }}</h3>
                </div>

                <div class="details-grid">
                    <div class="detail-card">
                        <div class="detail-label">Kapasitas</div>
                        <div class="detail-value">
                            {{ selectedRack.stats.capacity.used }}U
                            <span class="detail-unit">
                                ({{ selectedRack.stats.capacity.total }}U Terpakai - {{
                                    selectedRack.stats.capacity.percentage }}%)
                            </span>
                        </div>
                    </div>
                    <div class="detail-card">
                        <div class="detail-label">Power</div>
                        <div class="detail-value">
                            {{ selectedRack.stats.power.used.toFixed(1) }} kW
                            <span class="detail-unit">
                                / {{ selectedRack.stats.power.total }} kW ({{ selectedRack.stats.power.percentage }}%)
                            </span>
                        </div>
                    </div>
                    <div class="detail-card">
                        <div class="detail-label">Berat</div>
                        <div class="detail-value">
                            {{ selectedRack.stats.weight.used }} kg
                            <span class="detail-unit">
                                / {{ selectedRack.stats.weight.total }} kg
                            </span>
                        </div>
                    </div>
                    <div class="detail-card">
                        <div class="detail-label">Suhu</div>
                        <div class="detail-value">
                            {{ selectedRack.stats.temperature.value.toFixed(1) }}°C
                            <span class="detail-unit">
                                ({{ selectedRack.stats.temperature.status }})
                            </span>
                        </div>
                    </div>
                    <!-- <div class="detail-card">
                        <div class="detail-label">Koneksi Jaringan</div>
                        <div class="detail-value">
                            {{ selectedRack.stats.network.speed }}
                            <span class="detail-unit">
                                {{ selectedRack.stats.network.status }}
                            </span>
                        </div>
                    </div> -->
                    <div class="detail-card">
                        <div class="detail-label">Kelembaban</div>
                        <div class="detail-value">
                            {{ selectedRack.stats.humidity.value }}%
                            <span class="detail-unit">
                                ({{ selectedRack.stats.humidity.status }})
                            </span>
                        </div>
                    </div>
                </div>

                <div class="equipment-section">
                    <h4 class="section-title">Perangkat Terpasang di {{ selectedRack.name }}</h4>
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
                            <tr v-if="selectedRack.installedDevices.length === 0">
                                <td colspan="4" style="text-align: center;">Tidak ada perangkat terpasang.</td>
                            </tr>
                            <tr v-for="device in selectedRack.installedDevices" :key="device.unit">
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

    <router-link to="/chatbot" class="floating-chatbot">
        <i class="fas fa-robot"></i>
        <div class="chatbot-tooltip">
            Asisten Chatbot AI
        </div>
    </router-link>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'animate.css';

const totalUnits = 42;
const selectedRack = ref(null);

const racks = reactive([
    {
        id: 'rack-1',
        name: 'Rack Server AB-12',
        location: 'PLN Pusat - Lantai 3 - Room 302',
        doorStatus: 'Terkunci',
        cameraStatus: 'Aktif',
        alerts: [
            { id: 1, type: 'warning', icon: 'fas fa-exclamation-triangle', message: 'Suhu Tinggi' },
            { id: 2, type: 'info', icon: 'fas fa-info-circle', message: 'Maintenance Terjadwal' }
        ],
        installedDevices: [
            { unit: 'U38-U39', start: 38, end: 39, name: 'Dell PowerEdge R740', status: 'Active', power: '450W' },
            { unit: 'U35-U36', start: 35, end: 36, name: 'Cisco Catalyst 9300', status: 'Maintenance', power: '150W' },
            { unit: 'U28-U31', start: 28, end: 31, name: 'EMC Isilon H500', status: 'Active', power: '700W' },
        ],
        stats: {
            capacity: { used: 8, total: 42, percentage: 19 },
            power: { used: 1.3, total: 5.0, percentage: 26 },
            weight: { used: 120, total: 750 },
            temperature: { value: 28.5, status: 'Tinggi' },
            network: { speed: '10 Gbps', status: 'Aktif' },
            humidity: { value: 55, status: 'Normal' }
        },
        units: []
    },
    {
        id: 'rack-2',
        name: 'Rack Server CD-05',
        location: 'PLN Pusat - Lantai 3 - Room 304',
        doorStatus: 'Terbuka',
        cameraStatus: 'Aktif',
        alerts: [
            { id: 3, type: 'success', icon: 'fas fa-check-circle', message: 'Semua Normal' }
        ],
        installedDevices: [
            { unit: 'U40-U42', start: 40, end: 42, name: 'Juniper MX204', status: 'Active', power: '500W' },
            { unit: 'U25-U26', start: 25, end: 26, name: 'PDU Vertikal', status: 'Active', power: '50W' },
        ],
        stats: {
            capacity: { used: 5, total: 42, percentage: 17 },
            power: { used: 0.97, total: 5.0, percentage: 19 },
            weight: { used: 95, total: 750 },
            temperature: { value: 22.1, status: 'Normal' },
            network: { speed: '10 Gbps', status: 'Redundan' },
            humidity: { value: 48, status: 'Normal' }
        },
        units: []
    },
    {
        id: 'rack-3',
        name: 'Rack Server EF-08',
        location: 'PLN Pusat - Lantai 2 - Room 201',
        doorStatus: 'Terkunci',
        cameraStatus: 'Maintenance',
        alerts: [
            { id: 4, type: 'danger', icon: 'fas fa-times-circle', message: 'Power Critical' },
            { id: 5, type: 'warning', icon: 'fas fa-video-slash', message: 'Camera Offline' }
        ],
        installedDevices: [
            { unit: 'U39-U40', start: 39, end: 40, name: 'IBM Power System S922', status: 'Active', power: '800W' },
            { unit: 'U30-U31', start: 30, end: 31, name: 'Fortinet Firewall 100F', status: 'Active', power: '120W' },
            { unit: 'U20-U22', start: 20, end: 22, name: 'Server #3 (Unknown)', status: 'Active', power: '600W' },
        ],
        stats: {
            capacity: { used: 7, total: 42, percentage: 17 },
            power: { used: 4.5, total: 5.0, percentage: 90 },
            weight: { used: 150, total: 750 },
            temperature: { value: 25.0, status: 'Normal' },
            network: { speed: '1 Gbps', status: 'Degraded' },
            humidity: { value: 65, status: 'Tinggi' }
        },
        units: []
    },
    {
        id: 'rack-4',
        name: 'Rack Server GH-11',
        location: 'PLN Pusat - Lantai 2 - Room 203',
        doorStatus: 'Terkunci',
        cameraStatus: 'Aktif',
        alerts: [
            { id: 6, type: 'info', icon: 'fas fa-tools', message: 'Upgrade Scheduled' }
        ],
        installedDevices: [
            { unit: 'U35-U42', start: 35, end: 42, name: 'NetApp AFF A400', status: 'Active', power: '650W' },
            { unit: 'U25-U28', start: 25, end: 28, name: 'Cisco Blade Server', status: 'Active', power: '1200W' },
        ],
        stats: {
            capacity: { used: 12, total: 42, percentage: 29 },
            power: { used: 1.85, total: 5.0, percentage: 37 },
            weight: { used: 210, total: 750 },
            temperature: { value: 23.4, status: 'Normal' },
            network: { speed: '40 Gbps', status: 'Aktif' },
            humidity: { value: 50, status: 'Normal' }
        },
        units: []
    }
]);

const legendItems = [
    { label: 'Aktif', style: 'background: var(--gradient-primary)' },
    { label: 'Maintenance', style: 'background: var(--gradient-accent)' },
    { label: 'Critical', style: 'background: var(--gradient-danger)' },
    { label: 'Kosong', style: 'background: var(--light-gray); border: 1px dashed var(--gray)' },
];

function generateRackUnits(installedDevices) {
    const units = [];
    for (let i = totalUnits; i >= 1; i--) {
        const device = installedDevices.find(d => i >= d.start && i <= d.end);
        let statusMap = { 'Active': 'used', 'Maintenance': 'maintenance', 'Critical': 'critical' };
        if (device) {
            units.push({ number: i, status: device.status, statusClass: statusMap[device.status] || 'used', displayName: `U${i}: ${device.name}`, title: `Unit ${i} - ${device.name} (${device.status})`, deviceData: device });
        } else {
            units.push({ number: i, status: 'Kosong', statusClass: 'empty', displayName: `U${i}`, title: `Unit ${i} - Kosong`, deviceData: null });
        }
    }
    return units;
}

racks.forEach(rack => { rack.units = generateRackUnits(rack.installedDevices); });

function selectRack(rack) { selectedRack.value = rack; }

// --- FUNGSI POPUP YANG DIPERBARUI ---
function showUnitDetails(unit) {
    const statusInfo = {
        'Active': { icon: 'fa-check-circle', color: 'var(--secondary)', name: 'Aktif' },
        'Maintenance': { icon: 'fa-tools', color: 'var(--accent)', name: 'Maintenance' },
        'Critical': { icon: 'fa-exclamation-triangle', color: 'var(--danger)', name: 'Kritis' },
    };

    if (unit.deviceData) {
        const deviceStatus = statusInfo[unit.deviceData.status];
        Swal.fire({
            width: 600,
            html: `
                <div class="swal-custom-header" style="background: ${deviceStatus.color};">
                    <i class="fas ${deviceStatus.icon}"></i>
                    <h2>Detail Perangkat</h2>
                </div>
                <div class="swal-custom-content">
                    <h3>${unit.deviceData.name}</h3>
                    <div class="swal-detail-item">
                        <i class="fas fa-layer-group"></i>
                        <span>Posisi Unit</span>
                        <strong>${unit.deviceData.unit}</strong>
                    </div>
                    <div class="swal-detail-item">
                        <i class="fas fa-heartbeat"></i>
                        <span>Status</span>
                        <strong style="color: ${deviceStatus.color};">${deviceStatus.name}</strong>
                    </div>
                    <div class="swal-detail-item">
                        <i class="fas fa-bolt"></i>
                        <span>Konsumsi Daya</span>
                        <strong>${unit.deviceData.power}</strong>
                    </div>
                </div>
            `,
            // --- Tombol diubah di sini ---
            showConfirmButton: true, // Tombol utama untuk menutup
            confirmButtonText: 'Tutup',
            showCancelButton: false, // Tombol kedua dihapus
            // -----------------------------
            customClass: {
                popup: 'animated animate__fadeInDown swal-custom-popup',
                confirmButton: 'swal-custom-cancel-button', // Menggunakan style tombol abu-abu
            },
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            },
        });

    } else {
        Swal.fire({
            icon: 'info',
            title: `<span style="color: var(--dark);">Unit ${unit.number}: Kosong</span>`,
            html: `<p style="color: var(--gray);">Unit ini tersedia untuk instalasi perangkat baru.</p>`,
            confirmButtonText: 'OK',
            customClass: {
                popup: 'swal-custom-popup',
                confirmButton: 'swal-custom-confirm-button',
            },
        });
    }
}

onMounted(() => { if (racks.length > 0) { selectRack(racks[0]); } });
</script>

<style>
/* --- STYLE GLOBAL UNTUK SWEETALERT2 KUSTOM --- */
.swal-custom-popup {
    border-radius: var(--border-radius) !important;
    border: none !important;
    box-shadow: var(--shadow-hover) !important;
    padding: 0 !important;
    overflow: hidden;
}

.swal-custom-header {
    padding: 1.5rem;
    color: var(--white);
    display: flex;
    align-items: center;
    gap: 1rem;
}

.swal-custom-header .fas {
    font-size: 2rem;
}

.swal-custom-header h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
}

.swal-custom-content {
    padding: 2rem;
    text-align: left;
}

.swal-custom-content h3 {
    font-size: 1.75rem;
    color: var(--dark);
    margin-bottom: 1.5rem;
    text-align: center;
}

.swal-detail-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background-color: var(--light-gray);
    border-radius: 12px;
    margin-bottom: 1rem;
    font-size: 1rem;
}

.swal-detail-item .fas {
    color: var(--primary);
    font-size: 1.25rem;
    width: 25px;
    text-align: center;
}

.swal-detail-item span {
    color: var(--gray);
}

.swal-detail-item strong {
    margin-left: auto;
    color: var(--dark);
    font-weight: 600;
}

.swal2-actions {
    padding: 0 2rem 2rem;
    gap: 1rem;
}

.swal-custom-confirm-button,
.swal-custom-cancel-button {
    border-radius: 8px !important;
    padding: 0.75rem 1.5rem !important;
    font-weight: 600 !important;
    border: none !important;
    transition: var(--transition) !important;
    box-shadow: none !important;
}

.swal-custom-confirm-button {
    background: var(--gradient-primary) !important;
    color: white !important;
}

.swal-custom-confirm-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(26, 115, 232, 0.3) !important;
}

.swal-custom-cancel-button {
    background-color: #e0e0e0 !important;
    color: var(--gray) !important;
}

.swal-custom-cancel-button:hover {
    background-color: #d1d1d1 !important;
}
</style>

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

.racks-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.rack-container {
    background: var(--white);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    overflow: hidden;
    transition: var(--transition);
    border: 3px solid transparent;
    cursor: pointer;
}

.rack-container:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-hover);
}

.rack-container.selected {
    border-color: var(--primary);
    box-shadow: var(--shadow-hover);
}


.rack-details-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-top: 2rem;
}

.rack-visual {
    padding: 1.5rem;
    position: relative;
    animation: fadeInUp 0.6s ease-out;
}

.rack-alerts {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.alert-badge {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.5rem;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 500;
}

.alert-badge.success {
    background: rgba(52, 168, 83, 0.1);
    color: var(--secondary);
}

.alert-badge.warning {
    background: rgba(251, 188, 4, 0.1);
    color: var(--accent);
}

.alert-badge.danger {
    background: rgba(234, 67, 53, 0.1);
    color: var(--danger);
}

.alert-badge.info {
    background: rgba(26, 115, 232, 0.1);
    color: var(--primary);
}

.door-status,
.surveillance-status {
    margin-bottom: 1rem;
}

.status-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    color: var(--gray);
}

.status-indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-left: auto;
}

.status-indicator.terkunci {
    background: var(--secondary);
}

.status-indicator.terbuka {
    background: var(--danger);
}

.status-indicator.aktif {
    background: var(--secondary);
}

.status-indicator.maintenance {
    background: var(--accent);
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
    margin-bottom: 1rem;
}

.rack-frame {
    background: linear-gradient(135deg, #e3f2fd, #f5f5f5);
    border-radius: 12px;
    padding: 0.75rem;
    border: 2px solid var(--light-gray);
    position: relative;
    height: 250px;
    overflow-y: auto;
}

.rack-units {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.rack-unit {
    height: 12px;
    border-radius: 4px;
    transition: var(--transition);
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 0.5rem;
    font-size: 0.5rem;
    font-weight: 500;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: rgba(255, 255, 255, 0.9);
}

.rack-unit.empty {
    background: var(--light-gray);
    border: 1px dashed var(--gray);
    color: var(--gray);
}

.rack-unit.used {
    background: var(--gradient-primary);
}

.rack-unit.maintenance {
    background: var(--gradient-accent);
}

.rack-unit.critical {
    background: var(--gradient-danger);
}

.rack-unit:hover {
    transform: scaleX(1.02);
    z-index: 10;
    font-weight: bold;
}

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
}

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