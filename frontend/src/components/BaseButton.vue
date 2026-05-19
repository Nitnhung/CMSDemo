<template>
  <button
    :type="type"
    :class="[
      'font-medium py-2 px-4 rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
      variantClasses[variant],
      customClass
    ]"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary', // primary, secondary, danger, ghost
  },
  type: {
    type: String,
    default: 'button',
  },
  customClass: {
    type: String,
    default: '',
  }
});

const variantClasses = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm focus:ring-blue-500',
  secondary: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm focus:ring-gray-200',
  danger: 'text-red-600 hover:text-red-800 hover:bg-red-50 focus:ring-red-500',
  warning: 'text-amber-600 hover:text-amber-800 hover:bg-amber-50 focus:ring-amber-500',
  link: 'text-blue-600 hover:underline p-0 focus:ring-blue-400',
};
</script>