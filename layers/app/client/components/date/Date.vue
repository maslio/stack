<script setup lang="ts">
import { addDays, subDays } from 'date-fns'

const props = defineProps<{
  label?: string
  readonly?: boolean
}>()

const label = computed(() => props.label ?? '$t:date')
const formatPresetDate = useIntlDateFormat({
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

const presets = computed(() => [{
  value: dateFormat(subDays(new Date(), 1)),
  label: '$t:date.yesterday',
  format: formatPresetDate(subDays(new Date(), 1)),
}, {
  value: dateFormat(new Date()),
  label: '$t:date.today',
  format: formatPresetDate(new Date()),
}, {
  value: dateFormat(addDays(new Date(), 1)),
  label: '$t:date.tomorrow',
  format: formatPresetDate(addDays(new Date(), 1)),
}])

const value = computed(() => {
  const preset = presets.value.find(p => p.value === model.value)
  if (preset)
    return preset.label
  return formatPresetDate(new Date(model.value))
})
const open = ref()
</script>

<template>
  <Open
    ref="open"
    :label
    :value
    :disabled="readonly"
  >
    <template #render>
      <InputDate v-model="model" />
      <List
        :items="presets"
        item-key="value"
      >
        <template #item="{ item }">
          <Option v-model="model" :value="item.value">
            <div class="flex justify-between">
              <div>{{ $mt(item.label) }}</div>
              <div class="text-faint">
                {{ item.format }}
              </div>
            </div>
          </Option>
        </template>
      </List>
      <DateCalendar :selected="[model]" @select="onCalendarSelect" />
    </template>
  </Open>
</template>
