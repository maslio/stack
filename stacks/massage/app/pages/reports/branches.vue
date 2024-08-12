<script setup lang="ts">
const date = ref(dateFormat(new Date()))
const { items: branches } = await useItems('branches')
</script>

<template>
  <Date v-model="date" />
  <List :items="branches">
    <template #item="{ item }">
      <OpenCurrency
        :label="item.name"
        page="reports/branch"
        :props="{ branch: item, date }"
      />
    </template>
  </List>
</template>
