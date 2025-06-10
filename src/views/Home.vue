<template>
  <HelloWorld msg="Vue 3, Vite, TypeScript & Tailwind CSS" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import HelloWorld from '../components/Index.vue'

export default defineComponent({
  components: {
    HelloWorld,
  },
})
</script>
