<script setup lang="ts">
import { debounce } from 'perfect-debounce'
import Input from './Input.vue'
import { computed, ref, useFocus, watch } from '#imports'

const { decimal = 0 } = defineProps<{
  label?: string
  decimal?: number
  placeholder?: string
  autofocus?: boolean
  readonly?: boolean
  inputClass?: string
}>()
const emit = defineEmits(['focus', 'blur'])
const input = ref()
const model = defineModel<number | null>()
const _model = ref('')

function maskedToNumber(value: string): number {
  const parseNumber = decimal ? Number.parseFloat : Number.parseInt
  return parseNumber(value.replace(/ /g, ''))
}
let skipUpdate = false

watch(_model, debounce((value: string) => {
  const number = maskedToNumber(value)
  if (model.value === number)
    return
  model.value = number
  skipUpdate = true
}))
watch(model, (value) => {
  if (skipUpdate) {
    skipUpdate = false
    return
  }
  if (value == null)
    return
  const number = maskedToNumber(_model.value)
  if (value === number)
    return
  const string = decimal ? value.toFixed(decimal) : value.toString()
  _model.value = string
}, { immediate: true })
const { focused } = useFocus(input)
watch(focused, (value) => {
  if (value)
    emit('focus')
  else
    emit('blur')
})
const dataMaska = computed(() => {
  if (!decimal)
    return '9 99#'
  return `9 99#.${'#'.repeat(decimal)}`
})
</script>

<template>
  <Input
    :focused :label
    @click="input.select()"
  >
    <div
      class="w-full flex items-baseline"
    >
      <input
        ref="input"
        v-model="_model"
        v-maska
        :class="inputClass"
        inputmode="numeric"
        :data-maska="dataMaska"
        data-maska-tokens="9:[0-9]:repeated"
        data-maska-reversed
        :placeholder
        :autofocus
        :readonly
        class="min-h-6 w-full appearance-none bg-transparent font-mono outline-none"
        @click="input.select()"
      >
    </div>
    <template v-if="$slots.default" #append>
      <slot />
    </template>
  </Input>
</template>

<style scoped>
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button,
input[type='number'] {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
  -moz-appearance: textfield !important;
}
</style>
