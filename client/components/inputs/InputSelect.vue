<script setup lang="ts" generic="T">
defineOptions({
  inheritAttrs: false,
})
const props = defineProps<{
  options?: T[]
  optionLabel?: keyof T
  optionValue?: keyof T
  search?: boolean
  label: string
  autoClose?: boolean
}>()
defineSlots<{
  default: (props: { item: T }) => any
  append: () => any
}>()

const model = defineModel()
const optionValue = ref(props.optionValue ?? 'value') as Ref<keyof T>
const optionLabel = ref(props.optionLabel ?? 'label') as Ref<keyof T>
const value = computed(() => {
  if (model.value == null)
    return ''
  const option = props.options?.find(o => o[optionValue.value] === model.value)
  if (option)
    return String(option[optionLabel.value])
  return String(model.value)
})
const open = openRef()
function onUpdate() {
  if (props.autoClose)
    open.value?.close()
}
</script>

<template>
  <Item :label :value :open="{ ref: open }" />
  <Open ref="open">
    <Select
      v-model="model"
      v-bind="props"
      @update:model-value="onUpdate"
    >
      <template v-if="$slots.default" #default="{ item }">
        <slot name="default" :item />
      </template>
    </Select>
    <slot name="append" />
  </Open>
</template>
