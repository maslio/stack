<script setup lang="ts">
import Input from './Input.vue'
import { useFocus, useTextareaAutosize, watch } from '#imports'

defineOptions({
  inheritAttrs: false,
})
withDefaults(defineProps<{
  placeholder?: string
  autofocus?: boolean
  disabled?: boolean
  readonly?: boolean
  flat?: boolean
  class?: any
  rows?: number
  label?: string
}>(), {
  rows: 1,
})
const emit = defineEmits(['focus', 'blur'])
defineSlots<{
  default: () => void
}>()
const model = defineModel<string>()
const { textarea } = useTextareaAutosize({
  input: model,
  styleProp: 'minHeight',
})
const { focused } = useFocus(textarea)
watch(focused, (value) => {
  if (value)
    emit('focus')
  else
    emit('blur')
})
</script>

<template>
  <Input
    :focused
    :readonly
    :flat
    :label
    :class="$props.class"
    @click="textarea.focus()"
  >
    <textarea
      ref="textarea"
      v-bind="$attrs"
      v-model="model"
      :placeholder
      :autofocus
      :readonly
      class="w-full flex-1 resize-none appearance-none bg-transparent outline-none dark:placeholder-neutral-600 light:placeholder-neutral-300"
      :rows
      :class="{ 'text-faint': disabled }"
    />
    <div class="h-5 flex items-end">
      <slot />
    </div>
  </Input>
</template>
