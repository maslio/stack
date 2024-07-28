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

const model = defineModel<any[]>({ default: [] })
const value = computed(() => {
  return String(model.value.length)
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
    <SelectMulti
      v-model="model"
      v-bind="props"
      @update:model-value="onUpdate"
    >
      <template v-if="$slots.default" #default="{ item }">
        <slot name="default" :item />
      </template>
    </SelectMulti>
  </Open>
</template>
