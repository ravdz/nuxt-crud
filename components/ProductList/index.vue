<template>
  <div
    class="flex justify-center items-stretch pt-2 pb-6 px-4 border-b border-gray-100"
  >
    <div class="basis-full flex justify-start items-center">
      <span class="text-sm text-gray-500">Name</span>
    </div>
  </div>
  <ul role="list" class="divide-y divide-gray-100">
    <ProductListItem
      v-for="product in products"
      :product="product"
      :key="product.id"
      @refresh="handleRefreshCategoryList"
    />
  </ul>
</template>

<script setup lang="ts">
import ProductListItem from "@/components/ProductList/ProductListItem.vue";
import type { Product } from "@/types/product";

interface Props {
  products: Product[];
}

const emit = defineEmits(["refresh"]);

const props = defineProps<Props>();

const handleRefreshCategoryList = () => {
  emit("refresh");
};
</script>
