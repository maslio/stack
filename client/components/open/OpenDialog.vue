<script setup lang="ts">
import { useLayout } from '../../composables/useLayout'
import { onClickOutside, onErrorCaptured, ref, useResizeObserver, useSwipe } from '#imports'

defineOptions({
  inheritAttrs: false,
})
const props = defineProps<{
  target: 'center' | 'top' | 'bottom'
  label?: string
  header?: boolean
}>()

const emit = defineEmits(['close'])

const { pageEl } = useLayout()
const opened = ref(false)
function close() {
  opened.value = false
  emit('close')
}
const [classEnter, classItems] = (function () {
  if (props.target === 'top')
    return ['children:translate-y--100%', 'items-start']
  if (props.target === 'center')
    return ['children:scale-80 opacity-0', 'items-center']
  else
    return ['children:translate-y-100%', 'items-end']
})()
function open() {
  opened.value = true
}

const backdrop = ref<HTMLElement>()
const swipe = useSwipe(backdrop, {
  onSwipe() {
    if (swipe.direction.value === 'up' && classItems === 'items-start')
      close()
    else if (swipe.direction.value === 'down' && classItems === 'items-end')
      close()
  },
})

const dialog = ref()
const layout = ref()
const height = ref(0)
useResizeObserver(layout, (entries) => {
  if (!entries?.[0])
    return
  height.value = entries[0].contentRect.height
})
onClickOutside(layout, (e) => {
  e.stopPropagation()
  close()
})

defineExpose({ open, close, opened })
</script>

<template>
  <Teleport v-if="pageEl" :to="pageEl">
    <Transition
      :enter-from-class="classEnter"
      enter-active-class="transition-200 children:transition-200"
      leave-active-class="transition-200 children:transition-200"
      :leave-to-class="classEnter"
    >
      <div
        v-if="opened"
        ref="backdrop"
        class="dialog fit flex justify-center text-light backdrop-blur-2"
        :class="classItems"
      >
        <div class="fit" @click="close" />
        <div
          ref="dialog"
          overflow-hidden
          rounded-xl
          class="m-3 max-h-90% max-w-100% w-full ring-2"
          dark="ring-dark-300"
          light="ring-neutral-200"
        >
          <div :style="{ height: height ? `${height}px` : 'auto' }" class="transition-height-150">
            <Layout
              ref="layout"
              :label
              :no-header="!header"
              :close
              close-icon="close"
            >
              <slot />
            </Layout>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
