<script setup lang="ts" generic="T">
defineOptions({
  inheritAttrs: false,
})
const props = defineProps<{
  options?: T[]
  optionLabel?: keyof T
  optionValue?: keyof T
  search?: boolean
}>()

defineSlots<{
  default: (props: { item: T }) => any
}>()

const model = defineModel()
const optionValue = ref(props.optionValue ?? 'value') as Ref<keyof T>
const optionLabel = ref(props.optionLabel ?? 'label') as Ref<keyof T>
const inputSearch = ref(props.search ? '' : null)

const items = computed(() => {
  if (!inputSearch.value)
    return props.options
  const input = inputSearch.value.trim().toLowerCase()
  return props.options?.filter(o =>
    String(o[optionLabel.value])?.toLowerCase().includes(input)
    || String(o[optionValue.value])?.toLowerCase().includes(input),
  )
})

function onSelect(option: T) {
  model.value = option[optionValue.value]
}
</script>

<template>
  <List
    v-model:search="inputSearch"
    :items
    :item-key="optionValue"
  >
    <template #default="{ item }">
      <Item
        :selected="model === item[optionValue]"
        :option="true"
        clickable
        @click="onSelect(item)"
      >
        <div class="flex-1">
          <slot v-if="$slots.default" name="default" :item />
          <Text
            v-else
            :label="String(item[optionLabel])"
          />
        </div>
        <Checkbox :selected="model === item[optionValue]" />
      </Item>
    </template>
  </List>
</template>
