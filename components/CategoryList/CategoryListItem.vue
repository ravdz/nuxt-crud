<template>
  <li class="flex justify-center items-stretch py-4 px-4">
    <div class="basis-3/4 flex justify-start items-center">
      <span class="text-sm text-gray-900"> {{ category.name }} </span>
    </div>
    <div class="basis-1/4 flex justify-end items-center">
      <Button type="button" @click="handleDeleteCategory">
        <TrashIcon class="block h-4 w-4" aria-hidden="true" />
      </Button>
      <NuxtLink class="ml-2" :to="`/categories/update/${category.id}`">
        <Button type="button">
          <PencilSquareIcon class="block h-4 w-4" aria-hidden="true" />
        </Button>
      </NuxtLink>
    </div>
  </li>
</template>
<script setup lang="ts">
import { TrashIcon, PencilSquareIcon } from "@heroicons/vue/24/outline";
import Button from "@/components/Button.vue";
import { type Category } from "@/types/category";
import { deleteCategory } from "@/requests/categories";
import { useResponseErrorMsg } from "@/composables/useResponseErrorMsg";

interface Props {
  category: Category;
}

const emit = defineEmits(["refresh"]);

const props = defineProps<Props>();

const loading = ref<boolean>(false);

const { $toast } = useNuxtApp();

const handleDeleteCategory = async () => {
  try {
    loading.value = true;
    await deleteCategory(props.category.id);
    $toast.success("Category deleted successfully");
    handleRefreshCategoryList();
  } catch (error: any) {
    const errorMsg: string = useResponseErrorMsg(error);
    $toast.error(errorMsg);
  } finally {
    loading.value = false;
  }
};

const handleRefreshCategoryList = () => {
  emit("refresh");
};
</script>
