<template>
  <NuxtErrorBoundary>
    <main
      class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8"
    >
      <div class="text-center">
        <p class="text-base font-semibold text-indigo-600">
          {{ error.statusCode }}
        </p>
        <h1
          class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl"
        >
          {{ error.statusMessage }}
        </h1>
        <p
          v-if="error.statusCode === 404"
          class="mt-6 text-base leading-7 text-gray-600"
        >
          Sorry, we couldn’t find the page you’re looking for.
        </p>

        <div class="mt-10 flex items-center justify-center gap-x-6">
          <Button @click="backHome" type="button">Back to homepage</Button>

          <NuxtLink
            v-if="hasGoToRefreshEmailConfirmationBtn"
            href="/refresh-email-confirm"
            class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 text-sm"
          >
            Refresh email confirmation
            <span aria-hidden="true">&rarr;</span>
          </NuxtLink>
          <NuxtLink
            v-if="hasGoToForgetPasswordPageBtn"
            href="/forget-password"
            class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 text-sm"
          >
            Reset password again
            <span aria-hidden="true">&rarr;</span>
          </NuxtLink>
        </div>
      </div>
    </main>
  </NuxtErrorBoundary>
</template>
<script setup lang="ts">
import { type ErrorObject } from "@/types/error";

const props = defineProps({
  error: {
    type: Object as () => ErrorObject,
    required: true,
  },
});

const hasGoToRefreshEmailConfirmationBtn = computed(() => {
  return !!(
    props.error?.url?.includes("/email-confirm/") &&
    props.error?.statusCode === 410
  );
});

const hasGoToForgetPasswordPageBtn = computed(() => {
  return !!(
    props.error?.url?.includes("/reset-password/") &&
    props.error?.statusCode === 410
  );
});

const backHome = () => clearError({ redirect: "/" });
</script>
