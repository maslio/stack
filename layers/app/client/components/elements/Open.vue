<script setup lang="ts">
import { Item } from '#components'

const props = defineProps<{
  id?: string | number
  icon?: string
  label: string
  value?: string
  valueClass?: string
  caption?: string
  component?: Component | string
  page?: string
  preload?: boolean
  target?: string
  skeleton?: string | string[]
  props?: Record<string, any>
  noHeader?: boolean
}>()

defineSlots<{
  default: () => any
  render: () => any
}>()
const id = props.id ?? useId()
const layout = useLayout()
const target = props.target ?? 'next'
const slots = useSlots()

function close() {
  layout.close(target)
}

const openable = computed(() => {
  return props.page || props.component || slots.render
})

function open(_target = target) {
  if (!openable.value)
    return
  layout.open(_target, {
    id,
    label: props.label,
    caption: props.caption,
    component: markRaw(props.component as object),
    page: props.page,
    slot: slots.render,
    skeleton: props.skeleton,
    props: props.props,
    noHeader: props.noHeader,
  })
}

function onClick() {
  open(target)
}

function onContextmenu(e: MouseEvent) {
  e.preventDefault()
  e.stopImmediatePropagation()
  e.stopPropagation()
  open('side')
}

const t = (target.startsWith('dialog') ? 'dialog' : target) as 'next' | 'self' | 'dialog'
// function root() {
//   const opened = layout.opened[t] === id
//   return h(Item, {
//     icon: props.icon,
//     label: props.label,
//     value: props.value,
//     caption: props.caption,
//     clickable: true,
//     opened,
//     rightIcon: 'fluent:chevron-right-16-filled',
//     onClick,
//     onContextmenu,
//   }, { default: slots.default })
// }

defineExpose({ close })
if (props.preload && props.page)
  preloadComponents(resolvePage(props.page))
</script>

<template>
  <Item
    :icon="props.icon"
    :label="props.label"
    :value="props.value"
    :caption="props.caption"
    clickable
    :opened="layout.opened[t] === id"
    :right-icon="openable ? 'fluent:chevron-right-16-filled' : undefined"
    @click="onClick"
    @contextmenu="onContextmenu"
  >
    <slot v-if="slots.default" />
    <div v-else class="flex">
      <Text
        v-if="$props.label || $props.caption"
        :label="$props.label"
        :caption="$props.caption"
        truncate class="flex-1"
      />
      <Text
        v-if="$props.value"
        :class="valueClass"
        :label="$props.value"
        class="text-faint"
        truncate
      />
    </div>
  </Item>
</template>
