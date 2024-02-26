<template>
  <div
    class="flex justify-center items-stretch pt-2 pb-6 px-4 border-b border-gray-100"
  >
    <div class="basis-2/6 flex justify-start items-center">
      <span class="text-sm text-gray-500">Email</span>
    </div>
    <div class="basis-1/6 flex justify-center items-center">
      <span class="text-sm text-gray-500">Activated</span>
    </div>
    <div class="basis-2/6 flex justify-center items-center">
      <span class="text-sm text-gray-500">Created</span>
    </div>
    <div class="basis-2/6 flex justify-end items-center">
      <span class="text-sm text-gray-500">Last seen</span>
    </div>
  </div>
  <ul role="list" class="divide-y divide-gray-100">
    <AccountListItem
      v-for="account in accounts"
      :account="account"
      :key="account.id"
    />
  </ul>
</template>

<script setup lang="ts">
import AccountListItem from "@/components/AccountList/AccountListItem.vue";
import { type MemberAccount } from "@/types/account";

interface Props {
  accounts: MemberAccount[];
}

const props = defineProps<Props>();
</script>
