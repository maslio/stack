<script setup lang="ts" generic="T extends Record<string, any>">
const props = withDefaults(defineProps<{
  label: string
  caption?: string
  multiple?: boolean
  options?: T[]
  optionValue?: keyof T
  optionLabel?: keyof T | ((item: Record<string, any>) => string)
  optionCaption?: keyof T
  optionIcon?: keyof T
  search?: string
  target?: string
  closeOnApply?: boolean
  applyOnChange?: boolean
  modelValue?: Value | Value[] | null
}>(), {
  optionValue: 'id',
  optionLabel: () => 'label',
  optionCaption: 'caption',
  optionIcon: 'icon',
})
const emit = defineEmits<{
  'update:search': [value: string]
  'update:modelValue': [value: Value | Value[]]
  'close': []
}>()
defineSlots<{
  item: []
  option: (props: {
    item: T
    index: number
  }) => any
}>()
type Value = string | number
const model = ref() as Ref<Value | Value[]>

function refreshModel() {
  model.value = props.multiple
    ? [...props.modelValue as Value[]]
    : props.modelValue as Value
}
watch(() => props.modelValue, () => {
  refreshModel()
}, { immediate: true })

const modelSingle = model as Ref<Value>
const modelMulti = model as Ref<Value[]>

function getOptionLabel(item?: Record<string, any>) {
  if (!item)
    return ''
  if (typeof props.optionLabel === 'function')
    return props.optionLabel(item)
  return item[props.optionLabel as keyof typeof item]
}

const value = computed(() => {
  if (props.multiple) {
    const value = props.modelValue as Value[]
    if (value.length === 1) {
      const option = props.options?.find(option => option[props.optionValue] === value[0])
      return getOptionLabel(option)
    }
    return String(value.length)
  }
  const option = props.options?.find(option => option[props.optionValue] === props.modelValue)
  return getOptionLabel(option)
})

watch(model, () => {
  if (props.applyOnChange)
    apply()
})

const open = ref()
function apply() {
  if (props.multiple)
    emit('update:modelValue', [...modelMulti.value])
  else
    emit('update:modelValue', modelSingle.value)
  if (props.closeOnApply)
    open.value?.close()
}
</script>

<template>
  <Open
    ref="open"
    :label="label"
    :caption="caption"
    :target
    :value
  >
    <template #item>
      <slot v-if="$slots.item" name="item" />
      <div v-else>
        <div class="flex items-center">
          <Text class="flex-1" :label :caption />
          <div class="text-faint">
            {{ value }}
          </div>
        </div>
      </div>
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
              v-if="$slots.option"
              name="option"
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
      <Button
        v-if="!applyOnChange"
        color="primary"
        label="Apply"
        @click="apply"
      />
    </template>
  </Open>
</template>
