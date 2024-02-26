<template>
  <div>
    <NuxtLayout>
      <div class="pb-6 lg:pb-8 flex justify-between items-center">
        <Heading is="h1">Products</Heading>
        <NuxtLink to="/products/create">
          <Button type="button" class="flex justify-center items-center">
            <PlusIcon
              class="block h-4 w-4 mr-1 text-white"
              aria-hidden="true"
            />
            Add new
          </Button>
        </NuxtLink>
      </div>

      <ProductList
        v-if="data"
        :products="data"
        @refresh="handleRefreshProductList"
      />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { getProducts } from "@/requests/products";
import ProductList from "@/components/ProductList/index.vue";
import { PlusIcon } from "@heroicons/vue/24/outline";

definePageMeta({
  auth: true,
  layout: "auth",
});

const { data, error, refresh } = await getProducts();
if (error?.value) {
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.data,
  });
}

const handleRefreshProductList = () => {
  refresh();
};
</script>
