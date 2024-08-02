<script setup lang="ts" generic="T">
defineOptions({
  inheritAttrs: false,
})
const props = defineProps<{
  options: T[]
  optionLabel?: keyof T
  optionValue?: keyof T
  search?: boolean
  label: string
  icon?: string
  autoClose?: boolean
}>()
defineSlots<{
  default: (props: { item: T }) => any
}>()
const model = defineModel<any[]>({ default: [] })
const value = computed(() => String(model.value.length))
const open = ref()
</script>

<template>
  <Open
    ref="open"
    :label
    :value
    :icon
  >
    <template #render>
      <SelectMulti
        v-model="model"
        v-bind="props"
        @update:model-value="autoClose ? open.close() : null"
      >
        <template v-if="$slots.default" #default="{ item }">
          <slot name="default" :item />
        </template>
      </SelectMulti>
    </template>
  </Open>
</template>
