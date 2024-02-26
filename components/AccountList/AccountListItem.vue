<template>
  <li class="flex justify-center items-stretch py-4 px-4">
    <div class="basis-2/6 flex justify-start items-center">
      <span class="text-sm text-gray-900">
        {{ account.email }}
      </span>
    </div>
    <div class="basis-1/6 flex justify-center items-center">
      <span class="text-sm text-gray-900">{{
        account.isActive ? "Yes" : "No"
      }}</span>
    </div>
    <div class="basis-2/6 flex justify-center items-center">
      <span class="text-sm text-gray-900">
        {{ account.createdAt }}
      </span>
    </div>
    <div class="basis-2/6 flex justify-end items-center">
      <span class="text-sm text-gray-900">
        {{ account.updatedAt }}
      </span>
    </div>
  </li>
</template>
<script setup lang="ts">
import { type MemberAccount } from "@/types/account";

interface Props {
  account: MemberAccount;
}

const props = defineProps<Props>();
</script>
