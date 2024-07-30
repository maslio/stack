<script setup lang="ts">
import { useLayout } from '../../composables/useLayout'
import Layout from '../layout/Layout.vue'
import { computed, getCurrentInstance, onErrorCaptured, ref, useToNumber, watch } from '#imports'

defineOptions({
  inheritAttrs: false,
})
const props = defineProps<{
  label?: string
  width?: number
}>()
const emit = defineEmits(['close'])
const width = useToNumber(() => props.width ?? 320)
const id = String(getCurrentInstance()?.uid)
const { nextId, nextEl, isMini } = useLayout()
const opened = computed(() => nextId.value === id)
const transition = ref(false)
function open() {
  transition.value = !nextId.value
  nextId.value = id
}
function close() {
  nextId.value = null
  emit('close')
}
watch(opened, (value) => {
  if (!value)
    emit('close')
})
defineExpose({ open, close, opened })
</script>

<template>
  <Teleport v-if="nextEl" :to="nextEl">
    <Transition
      enter-from-class="translate-x-10 mobile:translate-x-0!"
      :enter-active-class="transition ? 'transition-200 mobile:transition-300' : ''"
      leave-active-class="mobile:transition-300 v-leave-active"
      leave-to-class="translate-x-0!"
    >
      <Layout
        v-if="opened"
        :label
        :width
        class="mobile:translate-x--100%"
        :close
        :close-icon="isMini ? 'back' : 'close'"
      >
        <slot />
      </Layout>
    </Transition>
  </Teleport>
</template>
