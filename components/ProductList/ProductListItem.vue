<template>
  <li class="flex justify-center items-stretch py-4 px-4">
    <div class="basis-3/4 flex justify-start items-center">
      <span class="text-sm text-gray-900"> {{ product.name }} </span>
    </div>
    <div class="basis-1/4 flex justify-end items-center">
      <Button type="button" @click="handleDeleteProduct">
        <TrashIcon class="block h-4 w-4" aria-hidden="true" />
      </Button>
      <NuxtLink class="ml-2" :to="`/products/update/${product.id}`">
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
import { type Product } from "@/types/product";
import { deleteProduct } from "@/requests/products";
import { useResponseErrorMsg } from "@/composables/useResponseErrorMsg";

interface Props {
  product: Product;
}

const emit = defineEmits(["refresh"]);

const props = defineProps<Props>();

const loading = ref<boolean>(false);

const { $toast } = useNuxtApp();

const handleDeleteProduct = async () => {
  try {
    loading.value = true;
    await deleteProduct(props.product.id);
    $toast.success("Product deleted successfully");
    handleRefreshProductList();
  } catch (error: any) {
    const errorMsg: string = useResponseErrorMsg(error);
    $toast.error(errorMsg);
  } finally {
    loading.value = false;
  }
};

const handleRefreshProductList = () => {
  emit("refresh");
};
</script>
