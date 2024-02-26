<template>
  <div>
    <NuxtLayout>
      <div class="pb-6 lg:pb-8 flex justify-start items-center">
        <Heading is="h1">Dashboard</Heading>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  auth: true,
  layout: "auth",
});
</script>
