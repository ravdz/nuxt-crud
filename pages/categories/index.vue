<template>
  <div>
    <NuxtLayout>
      <div class="pb-6 lg:pb-8 flex justify-between items-center">
        <Heading is="h1">Categories</Heading>
        <NuxtLink to="/categories/create">
          <Button type="button" class="flex justify-center items-center">
            <PlusIcon
              class="block h-4 w-4 mr-1 text-white"
              aria-hidden="true"
            />
            Add new
          </Button>
        </NuxtLink>
      </div>

      <CategoryList
        v-if="data"
        :categories="data"
        @refresh="handleRefreshCategoryList"
      />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { PlusIcon } from "@heroicons/vue/24/outline";
import { getCategories } from "@/requests/categories";
import CategoryList from "@/components/CategoryList/index.vue";

definePageMeta({
  auth: true,
  layout: "auth",
});

const { data, refresh, error } = await getCategories();
if (error?.value) {
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.data,
  });
}

const handleRefreshCategoryList = () => {
  refresh();
};
</script>
