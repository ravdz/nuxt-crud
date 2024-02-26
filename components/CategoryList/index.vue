<template>
  <div
    class="flex justify-center items-stretch pt-2 pb-6 px-4 border-b border-gray-100"
  >
    <div class="basis-full flex justify-start items-center">
      <span class="text-sm text-gray-500">Name</span>
    </div>
  </div>
  <ul role="list" class="divide-y divide-gray-100">
    <CategoryListItem
      v-for="category in categories"
      :category="category"
      :key="category.id"
      @refresh="handleRefreshCategoryList"
    />
  </ul>
</template>

<script setup lang="ts">
import CategoryListItem from "@/components/CategoryList/CategoryListItem.vue";
import { type Category } from "@/types/category";

interface Props {
  categories: Category[];
}

const emit = defineEmits(["refresh"]);

const props = defineProps<Props>();

const handleRefreshCategoryList = () => {
  emit("refresh");
};
</script>
