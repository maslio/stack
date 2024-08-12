<script setup lang="ts">
defineProps<{
  selected?: boolean
}>()
</script>

<template>
  <div
    class="relative h-5 w-5 rounded-md"
    transition duration-100
    ease-out
    :color="selected ? 'primary' : 'neutral'"
  >
    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="scale-0"
    >
      <NuxtIcon
        v-if="selected"
        class="absolute left--2px top--2px"
        name="material-symbols:check-small-rounded"
        size="24"
      />
    </Transition>
  </div>
</template>
