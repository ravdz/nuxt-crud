<template>
  <div>
    <Navbar />
    <main class="w-full flex justify-stretch items-stretch">
      <Sidebar />
      <div class="w-full px-6 py-12 lg:px-8">
        <slot></slot>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import Navbar from "@/components/Navbar/index.vue";
import Sidebar from "@/components/Sidebar.vue";
// import Heading from "@/components/Heading.vue";
</script>
