<script setup lang="ts">
import Expense from './expense.vue'
import Service from './service.vue'

const props = defineProps<{
  branch: Record<string, any>
  date: string
  id?: number
  type?: 'service' | 'expense'
}>()
const emit = defineEmits<{
  save: []
}>()
const tabs = [
  { label: '$t:income', value: 'service' },
  { label: '$t:outcome', value: 'expense' },
]
const tab = ref<'service' | 'expense'>(props.type ?? 'service')
const component = computed(() => tab.value === 'service' ? Service : Expense)
const layout = useLayout()
function onSave() {
  emit('save')
  layout.close()
}
</script>

<template>
  <Tabs
    v-if="!props.id"
    v-model="tab"
    :tabs
  />
  <component
    v-if="tab"
    :id
    :branch
    :date
    @save="onSave"
    :is="component"
  />
</template>
