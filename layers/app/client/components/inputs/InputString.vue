<script setup lang="ts">
import Input from './Input.vue'
import { type Ref, ref, useFocus, watch } from '#imports'

defineOptions({
  inheritAttrs: false,
})
withDefaults(defineProps<{
  placeholder?: string
  autocomplete?: string
  autofocus?: boolean
  disabled?: boolean
  readonly?: boolean
  flat?: boolean
  label?: string
  type?: 'text' | 'email'
  error?: boolean
  submit?: boolean
}>(), {
  type: 'text',
})
const emit = defineEmits(['focus', 'blur'])
defineSlots<{
  default: () => void
}>()
const input = ref() as Ref<HTMLInputElement>
const model = defineModel<string>()
const { focused } = useFocus(input)
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
    :error
    @click="input.focus()"
  >
    <input
      ref="input"
      v-bind="$attrs"
      v-model="model"
      :placeholder="$mt(placeholder)"
      :type
      :autofocus
      :readonly
      :autocomplete
      class="min-h-6 w-full appearance-none bg-transparent outline-none"
      :class="{ 'text-faint': disabled, submit }"
    >
    <template v-if="$slots.default" #append>
      <slot />
    </template>
  </Input>
</template>
