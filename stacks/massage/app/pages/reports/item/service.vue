<script setup lang="ts">
const props = defineProps<{
  branch: Record<string, any>
  date: string
  id?: number
}>()
const emit = defineEmits<{
  save: []
}>()
const { createItem, readItem, updateItem } = useCollection('service_items')
interface Item {
  branch: number
  date: string
  service: number | null
  amount: number | null
  worker: number | null
  duration: number | null
  comment?: string
}
const data = props.id
  ? await readItem<Item>(props.id)
  : {
      date: props.date,
      branch: props.branch.id,
      service: null,
      amount: 0,
      duration: 0,
      worker: null,
      comment: '',
    } as Item

const item = ref<Item>(data)
const options = ref<Option[]>()
function onApplyService(service: Record<string, any>) {
  if (service?.options)
    options.value = service.options
    // item.value.amount = service.amount
}
async function save() {
  if (props.id)
    await updateItem(props.id, item.value)
  else
    await createItem(item.value)
  emit('save')
}

interface Option {
  duration: number
  amount: number
}

const option = computed({
  get() {
    return `${item.value.duration}:${item.value.amount}`
  },
  set(option: string) {
    const [duration, amount] = option.split(':')
    item.value.duration = Number(duration) ?? 0
    item.value.amount = Number(amount) ?? 0
  },
})
</script>

<template>
  <Card>
    <SelectService
      v-model="item.service"
      @apply="onApplyService"
    />
    <SelectWorker
      v-model="item.worker"
      :branch="branch.id"
      @apply="onApplyService"
    />
  </Card>
  <Card
    v-if="options"
  >
    <Option
      v-for="opt in options"
      :key="opt.duration"
      v-model="option"
      :value="`${opt.duration}:${opt.amount}`"
    >
      <div class="flex">
        <div class="flex-1">
          {{ opt.duration }} {{ $t('minutes') }}
        </div>
        <div class="font-mono text-faint">
          {{ $formatBaht(opt.amount) }}
        </div>
      </div>
    </Option>
  </Card>
  <Card>
    <div class="flex">
      <InputNumber
        v-model="item.duration"
        class="flex-1"
        label="$t:duration_minutes"
      />
      <InputNumber
        v-model="item.amount"
        class="flex-1"
        label="$t:amount_baht"
      />
    </div>
    <InputText
      v-model="item.comment"
      label="$t:comment"
    />
  </Card>
  <Button
    label="$t:save"
    color="primary"
    :click="save"
  />
</template>
