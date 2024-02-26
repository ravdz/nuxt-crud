<template>
  <div>
    <div v-if="!!label" class="flex items-center justify-between">
      <label
        :for="name"
        class="block text-sm font-medium leading-6 text-gray-900"
        >{{ label }}
      </label>
    </div>
    <div class="mt-2">
      <input
        :id="name"
        :name="name"
        :type="type"
        v-model="inputValue"
        :disabled="disabled"
        :class="
          disabled ? 'bg-gray-100 text-gray-300' : 'bg-white text-gray-900'
        "
        class="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-all"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "~/components/Button.vue";

interface Props {
  label?: string;
  name: string;
  type: string;
  modelValue: string | number;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const emit = defineEmits(["update:modelValue"]);

const inputValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    if (!props.disabled) emit("update:modelValue", value);
  },
});
</script>
