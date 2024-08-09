<script setup lang="ts">
const model = defineModel<string>({ required: true })
const options = [
  { label: 'Employee', value: 'employee' },
  { label: 'Freelancer', value: 'freelancer' },
]
</script>

<template>
  <Select
    v-model="model"
    label="$t:person.type"
    :options="options"
    option-value="value"
    option-label="label"
  />
</template>
