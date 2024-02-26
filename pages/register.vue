<template>
  <div>
    <NuxtLayout>
      <div class="flex flex-1 flex-col justify-center">
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Heading is="h1">Sing up a new account</Heading>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6" @submit="handleRegister($event)">
            <Input
              v-model="email"
              name="email"
              type="email"
              label="Email address"
              :disabled="loading"
            />

            <Input
              v-model="password"
              name="password"
              type="password"
              label="Password"
              :disabled="loading"
            />

            <Input
              v-model="passwordConfirm"
              name="passwordConfirm"
              type="password"
              label="Confirm password"
              :disabled="loading"
            />

            <Button
              class="w-full"
              type="submit"
              name="submit"
              :disabled="loading"
            >
              Sign up
            </Button>
          </form>

          <p class="mt-10 text-center text-sm text-gray-500">
            Already have an account?
            <NuxtLink
              to="/login"
              class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sing in
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
import { register } from "@/requests/accounts";
import { useResponseErrorMsg } from "@/composables/useResponseErrorMsg";

const loading = ref<boolean>(false);
const email = ref<string>("");
const password = ref<string>("");
const passwordConfirm = ref<string>("");

const { $toast } = useNuxtApp();

const resetForm = () => {
  email.value = "";
  password.value = "";
  passwordConfirm.value = "";
};

const handleRegister = async (event: Event) => {
  event.preventDefault();
  try {
    loading.value = true;
    const payload = {
      email: email.value,
      password: password.value,
      passwordConfirm: passwordConfirm.value,
    };
    await register(payload);
    resetForm();
    $toast.success(
      "Account created successfully, please confirm your email address",
    );
  } catch (error: any) {
    const errorMsg: string = useResponseErrorMsg(error);
    $toast.error(errorMsg);
  } finally {
    loading.value = false;
  }
};
</script>
