<template>
  <div>
    <Navbar />
    <main
      class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
    >
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import Navbar from "@/components/Navbar/index.vue";
</script>
