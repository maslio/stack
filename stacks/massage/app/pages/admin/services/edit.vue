<script setup lang="ts">
const props = defineProps<{
  id?: number
}>()

const emit = defineEmits<{
  (event: 'save'): void
}>()
interface Option {
  id: number
  duration: number
  amount: number
}
const options = ref<Option[]>([])
function addOption({ duration, amount }: { duration: number, amount: number }) {
  options.value.push({ id: options.value.length + 1, duration, amount })
}
function removeOption(id: number) {
  options.value = options.value.filter(o => o.id !== id)
}
const { readItem, updateItem, createItem } = useCollection('services')
const item = ref(props.id
  ? await readItem(props.id)
  : {
      name: '',
      options: [{
        duration: 30,
        amount: 0,
      }],
    })
if (item.value.options?.length) {
  for (const option of item.value.options)
    addOption({ duration: option.duration, amount: option.amount })
}

async function save() {
  if (props.id) {
    await updateItem(props.id, {
      name: item.value.name,
      options: options.value.map(o => ({ duration: o.duration, amount: o.amount })),
    })
  }
  else {
    await createItem({
      name: item.value.name,
      options: options.value.map(o => ({ duration: o.duration, amount: o.amount })),
    })
  }
  emit('save')
}
</script>

<template>
  <Card>
    <InputString v-model="item.name" label="$t:name" />
  </Card>
  <Card>
    <div v-for="option in options" :key="option.id">
      <div class="item flex items-center pr-3">
        <InputNumber v-model="option.duration" class="flex-1" label="$t:duration" />
        <InputNumber v-model="option.amount" class="flex-1" label="$t:price" />
        <Button icon="close" @click="removeOption(option.id)" />
      </div>
    </div>
    <Separator inset class="mt-5" />
    <Button label="$t:add_option" @click="addOption({ duration: 0, amount: 0 })" />
  </Card>
  <Button
    color="primary" :click="save" label="$t:save"
    :disabled="!item.name || !options.length"
  />
</template>
