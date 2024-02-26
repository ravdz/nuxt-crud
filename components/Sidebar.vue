<template>
  <!-- aside -->
  <aside
    class="flex w-72 flex-col space-y-2 border-r-2 border-gray-100 bg-white py-2 px-4 h-[calc(100vh-64px)]"
  >
    <NuxtLink
      class="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600 transition"
      to="/dashboard"
      >Dashboard
    </NuxtLink>

    <NuxtLink
      class="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600 transition"
      to="/orders"
      >Orders
    </NuxtLink>

    <NuxtLink
      class="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600 transition"
      to="/users"
      >Users
    </NuxtLink>

    <NuxtLink
      class="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600 transition"
      to="/products"
      >Products
    </NuxtLink>

    <NuxtLink
      class="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600 transition"
      to="/categories"
      >Categories
    </NuxtLink>

    <div class="border-t-2 border-gray-100 pt-2">
      <NuxtLink
        class="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600 transition"
        to="/accounts"
        >Accounts
      </NuxtLink>
    </div>
  </aside>
</template>
<script setup lang="ts"></script>
