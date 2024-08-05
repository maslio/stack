<script setup lang="ts">
const { value, multiple } = defineProps<{
  label?: string
  caption?: string
  icon?: string
  value: string | number
  multiple?: boolean
}>()

const model = defineModel<string | number | (string | number)[]>()
const modelSingle = model as Ref<string | number>
const modelMulti = model as Ref<(string | number)[]>
function onClick() {
  if (multiple) {
    modelMulti.value = modelMulti.value.includes(value)
      ? modelMulti.value.filter(v => v !== value)
      : [...modelMulti.value, value]
  }
  else {
    modelSingle.value = value
  }
}
const selected = computed(() => {
  if (multiple)
    return modelMulti.value.includes(value)
  return modelSingle.value === value
})
</script>

<template>
  <Item clickable @click="onClick">
    <div class="flex items-center gap-2 overflow-hidden">
      <Icon v-if="icon" :name="icon" />
      <div class="flex-1">
        <slot v-if="$slots.default" />
        <Text v-else :label :caption />
      </div>
      <Checkbox :selected />
    </div>
  </Item>
</template>
