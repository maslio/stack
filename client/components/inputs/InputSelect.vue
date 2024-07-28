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
defineSlots<{
  default: (props: { item: T }) => any
}>()

const model = defineModel()
const valueKey = ref(props.valueKey ?? 'value') as Ref<keyof T>
const labelKey = ref(props.labelKey ?? 'label') as Ref<keyof T>
const value = computed(() => {
  if (model.value == null)
    return ''
  const option = props.options.find(o => o[valueKey.value] === model.value)
  if (option)
    return String(option[labelKey.value])
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
  </Open>
</template>
