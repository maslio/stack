<script setup lang="ts">
const model = defineModel<number | null>()
const { items } = await useItems('services')
</script>

<template>
  <Select
    v-model="model"
    label="$t:service"
    :options="items"
    close-on-apply
    apply-on-change
  >
    <template #option="{ item: option }">
      <div class="flex items-center justify-between">
        <div class="flex-1 truncate">
          {{ option.name }}
        </div>
        <div v-if="option.amount" class="text-sm text-faint">
          {{ option.amount }}
        </div>
      </div>
    </template>
  </Select>
</template>
