<script setup lang="ts">
const props = defineProps<{
  id?: string | number
  icon?: string
  label: string
  caption?: string
  component?: string | Component
  page?: string
  target?: string
  placeholder?: string
  props?: Record<string, any>
  noHeader?: boolean
}>()

const id = props.id ?? useId()
const layout = useLayout()
const target = props.target ?? 'next'

function onClick() {
  layout.open(target, {
    id,
    label: props.label,
    caption: props.caption,
    component: props.component,
    page: props.page,
    placeholder: props.placeholder,
    props: props.props,
    noHeader: props.noHeader,
  })
}
</script>

<template>
  <Item
    :icon="icon"
    :label="label"
    :caption="caption"
    clickable
    right-icon="fluent:chevron-right-16-filled"
    @click="onClick"
  />
</template>
