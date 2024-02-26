<template>
  <div>
    <NuxtLayout>
      <div class="pb-6 lg:pb-8 flex justify-start items-center">
        <Heading is="h1">Accounts</Heading>
      </div>

      <AccountList :accounts="data" />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { getAccounts } from "@/requests/accounts";
import AccountList from "@/components/AccountList/index.vue";

definePageMeta({
  auth: true,
  layout: "auth",
});

const { data, error } = await getAccounts();
if (error?.value) {
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.data,
  });
}
</script>
