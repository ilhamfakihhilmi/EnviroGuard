<template>
    <header class="header">
        <nav class="nav">
            <a href="index.html" class="logo">
                <div class="logo-icon">
                    <img src="assets/images/logo.jpg" alt="Logo" style="width: 40px; height: auto;" />
                </div>
                EnviroGuard
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
                <router-link to="/roi" class="nav-link">
                    <i class="fas fa-tachometer-alt"></i>
                    Roi
                </router-link>
            </div>
        </nav>
    </header>

    <main class="main">
        <div class="page-header">
            <h1 class="page-title">ROI Calculator</h1>
            <p class="page-subtitle">
                Hitung Return on Investment (ROI) dari implementasi sistem EnviroGuard
                dan lihat berapa banyak yang dapat Anda hemat.
            </p>
        </div>

        <div class="calculator-layout">
            <div class="calculator-form">
                <h2 class="form-title">
                    <div class="form-icon">
                        <i class="fas fa-calculator"></i>
                    </div>
                    Input Data
                </h2>

                <form @submit.prevent="showCalculationFeedback">
                    <div class="form-section">
                        <h3 class="section-title">Biaya Saat Ini</h3>
                        <div class="form-group">
                            <label class="form-label">Biaya Listrik Bulanan</label>
                            <div class="input-group">
                                <span class="input-prefix">Rp</span>
                                <input type="number" class="form-input input-with-prefix"
                                    v-model.number="inputs.currentElectricity" placeholder="50000000">
                            </div>
                            <div class="form-help">Rata-rata biaya listrik data center per bulan</div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Biaya Maintenance Bulanan</label>
                            <div class="input-group">
                                <span class="input-prefix">Rp</span>
                                <input type="number" class="form-input input-with-prefix"
                                    v-model.number="inputs.currentMaintenance" placeholder="25000000">
                            </div>
                            <div class="form-help">Biaya perawatan dan perbaikan rutin</div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Biaya Downtime per Jam</label>
                            <div class="input-group">
                                <span class="input-prefix">Rp</span>
                                <input type="number" class="form-input input-with-prefix"
                                    v-model.number="inputs.downtimeCost" placeholder="10000000">
                            </div>
                            <div class="form-help">Kerugian bisnis akibat downtime per jam</div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Jam Downtime per Bulan</label>
                            <input type="number" class="form-input" v-model.number="inputs.downtimeHours"
                                placeholder="8">
                            <div class="form-help">Rata-rata jam downtime yang terjadi</div>
                        </div>
                    </div>

                    <div class="form-section">
                        <h3 class="section-title">Investasi EnviroGuard</h3>
                        <div class="form-group">
                            <label class="form-label">Biaya Implementasi</label>
                            <div class="input-group">
                                <span class="input-prefix">Rp</span>
                                <input type="number" class="form-input input-with-prefix"
                                    v-model.number="inputs.implementationCost" placeholder="500000000">
                            </div>
                            <div class="form-help">Biaya awal instalasi dan setup sistem</div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Biaya Operasional Bulanan</label>
                            <div class="input-group">
                                <span class="input-prefix">Rp</span>
                                <input type="number" class="form-input input-with-prefix"
                                    v-model.number="inputs.operationalCost" placeholder="15000000">
                            </div>
                            <div class="form-help">Biaya maintenance dan support bulanan</div>
                        </div>
                    </div>

                    <div class="form-section">
                        <h3 class="section-title">Peningkatan Efisiensi (%)</h3>
                        <div class="form-group">
                            <label class="form-label">Penghematan Listrik (%)</label>
                            <input type="number" class="form-input" v-model.number="inputs.energySavings"
                                placeholder="25" min="0" max="100">
                            <div class="form-help">Persentase penghematan energi yang diharapkan</div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Pengurangan Downtime (%)</label>
                            <input type="number" class="form-input" v-model.number="inputs.downtimeReduction"
                                placeholder="80" min="0" max="100">
                            <div class="form-help">Persentase pengurangan downtime</div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Efisiensi Maintenance (%)</label>
                            <input type="number" class="form-input" v-model.number="inputs.maintenanceEfficiency"
                                placeholder="30" min="0" max="100">
                            <div class="form-help">Peningkatan efisiensi maintenance</div>
                        </div>
                    </div>

                    <button type="submit" class="calculate-btn" :class="{ 'is-calculating': isCalculating }">
                        <span v-if="!isCalculating"><i class="fas fa-calculator"></i> Hitung ROI</span>
                        <span v-else><i class="fas fa-check"></i> Perhitungan Selesai</span>
                    </button>
                </form>
            </div>

            <div class="results-panel">
                <h2 class="results-title">
                    <div class="results-icon">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    Hasil Perhitungan
                </h2>

                <div class="result-card primary">
                    <div class="result-label">ROI Tahunan</div>
                    <div class="result-value">{{ results.roiPercentage }}</div>
                    <div class="result-unit">%</div>
                </div>
                <div class="result-card secondary">
                    <div class="result-label">Payback Period</div>
                    <div class="result-value">{{ results.paybackPeriod }}</div>
                    <div class="result-unit">bulan</div>
                </div>
                <div class="result-card accent">
                    <div class="result-label">Penghematan Tahunan</div>
                    <div class="result-value">{{ results.annualSavings }}</div>
                    <div class="result-unit">juta</div>
                </div>

                <div class="roi-breakdown">
                    <h3 class="breakdown-title">Rincian Penghematan Bulanan</h3>
                    <div class="breakdown-item">
                        <span class="breakdown-label">Penghematan Listrik</span>
                        <span class="breakdown-value">{{ formatCurrency(results.electricitySavings) }}</span>
                    </div>
                    <div class="breakdown-item">
                        <span class="breakdown-label">Pengurangan Downtime</span>
                        <span class="breakdown-value">{{ formatCurrency(results.downtimeSavings) }}</span>
                    </div>
                    <div class="breakdown-item">
                        <span class="breakdown-label">Efisiensi Maintenance</span>
                        <span class="breakdown-value">{{ formatCurrency(results.maintenanceSavings) }}</span>
                    </div>
                    <div class="breakdown-item">
                        <span class="breakdown-label">Biaya Operasional</span>
                        <span class="breakdown-value">-{{ formatCurrency(results.operationalCostDisplay) }}</span>
                    </div>
                    <div class="breakdown-item">
                        <span class="breakdown-label">Total Penghematan Bersih</span>
                        <span class="breakdown-value">{{ formatCurrency(results.netSavings) }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="benefits-section">
            <h2 class="benefits-title">Manfaat Implementasi EnviroGuard</h2>
            <div class="benefits-grid">
                <div v-for="(benefit, index) in benefits" :key="benefit.title" class="benefit-card"
                    :style="{ animationDelay: `${index * 0.1}s` }">
                    <div :class="['benefit-icon', benefit.color]">
                        <i :class="benefit.icon"></i>
                    </div>
                    <h3 class="benefit-title">{{ benefit.title }}</h3>
                    <p class="benefit-description">{{ benefit.description }}</p>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';

// --- State Reaktif ---

const inputs = reactive({
    currentElectricity: 50000000,
    currentMaintenance: 25000000,
    downtimeCost: 10000000,
    downtimeHours: 8,
    implementationCost: 500000000,
    operationalCost: 15000000,
    energySavings: 25,
    downtimeReduction: 80,
    maintenanceEfficiency: 30,
});

const isCalculating = ref(false);

const benefits = reactive([
    { title: 'Efisiensi Energi', icon: 'fas fa-leaf', color: '', description: 'Optimalisasi penggunaan energi dengan monitoring real-time dan kontrol otomatis sistem pendingin.' },
    { title: 'Keandalan Sistem', icon: 'fas fa-shield-alt', color: 'secondary', description: 'Mengurangi downtime hingga 80% dengan deteksi dini masalah dan maintenance prediktif.' },
    { title: 'Analitik Mendalam', icon: 'fas fa-chart-line', color: 'accent', description: 'Dashboard komprehensif dengan insights untuk optimasi operasional dan pengambilan keputusan.' },
    { title: 'Akses Mobile', icon: 'fas fa-mobile-alt', color: 'warning', description: 'Monitoring dan kontrol dari mana saja dengan aplikasi mobile yang user-friendly.' },
]);


// --- Computed Property untuk Kalkulasi Real-time ---

const results = computed(() => {
    // Pastikan input adalah angka, jika tidak, gunakan 0
    const i = Object.fromEntries(
        Object.entries(inputs).map(([key, value]) => [key, parseFloat(value) || 0])
    );

    // Kalkulasi penghematan bulanan
    const electricitySavings = i.currentElectricity * (i.energySavings / 100);
    const downtimeSavings = i.downtimeCost * i.downtimeHours * (i.downtimeReduction / 100);
    const maintenanceSavings = i.currentMaintenance * (i.maintenanceEfficiency / 100);

    const totalMonthlySavings = electricitySavings + downtimeSavings + maintenanceSavings;
    const netMonthlySavings = totalMonthlySavings - i.operationalCost;

    // Kalkulasi hasil akhir
    const annualSavings = netMonthlySavings * 12;
    const roiPercentage = i.implementationCost > 0 ? (annualSavings / i.implementationCost) * 100 : Infinity;
    const paybackPeriod = netMonthlySavings > 0 ? i.implementationCost / netMonthlySavings : Infinity;

    return {
        roiPercentage: isFinite(roiPercentage) ? roiPercentage.toFixed(1) : '∞',
        paybackPeriod: isFinite(paybackPeriod) ? paybackPeriod.toFixed(1) : '∞',
        annualSavings: isFinite(annualSavings) ? (annualSavings / 1000000).toFixed(1) : '∞',
        electricitySavings: electricitySavings,
        downtimeSavings: downtimeSavings,
        maintenanceSavings: maintenanceSavings,
        operationalCostDisplay: i.operationalCost,
        netSavings: netMonthlySavings,
    };
});


// --- Metode ---

function formatCurrency(amount) {
    if (typeof amount !== 'number' || !isFinite(amount)) return 'Rp 0';
    return 'Rp ' + amount.toLocaleString('id-ID');
}

function showCalculationFeedback() {
    isCalculating.value = true;
    setTimeout(() => {
        isCalculating.value = false;
    }, 2000);
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

/* Calculator Layout */
.calculator-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: flex-start;
    margin-bottom: 3rem;
}

.calculator-form {
    background: var(--white);
    border-radius: var(--border-radius);
    padding: 2rem;
    box-shadow: var(--shadow);
}

.form-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--dark);
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.form-icon {
    width: 40px;
    height: 40px;
    background: var(--gradient-primary);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    flex-shrink: 0;
}

