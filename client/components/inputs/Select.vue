<script setup lang="ts" generic="T">
defineOptions({
  inheritAttrs: false,
})
const props = defineProps<{
  options: T[]
  labelKey?: keyof T
  valueKey?: keyof T
  search?: boolean
}>()

defineSlots<{
  default: (props: { item: T }) => any
}>()

const model = defineModel()
const valueKey = ref(props.valueKey ?? 'value') as Ref<keyof T>
const labelKey = ref(props.labelKey ?? 'label') as Ref<keyof T>
const inputSearch = ref(props.search ? '' : null)

const items = computed(() => {
  if (!inputSearch.value)
    return props.options
  const input = inputSearch.value.trim().toLowerCase()
  return props.options.filter(o =>
    String(o[labelKey.value])?.toLowerCase().includes(input)
    || String(o[valueKey.value])?.toLowerCase().includes(input),
  )
})

function onSelect(option: T) {
  model.value = option[valueKey.value]
}
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
        <Checkbox :selected="model === item[valueKey]" />
      </Item>
    </template>
  </List>
</template>
