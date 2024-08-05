<script setup lang="ts" generic="T extends Record<string, any>">
const props = withDefaults(defineProps<{
  label: string
  caption?: string
  multiple?: boolean
  options?: T[]
  optionValue?: keyof T
  optionLabel?: keyof T
  optionCaption?: keyof T
  optionIcon?: keyof T
  search?: string
  target?: string
}>(), {
  optionValue: 'id',
  optionLabel: 'label',
  optionCaption: 'caption',
  optionIcon: 'icon',
})
const emit = defineEmits<{
  'update:search': [value: string]
}>()
defineSlots<{
  default: []
  item: (props: {
    item: T
    index: number
  }) => any
}>()
type Value = string | number
const model = defineModel<Value | Value[]>()
const modelSingle = model as Ref<Value>
const modelMulti = model as Ref<Value[]>

const value = computed(() => {
  if (props.multiple)
    return String(modelMulti.value.length)
  const option = props.options?.find(option => option[props.optionValue] === modelSingle.value)
  return option?.[props.optionLabel]
})
</script>

<template>
  <Open
    :label="label"
    :caption="caption"
    :target
    :value
  >
    <template v-if="$slots.default" #default>
      <slot name="default" />
    </template>
    <template #render>
      <List
        :search="search"
        :items="options"
        @update:search="emit('update:search', $event)"
      >
        <template #item="{ item, index }">
          <Option
            v-model="model"
            :multiple
            :value="item[optionValue as keyof T]"
            :icon="item[optionIcon as keyof T]"
          >
            <slot
              v-if="$slots.item"
              name="item"
              :item="item"
              :index="index"
            />
            <Text
              v-else
              :label="item[optionLabel as keyof T]"
              :caption="item[optionCaption as keyof T]"
            />
          </Option>
        </template>
      </List>
    </template>
  </Open>
</template>