.form-section {
    margin-bottom: 2rem;
}

.section-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--dark);
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--light-gray);
}

.form-group {
    margin-bottom: 1rem;
}

.form-label {
    display: block;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--dark);
    margin-bottom: 0.5rem;
}

.form-input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 2px solid #e0e0e0;
    border-radius: 12px;
    font-size: 1rem;
    background: var(--white);
    transition: var(--transition);
}

.form-input:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.1);
}

.form-group:focus-within {
    transform: scale(1.01);
    transition: transform 0.2s ease;
}

.input-group {
    position: relative;
}

.input-prefix {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--gray);
    font-weight: 600;
    pointer-events: none;
}

.input-with-prefix {
    padding-left: 3rem;
}

.form-help {
    font-size: 0.8rem;
    color: var(--gray);
    margin-top: 0.25rem;
}

.calculate-btn {
    width: 100%;
    padding: 1rem;
    background: var(--gradient-primary);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
    box-shadow: var(--shadow);
}

.calculate-btn:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-hover);
}

.calculate-btn.is-calculating {
    background: var(--gradient-secondary);
}

/* Results Panel */
.results-panel {
    background: var(--white);
    border-radius: var(--border-radius);
    padding: 2rem;
    box-shadow: var(--shadow);
    position: sticky;
    top: 100px;
}

