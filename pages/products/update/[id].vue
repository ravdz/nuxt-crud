<template>
  <div>
    <NuxtLayout>
      <div class="pb-6 lg:pb-8 flex justify-start items-center">
        <NuxtLink to="/products">
          <Button type="button" class="flex justify-center items-center">
            <ArrowLeftIcon
              class="block h-4 w-4 mr-1.5 text-white"
              aria-hidden="true"
            />
            Back
          </Button>
        </NuxtLink>
        <Heading class="ml-6" is="h1">{{ data.name }}</Heading>
      </div>

      <form
        @submit="handlerUpdateProduct($event)"
        class="flex justify-start items-start flex-col"
      >
        <div
          class="flex flex-col justify-start items-stretch mb-10 w-full lg:max-w-96"
        >
          <Input
            v-model="name"
            name="name"
            type="string"
            label="Category name"
            :disabled="loading"
          />
        </div>
        <div>
          <Button type="submit" :disabled="loading">Save</Button>
        </div>
      </form>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftIcon } from "@heroicons/vue/24/outline";
import { getProduct } from "@/requests/products";
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import Dropdown from "@/components/Dropdown.vue";
import { updateProduct } from "@/requests/products";
import { useResponseErrorMsg } from "@/composables/useResponseErrorMsg";

definePageMeta({
  auth: true,
  layout: "auth",
});

const { id } = useRoute().params;
const productId = Array.isArray(id) ? parseInt(id[0], 10) : parseInt(id, 10);
const { data, error } = await getProduct(productId, {
  pick: ["name", "price", "stock", "imgUrl", "description", "category"],
});
if (error?.value) {
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.data,
  });
}

const loading = ref<boolean>(false);
const name = ref<string>("");
const price = ref<string>("");
const description = ref<string>("");
const imgUrl = ref<string>("");
const categoryId = ref<number | null>(null);
const categoryOptions = ref<{ label: string; name: number }[]>([]);

const { $toast } = useNuxtApp();

const resetForm = () => {
  name.value = "";
};

const handlerUpdateProduct = async (event: Event) => {
  event.preventDefault();
  try {
    loading.value = true;
    const payload = {
      name: name.value,
      price: parseInt(price.value, 10),
      description: description.value,
      imgUrl: imgUrl.value,
      categoryId: categoryId.value,
    };
    await updateProduct(productId, payload);
    resetForm();
    $toast.success("Product updated");
    await navigateTo("/products");
  } catch (error: any) {
    const errorMsg: string = useResponseErrorMsg(error);
    $toast.error(errorMsg);
  } finally {
    loading.value = false;
  }
};
</script>
