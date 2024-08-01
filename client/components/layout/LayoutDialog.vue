<script setup lang="ts">
defineProps<{
  isMini: boolean
}>()
const emit = defineEmits<{
  close: []
}>()
const next = ref()
const classEnter = ref('')
const classItems = ref('')
const dialog = ref()
const layout = ref()
const height = ref(0)
function close() {
  next.value = null
  emit('close')
}
function open(target: 'dialog' | 'dialog-top' | 'dialog-bottom', data: any) {
  next.value = {
    id: data.id,
    page: data.page,
    label: data.label ?? 'next',
    noHeader: data.noHeader,
    props: data.props ?? {},
  }
  if (target === 'dialog-top') {
    classEnter.value = 'children:translate-y--100%'
    classItems.value = 'items-start'
  }
  else if (target === 'dialog-bottom') {
    classEnter.value = 'children:translate-y-100%'
    classItems.value = 'items-end'
  }
  else {
    classEnter.value = 'children:scale-80 opacity-0'
    classItems.value = 'items-center'
  }
}
const backdrop = ref<HTMLElement>()
const swipe = useSwipe(backdrop, {
  onSwipe() {
    if (swipe.direction.value === 'up' && classItems.value === 'items-start')
      close()
    else if (swipe.direction.value === 'down' && classItems.value === 'items-end')
      close()
  },
})
useResizeObserver(layout, (entries) => {
  if (!entries?.[0])
    return
  height.value = entries[0].contentRect.height
})
onClickOutside(layout, (e) => {
  e.stopPropagation()
  close()
})

defineExpose({ open, close })
</script>

<template>
  <Transition
    :enter-from-class="classEnter"
    enter-active-class="transition-200 children:transition-200"
    leave-active-class="transition-200 children:transition-200"
    :leave-to-class="classEnter"
  >
    <div
      v-if="next"
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
            v-if="next"
            :label="next.label"
            :no-header="next.noHeader"
            :close-icon="isMini ? 'back' : 'close'"
            :close
          >
            <Render
              :key="next.id"
              :page="next.page"
              :component="next.component"
              :props="next.props"
            />
          </Layout>
        </div>
      </div>
    </div>
  </Transition>
</template>
