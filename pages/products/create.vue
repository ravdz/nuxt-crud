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
        <Heading class="ml-6" is="h1">{{ namePreview }}</Heading>
      </div>

      <form
        @submit="handlerCreateProduct($event)"
        class="flex justify-start items-start flex-col"
      >
        <div
          class="flex flex-col justify-start items-stretch mb-10 w-full lg:max-w-96"
        >
          <Input
            v-model="name"
            name="name"
            type="string"
            label="Product name"
            :disabled="loading"
          />
        </div>
        <div
          class="flex flex-col justify-start items-stretch mb-10 w-full lg:max-w-96"
        >
          <Input
            v-model="price"
            name="price"
            type="string"
            label="Price"
            :disabled="loading"
          />
        </div>
        <div
          class="flex flex-col justify-start items-stretch mb-10 w-full lg:max-w-96"
        >
          <Input
            v-model="description"
            name="description"
            type="string"
            label="Description"
            :disabled="loading"
          />
        </div>

        <div
          class="flex flex-col justify-start items-stretch mb-10 w-full lg:max-w-96"
        >
          <Input
            v-model="imgUrl"
            name="imgUrl"
            type="string"
            label="Image URL"
            :disabled="loading"
          />
        </div>

        <div
          class="flex flex-col justify-start items-stretch mb-10 w-full lg:max-w-96"
        >
          <Dropdown
            label="Category"
            v-model="categoryId"
            placeholder="Select category"
            :options="categoryOptions"
          />
        </div>

        <div>
          <Button type="submit" :disabled="loading">Create</Button>
        </div>
      </form>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftIcon } from "@heroicons/vue/24/outline";
import { createProduct } from "@/requests/products";
import { getCategories } from "@/requests/categories";
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import Dropdown from "@/components/Dropdown.vue";
import { useResponseErrorMsg } from "@/composables/useResponseErrorMsg";

definePageMeta({
  auth: true,
  layout: "auth",
});

const loading = ref<boolean>(false);
const name = ref<string>("");
const price = ref<string>("");
const description = ref<string>("");
const imgUrl = ref<string>("");
const categoryId = ref<number | null>(null);
const categoryOptions = ref<{ label: string; name: number }[]>([]);

const { $toast } = useNuxtApp();

const namePreview = computed(() => {
  if (!name.value) return "New product";
  return name.value.replace(/['"]+/g, "");
});

const resetForm = () => {
  name.value = "";
};

const handleLoadCategories = async () => {
  try {
    const { data } = await getCategories();
    categoryOptions.value = data.value.map((category) => ({
      label: category.name,
      name: category.id,
    }));
  } catch (error: any) {
    const errorMsg: string = useResponseErrorMsg(error);
    $toast.error(errorMsg);
  }
};

const handlerCreateProduct = async (event: Event) => {
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
    await createProduct(payload);
    resetForm();
    $toast.success("Product created");
    await navigateTo("/products");
  } catch (error: any) {
    const errorMsg: string = useResponseErrorMsg(error);
    $toast.error(errorMsg);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await handleLoadCategories();
});
</script>
