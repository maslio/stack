<script setup lang="ts">
import type { LayoutProvide } from '../../composables/useLayout'
import Next from './LayoutNext.vue'
import Dialog from './LayoutDialog.vue'
import Self from './LayoutSelf.vue'
import Side from './LayoutSide.vue'

const props = withDefaults(defineProps<{
  root?: boolean
  width?: string | number
  label?: string
  noHeader?: boolean
  close?: () => void
  closeIcon?: string
}>(), {
  width: 320,
})

defineSlots<{
  default: () => void
}>()

const widthNumber = useToNumber(props.width)
const layoutWidth = ref(1024)
const freeWidth = ref(layoutWidth.value - widthNumber.value)
const layoutEl = ref() as Ref<HTMLElement>
const isMini = computed(() => layoutWidth.value < 640)

const next = ref()
const dialog = ref()
const self = ref()
const side = ref()
const opened = reactive<{
  next: string | number | null
  self: string | number | null
  dialog: string | number | null
  side: string | number | null
}>({
  next: null,
  self: null,
  dialog: null,
  side: null,
})
const parentLayout = inject<LayoutProvide | null>('layout', null)
function open(target: string, data: any) {
  if (target === 'next') {
    opened.next = data.id
    return next.value.open(data)
  }
  if (target === 'self') {
    opened.self = data.id
    return self.value.open(data)
  }
  if (target.startsWith('dialog')) {
    opened.dialog = data.id
    return dialog.value.open(target, data)
  }
  if (target === 'side') {
    if (!props.root)
      return parentLayout?.open('side', data)
    opened.side = data.id
    return side.value.open(data)
  }
  throw new Error(`Layout: unknown target ${target}`)
}

function close(target?: string) {
  if (!target)
    return props.close?.()
  if (target === 'next')
    return next.value.close()
  if (target === 'self')
    return self.value.close()
  if (target.startsWith('dialog'))
    return dialog.value.close()
  throw new Error(`Layout: unknown target ${target}`)
}

useResizeObserver(layoutEl, (entries) => {
  const entry = entries[0]!
  layoutWidth.value = entry.contentRect.width
  freeWidth.value = entry.contentRect.width - widthNumber.value
})

const styleRoot = computed(() => {
  if (isMini.value)
    return { width: '100%' }
  return { width: `${props.width}px` }
})

const pageEl = ref() as Ref<HTMLElement>
const menuEl = ref() as Ref<HTMLElement>
const nextEl = ref() as Ref<HTMLElement>
const nextId = ref()
const mainEl = ref() as Ref<HTMLElement>
const bottomEl = ref() as Ref<HTMLElement>
const footerEl = ref() as Ref<HTMLElement>
const id = useId()

const swipe = useSwipe(pageEl, {
  onSwipe() {
    if (swipe.direction.value === 'right' && isMini.value)
      close()
  },
})

const scroll = useScroll(mainEl)

provide<LayoutProvide>('layout', { isMini, pageEl, menuEl, nextEl, nextId, footerEl, bottomEl, close, id, scroll, open, opened })
defineExpose({ close })
</script>

<template>
  <div
    :id
    ref="layoutEl"
    class="layout absolute h-full w-full flex overflow-hidden text-base"
    color="back dialog:default"
    min-w-200px
    dialog:relative
    dialog:h-auto
    dialog:w-auto
    :class="{ mobile: isMini }"
  >
    <div
      class="layout-content flex flex-1 justify-start"
      dialog:relative
      dialog:h-auto
      dialog:w-auto
    >
      <div
        class="page relative h-full flex flex-col mobile:w-full!"
        :style="styleRoot"
      >
        <header
          v-if="!noHeader && !root"
          class="group header h-14 flex items-center gap-2 p-3 dialog:h-12 dialog:p-2"
        >
          <Button
            v-if="closeIcon"
            flat
            mini
            :icon="closeIcon"
            @click="close()"
          />
          <div v-else w-1 />
          <div class="flex-1 truncate pr-3 text-center text-base">
            {{ $mt(label ?? '') }}
          </div>
          <div
            ref="menuEl"
            class="h-10 w-10 flex flex-nowrap items-center"
          />
        </header>
        <main
          ref="mainEl"
          class="relative flex flex-1 flex-col gap-3 overflow-x-hidden overflow-y-auto p-3 pt-0 dialog:gap-0 dialog:px-0 dialog:pb-2 dialog:first:pt-2"
          :class="{ 'mt-3': root }"
          dialog:scrollbar-gutter-auto
          color="back dialog:default"
          scrollbar="~ rounded w-4px gutter-stable"
          dark:scrollbar="track-color-dark-900 thumb-color-neutral-700/50"
          light:scrollbar="track-color-light-900 thumb-color-neutral-400/50"
        >
          <slot />
          <div ref="bottomEl" class="sticky bottom-0" />
        </main>
        <footer ref="footerEl" class="px-3 dialog:pb-0" />
        <Dialog ref="dialog" :is-mini="isMini" @close="opened.dialog = null" />
      </div>
      <div ref="nextEl" class="next">
        <Next ref="next" :is-mini="isMini" @close="opened.next = null" />
      </div>
    </div>
    <div class="self absolute h-full">
      <Self ref="self" :is-mini="isMini" @close="opened.self = null" />
    </div>
    <div v-if="root" class="side">
      <Side ref="side" @close="opened.side = null" />
    </div>
  </div>
</template>

<style scoped>
.layout:has(> .self > .layout) > .layout-content {
  --uno: 'transition-transform-300';
}
.layout:has(> .self > .layout:not(.v-leave-active)) > .layout-content {
  --uno: 'absolute w-full translate-x--150px';
}
.self:has(> .layout:not(.v-leave-active)) {
  --uno: 'relative! flex-1';
}
.self:has(> .layout.v-leave-active) {
  --uno: 'fit!';
}

.layout-content > .next {
  --uno: 'relative flex-1';
}
.layout-content > .page {
  --uno: 'transition-transform-300';
}
.dialog .layout-content > .page {
  --uno: 'transition-transform-200';
}
.mobile:has(> .layout-content > .next > .layout.v-leave-active) {
  > .layout-content > .page {
    position: relative;
  }
}
.mobile:has(> .layout-content > .next > .layout:not(.v-leave-active)) {
  > .layout-content > .page {
    position: absolute;
    transform: translateX(-50%);
    height: 100%;
    overflow: hidden;
  }
}
.mobile > .layout-content > .next {
  --uno: 'relative left-100% top-0 h-full w-full';
}
.mobile > .layout-content > .next:has(> .layout.v-leave-active) {
  --uno: 'absolute';
}
@media only print {
  .layout {
    display: none;
  }
}
</style>
