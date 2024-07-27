<script setup lang="ts">
import { addDays, subDays } from 'date-fns'

const props = defineProps<{
  label?: string
  readonly?: boolean
}>()

const { $t, $language } = useNuxtApp()
const label = computed(() => props.label ?? $t('date'))
const open = openRef()
const { format: formatPresetDate } = new Intl.DateTimeFormat($language, {
  month: 'long',
  year: 'numeric',
  day: 'numeric',
})

const model = defineModel<string>({
  default: dateFormat(new Date()),
})
function onCalendarSelect(value: string) {
  model.value = value
}

const presets = [{
  value: dateFormat(subDays(new Date(), 1)),
  item: {
    label: $t('yesterday'),
    value: formatPresetDate(subDays(new Date(), 1)),
  },
}, {
  value: dateFormat(new Date()),
  item: {
    label: $t('today'),
    value: formatPresetDate(new Date()),
  },
}, {
  value: dateFormat(addDays(new Date(), 1)),
  item: {
    label: $t('tomorrow'),
    value: formatPresetDate(addDays(new Date(), 1)),
  },
}]

const value = computed(() => {
  const preset = presets.find(p => p.value === model.value)
  if (preset)
    return preset.item.label
  return formatPresetDate(new Date(model.value))
})
</script>

<template>
  <Item
    :label
    :value
    :disabled="readonly"
    :open="{ ref: open }"
  />
  <Open ref="open" :label>
    <DateInput v-model="model" />
    <Select v-model="model" :options="presets" />
    <DateCalendar :selected="[model]" @select="onCalendarSelect" />
  </Open>
</template>
