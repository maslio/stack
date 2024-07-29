<script setup lang="ts">
const { $t } = useNuxtApp()
const { mode } = useAppearance()
const options = ['auto', 'dark', 'light'].map(value => ({
  value,
  label: $t(`user.appearance.${value}`),
}))
</script>

<template>
  <Select
    v-model="mode"
    :options
  />
</template>
