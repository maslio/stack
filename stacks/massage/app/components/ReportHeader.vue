<script setup lang="ts">
const { branch, date } = defineProps<{
  branch: Record<string, any>
  date: string
}>()
const format = useIntlDateFormat({
  dateStyle: 'full',
})
</script>

<template>
  <Card>
    <Item icon="material-symbols:store">
      <div class="text-sm text-faint">{{ $t('branch') }}</div>
      <div>{{ branch.name }}</div>
    </Item>
    <Item icon="material-symbols:calendar-month">
      <div class="text-sm text-faint">{{ $t('date') }}</div>
      <div>{{ format(date) }}</div>
    </Item>
  </Card>
</template>