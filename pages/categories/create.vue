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
        <Heading class="ml-6" is="h1">{{ namePreview }}</Heading>
      </div>

      <form
        @submit="handlerCreateCategory($event)"
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
          <Button type="submit" :disabled="loading">Create</Button>
        </div>
      </form>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftIcon } from "@heroicons/vue/24/outline";
import { createCategory } from "@/requests/categories";
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import { useResponseErrorMsg } from "@/composables/useResponseErrorMsg";

definePageMeta({
  auth: true,
  layout: "auth",
});

const loading = ref<boolean>(false);
const name = ref<string>("");

const { $toast } = useNuxtApp();

const namePreview = computed(() => {
  if (!name.value) return "New category";
  return name.value.replace(/['"]+/g, "");
});

const resetForm = () => {
  name.value = "";
};

const handlerCreateCategory = async (event: Event) => {
  event.preventDefault();
  try {
    loading.value = true;
    const payload = {
      name: name.value,
    };
    await createCategory(payload);
    resetForm();
    $toast.success("Category created");
    await navigateTo("/categories");
  } catch (error: any) {
    const errorMsg: string = useResponseErrorMsg(error);
    $toast.error(errorMsg);
  } finally {
    loading.value = false;
  }
};
</script>
