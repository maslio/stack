<script setup lang="ts" generic="T">
defineOptions({
  inheritAttrs: false,
})
const props = defineProps<{
  options: T[]
  optionLabel?: keyof T
  optionValue?: keyof T
  search?: boolean
  disabled?: boolean
  label?: string
  autoClose?: boolean
}>()
const model = defineModel<any[]>({ default: [] })
const optionValue = ref(props.optionValue ?? 'value') as Ref<keyof T>
const optionLabel = ref(props.optionLabel ?? 'label') as Ref<keyof T>
const inputSearch = ref(props.search ? '' : null)

const items = computed(() => {
  if (!inputSearch.value)
    return props.options
  const input = inputSearch.value.trim().toLowerCase()
  return props.options.filter(o =>
    String(o[optionLabel.value])?.toLowerCase().includes(input)
    || String(o[optionValue.value])?.toLowerCase().includes(input),
  )
})

function onSelect(option: T) {
  model.value = model.value.includes(option[optionValue.value])
    ? model.value.filter(value => value !== option[optionValue.value])
    : [...model.value, option[optionValue.value]]
}
const list = ref()
watch(() => props.options, () => list.value.fetch())
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
        :disabled="disabled"
        @click="onSelect(item)"
      >
        <div class="flex-1">
          <slot v-if="$slots.default" name="default" :item />
          <Text
            v-else
            :label="String(item[optionLabel])"
          />
        </div>
        <Checkbox
          v-if="!disabled"
          :selected="model.includes(item[optionValue])"
        />
      </Item>
    </template>
  </List>
</template>
