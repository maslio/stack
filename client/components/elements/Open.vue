<script setup lang="ts">
import { Item } from '#components'

const props = defineProps<{
  id?: string | number
  icon?: string
  label: string
  caption?: string
  component?: string | Component
  page?: string
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

function onClick() {
  layout.open(target, {
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
const root = h(Item, {
  icon: props.icon,
  label: props.label,
  caption: props.caption,
  clickable: true,
  rightIcon: 'fluent:chevron-right-16-filled',
  onClick,
}, useSlots())

defineExpose({ close })
</script>

<template>
  <root />
</template>
