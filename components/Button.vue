<template>
  <button
    :type="type"
    :name="name"
    :disabled="disabled"
    :class="
      disabled
        ? 'bg-gray-300'
        : 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600'
    "
    class="flex justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
interface Props {
  name?: string | undefined;
  type: "submit" | "reset" | "button" | undefined;
  disabled?: boolean | undefined;
}

const props = defineProps<Props>();
</script>
