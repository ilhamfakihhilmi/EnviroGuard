<template>
  <div class="roi-calculator">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">
          <i class="fas fa-calculator text-blue-600 mr-3"></i>
          Kalkulator ROI EnviroGuard
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Hitung potensi penghematan dan laba atas investasi Anda dengan sistem manajemen data center EnviroGuard
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Input Form -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">
            <i class="fas fa-edit text-blue-600 mr-2"></i>
            Parameter Investasi
          </h2>

          <div class="space-y-6">
            <!-- Current Costs -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Biaya Operasional Saat Ini (per bulan)
              </label>
              <div class="relative">
                <span class="absolute left-3 top-3 text-gray-500">Rp</span>
                <input
                  v-model.number="currentCosts"
                  type="number"
                  class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="50000000"
                />
              </div>
            </div>

            <!-- Energy Costs -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Biaya Energi (per bulan)
              </label>
              <div class="relative">
                <span class="absolute left-3 top-3 text-gray-500">Rp</span>
                <input
                  v-model.number="energyCosts"
                  type="number"
                  class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="20000000"
                />
              </div>
            </div>

            <!-- Maintenance Costs -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Biaya Maintenance (per bulan)
              </label>
              <div class="relative">
                <span class="absolute left-3 top-3 text-gray-500">Rp</span>
                <input
                  v-model.number="maintenanceCosts"
                  type="number"
                  class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="10000000"
                />
              </div>
            </div>

            <!-- Implementation Cost -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Biaya Implementasi EnviroGuard
              </label>
              <div class="relative">
                <span class="absolute left-3 top-3 text-gray-500">Rp</span>
                <input
                  v-model.number="implementationCost"
                  type="number"
                  class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="500000000"
                />
              </div>
            </div>

            <!-- Monthly Subscription -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Biaya Berlangganan (per bulan)
              </label>
              <div class="relative">
                <span class="absolute left-3 top-3 text-gray-500">Rp</span>
                <input
                  v-model.number="monthlySubscription"
                  type="number"
                  class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="5000000"
                />
              </div>
            </div>
          </div>

          <button
            @click="calculateROI"
            class="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
          >
            <i class="fas fa-calculator mr-2"></i>
            Hitung ROI
          </button>
        </div>

        <!-- Results -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">
            <i class="fas fa-chart-line text-green-600 mr-2"></i>
            Hasil Perhitungan ROI
          </h2>

          <div v-if="calculated" class="space-y-6">
            <!-- Monthly Savings -->
            <div class="bg-green-50 rounded-lg p-4">
              <h3 class="text-lg font-semibold text-green-800 mb-2">
                Penghematan Bulanan
              </h3>
              <p class="text-2xl font-bold text-green-600">
                Rp {{ formatNumber(monthlySavings) }}
              </p>
            </div>

            <!-- Annual Savings -->
            <div class="bg-blue-50 rounded-lg p-4">
              <h3 class="text-lg font-semibold text-blue-800 mb-2">
                Penghematan Tahunan
              </h3>
              <p class="text-2xl font-bold text-blue-600">
                Rp {{ formatNumber(annualSavings) }}
              </p>
            </div>

            <!-- Payback Period -->
            <div class="bg-purple-50 rounded-lg p-4">
              <h3 class="text-lg font-semibold text-purple-800 mb-2">
                Periode Pengembalian
              </h3>
              <p class="text-2xl font-bold text-purple-600">
                {{ paybackPeriod }} bulan
              </p>
            </div>

            <!-- ROI Percentage -->
            <div class="bg-yellow-50 rounded-lg p-4">
              <h3 class="text-lg font-semibold text-yellow-800 mb-2">
                ROI (3 Tahun)
              </h3>
              <p class="text-2xl font-bold text-yellow-600">
                {{ roiPercentage }}%
              </p>
            </div>

            <!-- Benefits List -->
            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="text-lg font-semibold text-gray-800 mb-3">
                Manfaat Tambahan
              </h3>
              <ul class="space-y-2 text-sm text-gray-600">
                <li class="flex items-center">
                  <i class="fas fa-check-circle text-green-500 mr-2"></i>
                  Efisiensi energi hingga 30%
                </li>
                <li class="flex items-center">
                  <i class="fas fa-check-circle text-green-500 mr-2"></i>
                  Pengurangan downtime hingga 50%
                </li>
                <li class="flex items-center">
                  <i class="fas fa-check-circle text-green-500 mr-2"></i>
                  Monitoring real-time 24/7
                </li>
                <li class="flex items-center">
                  <i class="fas fa-check-circle text-green-500 mr-2"></i>
                  Prediksi maintenance dengan AI
                </li>
                <li class="flex items-center">
                  <i class="fas fa-check-circle text-green-500 mr-2"></i>
                  Compliance dan reporting otomatis
                </li>
              </ul>
            </div>
          </div>

          <div v-else class="text-center py-12">
            <i class="fas fa-calculator text-gray-300 text-6xl mb-4"></i>
            <p class="text-gray-500">
              Masukkan parameter investasi dan klik "Hitung ROI" untuk melihat hasil
            </p>
          </div>
        </div>
      </div>

      <!-- Additional Info -->
      <div class="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white p-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold mb-4">
            Siap Mengoptimalkan Data Center Anda?
          </h2>
          <p class="text-xl mb-6">
            Hubungi tim kami untuk konsultasi gratis dan demo langsung
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <router-link
              to="/dashboard"
              class="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              <i class="fas fa-tachometer-alt mr-2"></i>
              Lihat Demo
            </router-link>
            <router-link
              to="/chatbot"
              class="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              <i class="fas fa-comments mr-2"></i>
              Konsultasi AI
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Reactive data
const currentCosts = ref(50000000)
const energyCosts = ref(20000000)
const maintenanceCosts = ref(10000000)
const implementationCost = ref(500000000)
const monthlySubscription = ref(5000000)
const calculated = ref(false)

// Computed values
const monthlySavings = computed(() => {
  // Asumsi penghematan 25% dari biaya operasional dan 30% dari biaya energi
  const operationalSavings = currentCosts.value * 0.25
  const energySavings = energyCosts.value * 0.30
  const maintenanceSavings = maintenanceCosts.value * 0.40
  return operationalSavings + energySavings + maintenanceSavings - monthlySubscription.value
})

const annualSavings = computed(() => {
  return monthlySavings.value * 12
})

const paybackPeriod = computed(() => {
  if (monthlySavings.value <= 0) return 'Tidak menguntungkan'
  return Math.ceil(implementationCost.value / monthlySavings.value)
})

const roiPercentage = computed(() => {
  const threeYearSavings = annualSavings.value * 3
  const totalInvestment = implementationCost.value + (monthlySubscription.value * 36)
  const roi = ((threeYearSavings - totalInvestment) / totalInvestment) * 100
  return Math.round(roi * 100) / 100
})

// Methods
const calculateROI = () => {
  calculated.value = true
}

const formatNumber = (number) => {
  return new Intl.NumberFormat('id-ID').format(number)
}
</script>

<style scoped>
.roi-calculator {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
}

input:focus {
  outline: none;
}

.bg-gradient-to-r {
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
}
</style>