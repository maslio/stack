<script setup lang="ts">
import Input from './Input.vue'
import { type Ref, defineModel, ref, useFocus, watch } from '#imports'

defineProps<{
  placeholder?: string
  autofocus?: boolean
  autocomplete?: string
  readonly?: boolean
  flat?: boolean
  submit?: boolean
}>()
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
function onClick() {
  input.value.focus()
}
</script>

<template>
  <Input
    :focused :readonly
    :flat
    @click="onClick"
  >
    <input
      ref="input" v-model="model"
      type="password" :placeholder
      :autofocus :readonly :autocomplete
      class="min-h-6 w-full flex-1 appearance-none bg-transparent outline-none"
      :class="{ submit }"
    >
    <template v-if="$slots.default" #right>
      <slot />
    </template>
  </Input>
</template>
