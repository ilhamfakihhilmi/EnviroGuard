import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Index.vue";

// Impor komponen lain (bisa dibuat sebagai placeholder seperti di atas)
import Dashboard from "./components/Dashboard.vue";
import Rack from "./components/Rack.vue";
import Asset from "./components/Asset.vue";
import Visitor from "./components/Visitor.vue";
import Monitoring from "./components/Monitoring.vue";
import Reports from "./components/Reports.vue";
import MobileApp from "./components/MobileApp.vue";
import Chatbot from "./components/Chatbot.vue";
import ROICalculator from "./components/ROICalculator.vue";
import GalleryTeknis from "./components/GalleryApp.vue";
// import NotFound from "../views/NotFound.vue";

// Buat komponen placeholder langsung di sini atau impor dari file terpisah

// Definisikan semua rute aplikasi
export const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { title: "EnviroGuard - Home" },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { title: "Dashboard" },
  },
  {
    path: "/rack",
    name: "RackVisualization",
    component: Rack,
    meta: { title: "Visualisasi Rak" },
  },
  {
    path: "/asset",
    name: "AssetManagement",
    component: Asset,
    meta: { title: "Manajemen Aset" },
  },
  {
    path: "/visitor",
    name: "VisitorManagement",
    component: Visitor,
    meta: { title: "Manajemen Pengunjung" },
  },
  {
    path: "/monitoring",
    name: "EnvironmentalMonitoring",
    component: Monitoring,
    meta: { title: "Monitoring Lingkungan" },
  },
  {
    path: "/laporan",
    name: "Reporting",
    component: Reports,
    meta: { title: "Fitur Pelaporan" },
  },
  {
    path: "/mobile",
    name: "MobileApp",
    component: MobileApp,
    meta: { title: "Aplikasi Mobile" },
  },
  {
    path: "/chatbot",
    name: "Chatbot",
    component: Chatbot,
    meta: { title: "AI Chatbot Assistant" },
  },
  {
    path: "/roi-calculator",
    name: "ROICalculator",
    component: ROICalculator,
    meta: { title: "Kalkulator ROI" },
  },
  {
    path: "/gallery",
    name: "GalleryTeknis",
    component: GalleryTeknis,
    meta: { title: "Gallery Teknis" },
  },
  // {
  //   // Rute Catch-all untuk halaman 404
  //   path: "/:pathMatch(.*)*",
  //   name: "NotFound",
  //   component: NotFound,
  //   meta: { title: "404 - Tidak Ditemukan" },
  // },
];

// Buat instance router
const router = createRouter({
  history: createWebHistory(), // Menggunakan HTML5 history mode
  routes, // kependekan dari `routes: routes`
});

// (Opsional) Menambahkan judul dinamis pada tab browser
// router.beforeEach((to, from, next) => {
//   document.title = to.meta.title || "EnviroGuard";
//   next();
// });

export default router;
