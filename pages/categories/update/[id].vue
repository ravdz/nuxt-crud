<template>
  <div>
    <NuxtLayout>
      <div class="pb-6 lg:pb-8 flex justify-start items-center">
        <NuxtLink to="/categories">
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
        @submit="handlerUpdateCategory($event)"
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
import { getCategory, updateCategory } from "@/requests/categories";
import { useError } from "@/composables/userError";
import { ArrowLeftIcon } from "@heroicons/vue/24/outline";
import Button from "~/components/Button.vue";
import Input from "~/components/Input.vue";
import { useResponseErrorMsg } from "~/composables/useResponseErrorMsg";

definePageMeta({
  auth: true,
  layout: "auth",
});

const { id } = useRoute().params;
const categoryId = Array.isArray(id) ? parseInt(id[0], 10) : parseInt(id, 10);
const { data, error } = await getCategory(categoryId, {
  pick: ["name", "products"],
});

if (error?.value) {
  const err = useError(error.value);

  throw createError({ ...err, fatal: true });
}

const loading = ref<boolean>(false);
const name = ref<string>(data.value.name);

const { $toast } = useNuxtApp();

const resetForm = () => {
  name.value = "";
};

const handlerUpdateCategory = async (event: Event) => {
  event.preventDefault();
  try {
    loading.value = true;
    const payload = {
      name: name.value,
    };
    await updateCategory(categoryId, payload);
    resetForm();
    $toast.success("Category updated");
    await navigateTo("/categories");
  } catch (error: any) {
    const errorMsg: string = useResponseErrorMsg(error);
    $toast.error(errorMsg);
  } finally {
    loading.value = false;
  }
};
</script>
