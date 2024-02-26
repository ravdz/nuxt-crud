<template>
  <component
    class="text-center font-bold leading-9 tracking-tight text-gray-900"
    :class="styles"
    :is="is"
  >
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
interface Props {
  is: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const props = defineProps<Props>();

const styles = computed(() => {
  switch (props.is) {
    case "h1":
      return "text-3xl";
    case "h2":
      return "text-2xl";
    case "h3":
      return "text-xl";
    case "h4":
      return "text-lg";
    case "h5":
      return "text-md";
    case "h6":
      return "text-base";
    default:
      return "text-base";
  }
});
</script>
