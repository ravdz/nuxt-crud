<template>
  <div>
    <NuxtLayout>
      <div class="flex flex-1 flex-col justify-center">
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Heading is="h1">Sign in to account</Heading>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6" @submit="handleLogin($event)">
            <Input
              v-model="email"
              name="email"
              type="email"
              label="Email address"
              :disabled="loading"
            />

            <div>
              <div class="flex items-center justify-between">
                <label
                  for="password"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Password</label
                >
                <div class="text-sm">
                  <NuxtLink
                    to="/forget-password"
                    class="font-semibold text-indigo-600 hover:text-indigo-500"
                    >Forgot password?
                  </NuxtLink>
                </div>
              </div>
              <Input
                v-model="password"
                name="password"
                type="password"
                :disabled="loading"
              />
            </div>

            <Button class="w-full" type="submit" :disabled="loading"
              >Sign in
            </Button>
          </form>

          <div class="flex justify-center items-center flex-col mt-10">
            <p class="text-center text-sm text-gray-500">
              Not a member yet?
              <NuxtLink
                to="/register"
                class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >Sing up
              </NuxtLink>
            </p>
            <span class="my-2 text-sm text-gray-500">- or -</span>

            <p class="text-center text-sm text-gray-500">
              Lost your confirmation email?
              <NuxtLink
                to="/refresh-email-confirm"
                class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >Generate new here
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { navigateTo } from "#app";
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import Heading from "~/components/Heading.vue";
import { login } from "~/requests/accounts";
import { useResponseErrorMsg } from "@/composables/useResponseErrorMsg";

const loading = ref<boolean>(false);
const email = ref<string>("");
const password = ref<string>("");

const { $toast, $auth } = useNuxtApp();

const resetForm = () => {
  email.value = "";
  password.value = "";
};

const redirectOnSuccess = async () => {
  await navigateTo($auth.redirectTo.value || "/dashboard");
};

const handleLogin = async (event: Event) => {
  event.preventDefault();
  try {
    loading.value = true;
    const payload = {
      email: email.value,
      password: password.value,
    };
    await login(payload);

    resetForm();
    $toast.success("Login successful!");
    await $auth.refreshSession();
    await redirectOnSuccess();
  } catch (error: any) {
    const errorMsg: string = useResponseErrorMsg(error);
    $toast.error(errorMsg);
  } finally {
    loading.value = false;
  }
};
</script>
