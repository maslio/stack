<script setup lang="ts" generic="T">
defineOptions({
  inheritAttrs: false,
})
const props = defineProps<{
  options: T[]
  labelKey?: keyof T
  valueKey?: keyof T
  search?: boolean
  label: string
  autoClose?: boolean
}>()
const model = defineModel<any[]>({ default: [] })
const valueKey = ref(props.valueKey ?? 'value') as Ref<keyof T>
const labelKey = ref(props.labelKey ?? 'label') as Ref<keyof T>
const inputSearch = ref('')

const items = computed(() => {
  const input = inputSearch.value.trim().toLowerCase()
  if (!input)
    return props.options
  return props.options.filter(o =>
    String(o[labelKey.value])?.toLowerCase().includes(input)
    || String(o[valueKey.value])?.toLowerCase().includes(input),
  )
})

function onSelect(option: T) {
  model.value = model.value.includes(option[valueKey.value])
    ? model.value.filter(value => value !== option[valueKey.value])
    : [...model.value, option[valueKey.value]]
}
const list = ref()
watch(() => props.options, () => list.value.fetch())
</script>

<template>
  <List
    v-model:search="inputSearch"
    :items
    :item-key="valueKey"
  >
    <template #default="{ item }">
      <Item
        :selected="model === item[valueKey]"
        :option="true"
        clickable
        @click="onSelect(item)"
      >
        <div class="flex-1">
          <slot v-if="$slots.default" name="default" :item />
          <Text
            v-else
            :label="String(item[labelKey])"
          />
        </div>
        <Checkbox :selected="model.includes(item[valueKey])" />
      </Item>
    </template>
    <!-- <template #default="{ item }">
      <Item
        v-bind="item.item"
        :selected="model === item.value"
        :option="true"
        clickable
        @click="onSelect(item)"
      >
        <Checkbox :selected="model.includes(item.value)" />
      </Item>
    </template> -->
  </List>
</template>
