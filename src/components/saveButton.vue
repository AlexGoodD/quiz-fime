<template>
  <button
    class="tw-fixed tw-bottom-5 tw-right-5 tw-w-12 tw-h-12 tw-bg-[#37763c] tw-text-white tw-text-4xl tw-font-medium tw-border-none tw-rounded-lg tw-flex tw-justify-center tw-items-center tw-shadow-md tw-cursor-pointer tw-transition tw-transform tw-duration-500 hover:tw-scale-110"
    @click="handleClick"
  >
    <font-awesome-icon icon="floppy-disk" class="tw-w-6" />
  </button>
</template>

<script setup lang="ts">
  const handleClick = () => {
    console.log('Floating button clicked')
  }
</script>
