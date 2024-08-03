<script setup lang="ts">
import { upperFirst } from 'scule'
import { addDays, addMonths, endOfMonth, intlFormat, startOfMonth, subDays, subMonths } from 'date-fns'

const props = defineProps<{
  selected: string[]
}>()
const emit = defineEmits(['select'])
const { $language } = useNuxtApp()

const calendarDate = ref(new Date())
const displayMonth = computed(() => upperFirst(
  intlFormat(calendarDate.value, {
    year: 'numeric',
    month: 'long',
  }, { locale: $language.value }),
))

const weekDays = computed(() => {
  const format = useIntlDateFormat({ weekday: 'short' })
  return [...Array(7).keys()]
    .map(day => format(new Date(Date.UTC(2021, 5, day))))
})

const days = computed(() => {
  const days = []
  const today = dateFormat(new Date())
  let firstDay = subDays(startOfMonth(calendarDate.value), 1)
  while (firstDay.getDay() !== 1)
    firstDay = subDays(firstDay, 1)
  let lastDay = addDays(endOfMonth(calendarDate.value), 1)
  while (lastDay.getDay() !== 6)
    lastDay = addDays(lastDay, 1)
  lastDay = addDays(lastDay, 1)
  for (let date = firstDay; date <= lastDay; date = addDays(date, 1)) {
    const formated = dateFormat(date)
    days.push({
      label: date.getDate(),
      first: props.selected[0] === formated,
      last: props.selected.at(-1) === formated,
      selected: props.selected.includes(formated),
      formated,
      isToday: formated === today,
      inCalendarMonth: date.getMonth() === calendarDate.value.getMonth()
      && date.getFullYear() === calendarDate.value.getFullYear(),
    })
  }

  return days
})

let skipUpdate = false
function setAuto() {
  if (skipUpdate) {
    skipUpdate = false
    return
  }
  calendarDate.value = new Date(props.selected[0] as string)
}
watch(() => props.selected, setAuto, { immediate: true })

function select(date: string) {
  emit('select', date)
  skipUpdate = true
}
</script>

<template>
  <Card>
    <!-- month -->
    <div flex flex-row items-center>
      <button
        v-click="() => calendarDate = subMonths(calendarDate, 1)"
        color="default"
        class="clickable px-3 py-2"
      >
        <Icon name="material-symbols:chevron-left-rounded" />
      </button>
      <div flex-1 text-center>
        {{ displayMonth }}
      </div>
      <button
        v-click="() => calendarDate = addMonths(calendarDate, 1)"
        color="default"
        class="clickable px-3 py-2"
      >
        <Icon name="material-symbols:chevron-right-rounded" />
      </button>
    </div>
    <Separator />

    <!-- weekdays -->
    <div class="flex flex-wrap p-2">
      <div
        v-for="wd in weekDays"
        :key="wd"
        class="flex-1 text-center text-sm uppercase text-faint"
      >
        {{ wd }}
      </div>
    </div>

    <!-- days -->
    <div class="flex flex-wrap p-2">
      <div
        v-for="day in days"
        :key="day.formated"
        class="flex-1/7 text-center"
      >
        <div
          v-click="() => select(day.formated)"
          class="clickable rounded-xl py-1 ring-neutral-500"
          :color="day.selected ? '' : 'default'"
          :class="{
            'text-opacity-30!': !day.inCalendarMonth,
          }"
        >
          <div
            class="p-0.5"
            :color="day.selected ? 'primary' : ''"
            :class="{
              'rounded-l-xl': day.first,
              'rounded-r-xl': day.last,
              'bg-opacity-30!': !day.first && !day.last,
            }"
          >
            <div
              class="p-0.5"
              :class="{
                'ring-1 dark:ring-light ring-opacity-15! light:ring-dark rounded-xl z-2': (day.isToday && !day.selected),
              }"
            >
              {{ day.label }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>
