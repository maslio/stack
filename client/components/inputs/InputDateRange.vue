<script setup lang="ts">
import { type Day, addDays, addMonths, addWeeks, endOfMonth, startOfMonth, startOfWeek, subDays, subMonths, subWeeks } from 'date-fns'

const props = defineProps<{
  label?: string
  readonly?: boolean
}>()
const label = computed(() => props.label ?? '$t:date.range')
const weekStartsOn = useAppConfig().date.weekStartsOn as Day

const model = defineModel<[string, string]>({
  default: [
    dateFormat(new Date()),
    dateFormat(new Date()),
  ],
})
function rangeToString(range: [string, string]) {
  return `${range[0]} - ${range[1]}`
}
function stringToRange(string: string) {
  return string.split(' - ') as [string, string]
}

const modelString = computed({
  get: () => rangeToString(model.value),
  set: value => model.value = stringToRange(value),
})

const input1 = ref()
const input2 = ref()

const presetsTabs = [{
  label: '$t:date.day',
  value: 'day',
}, {
  label: '$t:date.week',
  value: 'week',
}, {
  label: '$t:date.month',
  value: 'month',
}]
const presetsTab = ref('day')

const presets = computed(() => {
  interface Preset {
    type: 'day' | 'week' | 'month'
    start: string
    end: string
    label: string
    value: string
  }
  const presets: Preset[] = []

  // day
  const formatPresetDate = useIntlDateFormat({
    month: 'long',
    day: 'numeric',
  })
  {
    const date = subDays(new Date(), 1)
    const formated = dateFormat(date)
    presets.push({
      type: 'day',
      start: formated,
      end: formated,
      label: '$t:date.yesterday',
      value: formatPresetDate(date),
    })
  }
  {
    const date = new Date()
    const formated = dateFormat(date)
    presets.push({
      type: 'day',
      start: formated,
      end: formated,
      label: '$t:date.today',
      value: formatPresetDate(date),
    })
  }
  {
    const date = addDays(new Date(), 1)
    const formated = dateFormat(date)
    presets.push({
      type: 'day',
      start: formated,
      end: formated,
      label: '$t:date.tomorrow',
      value: formatPresetDate(date),
    })
  }

  // week
  const formatWeek = useIntlDateRangeFormat({
    month: 'short',
    day: 'numeric',
  })
  {
    const date = new Date()
    const dateStart = subWeeks(startOfWeek(date, { weekStartsOn }), 1)
    const dateEnd = addDays(dateStart, 6)
    presets.push({
      type: 'week',
      start: dateFormat(dateStart),
      end: dateFormat(dateEnd),
      label: '$t:date.previous_week',
      value: formatWeek(dateStart, dateEnd),
    })
  }
  {
    const date = new Date()
    const dateStart = startOfWeek(date, { weekStartsOn })
    const dateEnd = addDays(dateStart, 6)
    presets.push({
      type: 'week',
      start: dateFormat(dateStart),
      end: dateFormat(dateEnd),
      label: '$t:date.current_week',
      value: formatWeek(dateStart, dateEnd),
    })
  }
  {
    const date = new Date()
    const dateStart = addWeeks(startOfWeek(date, { weekStartsOn }), 1)
    const dateEnd = addDays(dateStart, 6)
    presets.push({
      type: 'week',
      start: dateFormat(dateStart),
      end: dateFormat(dateEnd),
      label: '$t:date.following_week',
      value: formatWeek(dateStart, dateEnd),
    })
  }

  const formatMonth = useIntlDateFormat({
    month: 'long',
    year: 'numeric',
  })
  // month
  {
    const date = subMonths(new Date(), 1)
    presets.push({
      type: 'month',
      start: dateFormat(startOfMonth(date)),
      end: dateFormat(endOfMonth(date)),
      label: '$t:date.previous_month',
      value: formatMonth(date),
    })
  }
  {
    const date = new Date()
    presets.push({
      type: 'month',
      start: dateFormat(startOfMonth(date)),
      end: dateFormat(endOfMonth(date)),
      label: '$t:date.current_month',
      value: formatMonth(date),
    })
  }
  {
    const date = addMonths(new Date(), 1)
    presets.push({
      type: 'month',
      start: dateFormat(startOfMonth(date)),
      end: dateFormat(endOfMonth(date)),
      label: '$t:date.following_month',
      value: formatMonth(date),
    })
  }

  return presets
})

const presetsFiltered = computed(() => {
  return presets.value
    .filter(p => p.type === presetsTab.value)
    .map(p => ({
      value: rangeToString([p.start, p.end]),
      label: p.label,
      format: p.value,
    }))
})

const calendarSelected = computed(() => {
  const dates = []
  const dateEnd = new Date(model.value[1])
  for (let date = new Date(model.value[0]); date <= dateEnd; date = addDays(date, 1))
    dates.push(dateFormat(date))
  return dates
})
let waitForEnd = false
function onCalendarSelect(value: string) {
  const values: [string, string] = [
    model.value[0],
    model.value[1],
  ]
  if (!waitForEnd) {
    values[0] = value
    values[1] = value
    waitForEnd = true
  }
  else {
    if (value > values[0]) {
      values[1] = value
    }
    else {
      values[1] = values[0]
      values[0] = value
    }
    waitForEnd = false
  }
  model.value = values
}

const formatValue = useIntlDateRangeFormat({
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

const value = computed(() => {
  const preset = presets.value.find(p => rangeToString([p.start, p.end]) === modelString.value)
  if (preset)
    return preset.label
  return formatValue(new Date(model.value[0]), new Date(model.value[1]))
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
      <Card>
        <DateInput
          ref="input1"
          :model-value="model[0]"
          label="$t:date.range_start"
          @update:model-value="model = [$event, model[1]]"
          @next="input2.select('day')"
        />
        <DateInput
          ref="input2"
          label="$t:date.range_end"
          :model-value="model[1]"
          @update:model-value="model = [model[0], $event]"
          @prev="input1.select('year')"
        />
      </Card>
      <Card>
        <Tabs v-model="presetsTab" :tabs="presetsTabs" />
        <List
          :key="presetsTab"
          :items="presetsFiltered"
          item-key="value"
        >
          <template #item="{ item }">
            <Option v-model="modelString" :value="item.value">
              <div class="flex justify-between gap-2">
                <div class="flex-1 truncate">
                  {{ $mt(item.label) }}
                </div>
                <div class="text-faint">
                  {{ item.format }}
                </div>
              </div>
            </Option>
          </template>
        </List>
      </Card>
      <DateCalendar :selected="calendarSelected" @select="onCalendarSelect" />
    </template>
  </Open>
</template>
