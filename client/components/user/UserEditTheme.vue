<script setup lang="ts">
const { $t } = useNuxtApp()
const { mode } = useAppearance()
const options = ['auto', 'dark', 'light'].map(value => ({
  value,
  item: { label: $t(`color_mode_${value}`) },
}))
</script>

<template>
  <Select
    v-model="mode"
    :options
  />
</template>
