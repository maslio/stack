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
  label: $t('yesterday'),
  format: formatPresetDate(subDays(new Date(), 1)),
}, {
  value: dateFormat(new Date()),
  label: $t('today'),
  format: formatPresetDate(new Date()),
}, {
  value: dateFormat(addDays(new Date(), 1)),
  label: $t('tomorrow'),
  format: formatPresetDate(addDays(new Date(), 1)),
}]

const value = computed(() => {
  const preset = presets.find(p => p.value === model.value)
  if (preset)
    return preset.label
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
    <Select
      v-model="model"
      :options="presets"
      v-slot="{ item }"
    >
      <div class="flex justify-between">
        <div>{{ item.label }}</div>
        <div class="text-faint">
          {{ item.format }}
        </div>
      </div>
    </Select>
    <DateCalendar :selected="[model]" @select="onCalendarSelect" />
  </Open>
</template>
