<template>
  <div class="w-full">
    <div v-if="!!label" class="flex items-center justify-between">
      <label class="block text-sm font-medium leading-6 text-gray-900">
        {{ label }}
      </label>
    </div>
    <Menu as="div" class="relative block text-left mt-2">
      <div>
        <MenuButton
          class="flex w-full justify-between items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-medium leading-6 text-gray-900 shadow-sm ring-2 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          {{ labelOfSelected }}
          <ChevronDownIcon
            class="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <MenuItems
          class="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div class="py-1">
            <MenuItem
              v-slot="{ active }"
              v-for="option in options"
              :key="option.name"
              @click="handleSelectOption(option.name)"
            >
              <span
                :class="[
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'block px-4 py-2 text-sm cursor-pointer',
                ]"
              >
                {{ option.label }}
              </span>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";

interface Props {
  label?: string;
  options: {
    label: string;
    name: string | number;
  }[];
  disabled?: boolean;
  placeholder: string;
  modelValue: string | number | null;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const emit = defineEmits(["update:modelValue"]);

const labelOfSelected = computed(() => {
  const selected = props.options.find(
    (option) => option.name === props.modelValue,
  );
  return selected ? selected.label : props.placeholder;
});

const handleSelectOption = (name: string | number) => {
  if (!props.disabled) emit("update:modelValue", name);
};
</script>
