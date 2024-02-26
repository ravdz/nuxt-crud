<template>
  <div>
    <NuxtLayout>
      <div class="flex flex-1 flex-col justify-center">
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Heading is="h2"> Email confirmed successfully!</Heading>
        </div>
        <p class="mt-10 text-center text-sm text-gray-500">
          Come back and
          <NuxtLink
            to="/login"
            class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            sing in
          </NuxtLink>
        </p>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { checkEmailConfirmToken } from "@/requests/accounts";
import Heading from "@/components/Heading.vue";

const { token } = useRoute().params;
const emailConfirmToken = Array.isArray(token) ? token[0] : token;

const { error } = await checkEmailConfirmToken(emailConfirmToken);
if (error?.value) {
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.data,
  });
}
</script>
