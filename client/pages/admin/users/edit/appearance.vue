<script setup lang="ts">
const { mode } = useAppearance()
const options = ['auto', 'dark', 'light'].map(value => ({
  value,
  label: `$t:appearance.${value}`,
}))
</script>

<template>
  <Select
    v-model="mode"
    :options
  />
</template>
