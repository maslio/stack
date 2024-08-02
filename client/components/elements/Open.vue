<script setup lang="ts">
import { Item } from '#components'

const props = defineProps<{
  id?: string | number
  icon?: string
  label: string
  value?: string
  caption?: string
  component?: string | Component
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

function open(_target = target) {
  layout.open(_target, {
    id,
    label: props.label,
    caption: props.caption,
    component: props.component,
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

function root() {
  const t = (target.startsWith('dialog') ? 'dialog' : target) as 'next' | 'self' | 'dialog'
  const opened = layout.opened[t] === id
  return h(Item, {
    icon: props.icon,
    label: props.label,
    value: props.value,
    caption: props.caption,
    clickable: true,
    opened,
    rightIcon: 'fluent:chevron-right-16-filled',
    onClick,
    onContextmenu,
  }, slots)
}

defineExpose({ close })
if (props.preload && props.page)
  preloadComponents(resolvePage(props.page))
</script>

<template>
  <root />
</template>
