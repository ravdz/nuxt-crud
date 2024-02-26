<template>
  <div class="flex space-x-4">
    <NuxtLink
      to="/register"
      class="rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:text-indigo-500"
      >Sing up
    </NuxtLink>

    <NuxtLink to="/login">
      <Button type="button" name="signIn"> Sing in</Button>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts"></script>
