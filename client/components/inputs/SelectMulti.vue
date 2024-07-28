<script setup lang="ts">
import Item from '../elements/Item.vue'
import List from '../elements/List.vue'
import type { Option, Value } from './Select.vue'
import { ref, watch } from '#imports'

export interface Props {
  options: Option[]
  input?: boolean
}
const props = defineProps<Props>()
const model = defineModel<Value[]>({ default: [] })

// function items(_input: string) {
//   const input = _input.trim().toLocaleLowerCase()
//   if (!input)
//     return props.options
//   return props.options.filter(o =>
//     o.item.label?.toLowerCase().includes(input)
//     || o.item.caption?.toLowerCase().includes(input)
//     || o.item.value?.toLowerCase().includes(input),
//   )
// }

const items = ref([])
const input = ref('')
function refresh() {
  items.value = props.options.filter(o =>
    o.item.label?.toLowerCase().includes(input.value)
    || o.item.caption?.toLowerCase().includes(input.value)
    || o.item.value?.toLowerCase().includes(input.value),
  )
}
refresh()

function onSelect(option: Option) {
  model.value = model.value.includes(option.value)
    ? model.value.filter(value => value !== option.value)
    : [...model.value, option.value]
}
const list = ref()
watch(() => props.options, () => list.value.fetch())
</script>

<template>
  <List
    :items
    item-key="value"
  >
    <template #default="{ item }">
      <Item
        v-bind="item.item"
        :selected="model === item.value"
        :option="true"
        clickable
        @click="onSelect(item)"
      >
        <Checkbox :selected="model.includes(item.value)" />
      </Item>
    </template>
  </List>
</template>
