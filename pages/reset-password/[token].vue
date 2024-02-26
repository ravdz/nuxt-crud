<template>
  <div>
    <NuxtLayout>
      <div class="flex flex-1 flex-col justify-center">
        <div v-if="isSuccess">
          <div class="mt-10">
            <Heading is="h2"
              >Password has been changed successfully!<br
            /></Heading>
          </div>

          <p class="mt-6 text-base leading-7 text-gray-600 text-center">
            You can now login with your new password.
          </p>

          <div class="mt-10 flex justify-center items-center">
            <NuxtLink to="/login">
              <Button type="button">Go to sign in</Button>
            </NuxtLink>
          </div>
        </div>

        <div v-else>
          <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <Heading is="h1">Change your password</Heading>
          </div>

          <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" @submit="handleResetPassword($event)">
              <Input
                v-model="password"
                name="password"
                type="password"
                label="New password"
                :disabled="loading"
              />

              <Input
                v-model="passwordConfirm"
                name="passwordConfirm"
                type="password"
                label="Confirm new password"
                :disabled="loading"
              />

              <Button type="submit" class="w-full" :disabled="loading">
                Change password
              </Button>
            </form>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { checkRestPasswordToken, resetPassword } from "@/requests/accounts";
import Button from "~/components/Button.vue";
import Heading from "~/components/Heading.vue";
import Input from "~/components/Input.vue";
import { useResponseErrorMsg } from "~/composables/useResponseErrorMsg";

const loading = ref<boolean>(false);
const isSuccess = ref<boolean>(false);
const password = ref<string>("");
const passwordConfirm = ref<string>("");

const { $toast } = useNuxtApp();

const { token } = useRoute().params;
const resetPasswordToken = Array.isArray(token) ? token[0] : token;

const { error } = await checkRestPasswordToken(resetPasswordToken);
if (error?.value) {
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.data,
  });
}

const resetForm = () => {
  password.value = "";
  passwordConfirm.value = "";
};

const handleResetPassword = async (event: Event) => {
  event.preventDefault();
  try {
    loading.value = true;
    const payload = {
      password: password.value,
      passwordConfirm: passwordConfirm.value,
    };
    await resetPassword(resetPasswordToken, payload);
    resetForm();
    $toast.success("Password has been changed");
    isSuccess.value = true;
  } catch (error: any) {
    const errorMsg: string = useResponseErrorMsg(error);
    $toast.error(errorMsg);
  } finally {
    loading.value = false;
  }
};
</script>
