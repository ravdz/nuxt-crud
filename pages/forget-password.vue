<template>
  <div>
    <NuxtLayout>
      <div class="flex flex-1 flex-col justify-center">
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Heading is="h1">Forget password</Heading>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6" @submit="handleForgetPassword($event)">
            <Input
              v-model="email"
              name="email"
              type="email"
              label="Email address"
              :disabled="loading"
            />

            <Button type="submit" class="w-full" :disabled="loading"
              >Send</Button
            >
          </form>

          <p class="mt-10 text-center text-sm text-gray-500">
            Come back to
            <NuxtLink
              to="/login"
              class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >sing in
            </NuxtLink>
          </p>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import Heading from "@/components/Heading.vue";
import { forgetPassword } from "@/requests/accounts";
import { useResponseErrorMsg } from "@/composables/useResponseErrorMsg";

const loading = ref<boolean>(false);
const email = ref<string>("");

const { $toast } = useNuxtApp();

const resetForm = () => {
  email.value = "";
};

const handleForgetPassword = async (event: Event) => {
  event.preventDefault();
  try {
    loading.value = true;
    const payload = {
      email: email.value,
    };
    await forgetPassword(payload);
    resetForm();
    $toast.success("Email sent, check your inbox");
  } catch (error: any) {
    const errorMsg: string = useResponseErrorMsg(error);
    $toast.error(errorMsg);
  } finally {
    loading.value = false;
  }
};
</script>