.results-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--dark);
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.results-icon {
    width: 40px;
    height: 40px;
    background: var(--gradient-secondary);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    flex-shrink: 0;
}

.result-card {
    background: var(--light-gray);
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    text-align: center;
    animation: slideInUp 0.5s ease-out backwards;
}

.result-card.primary {
    background: var(--gradient-primary);
    color: white;
    animation-delay: 0s;
}

.result-card.secondary {
    background: var(--gradient-secondary);
    color: white;
    animation-delay: 0.1s;
}

.result-card.accent {
    background: var(--gradient-accent);
    color: white;
    animation-delay: 0.2s;
}

.result-label {
    font-size: 0.9rem;
    font-weight: 500;
    opacity: 0.8;
    margin-bottom: 0.5rem;
}

.result-value {
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 0.25rem;
}

.result-unit {
    font-size: 0.9rem;
    opacity: 0.8;
}

.roi-breakdown {
    margin-top: 1.5rem;
}

.breakdown-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--dark);
    margin-bottom: 1rem;
}

.breakdown-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 0;
    border-bottom: 1px solid #eee;
}

.breakdown-item:last-child {
    border-bottom: none;
    font-weight: 700;
    color: var(--primary);
    margin-top: 0.5rem;
    padding-top: 1rem;
    border-top: 2px solid #e0e0e0;
}

.breakdown-label {
    color: var(--gray);
}

.breakdown-value {
    font-weight: 600;
    color: var(--dark);
}

/* Benefits Section */
.benefits-section {
    background: var(--white);
    border-radius: var(--border-radius);
    padding: 2rem;
    box-shadow: var(--shadow);
    margin-bottom: 2rem;
}

.benefits-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--dark);
    margin-bottom: 1.5rem;
    text-align: center;
}

.benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
}

.benefit-card {
    text-align: center;
    padding: 1.5rem;
    border-radius: 12px;
    background: var(--light-gray);
    transition: var(--transition);
}

.benefit-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow);
    background: var(--white);
}

.benefit-icon {
    width: 60px;
    height: 60px;
    background: var(--gradient-primary);
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: white;
    margin: 0 auto 1rem;
    transition: transform 0.3s ease;
}

.benefit-card:hover .benefit-icon {
    transform: scale(1.1) rotate(5deg);
}

.benefit-icon.secondary {
    background: var(--gradient-secondary);
}

.benefit-icon.accent {
    background: var(--gradient-accent);
}

.benefit-icon.warning {
    background: var(--gradient-danger);
}


.benefit-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--dark);
    margin-bottom: 0.5rem;
}

.benefit-description {
    color: var(--gray);
    font-size: 0.9rem;
    line-height: 1.5;
}

/* Responsive Design */
@media (max-width: 900px) {
    .calculator-layout {
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    .results-panel {
        position: static;
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

    .benefits-grid {
        grid-template-columns: 1fr;
    }
}

/* Animations */
@keyframes slideInUp {
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