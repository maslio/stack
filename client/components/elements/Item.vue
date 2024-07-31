<script setup lang="ts">
import { type Ref, computed, ref, useId, useNuxtApp } from '#imports'

export interface Props {
  id?: string | number
  icon?: string
  label?: string
  caption?: string
  value?: string
  clickable?: boolean | string
  href?: string
  disabled?: boolean
  open?: any
  opened?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['click'])
defineSlots<{
  default: () => any
  options: () => any
}>()
const id = props.id ?? useId()
const el = ref() as Ref<HTMLElement>
const slots = useSlots()
const options = ref(false)

const opened = computed(() => {
  if (options.value)
    return true
  if (props.opened)
    return true
  if (props.open)
    return props.open.ref?.opened(id)
  return false
})
const openIcon = computed(() => {
  if (props.href)
    return 'material-symbols-light:open-in-new-rounded'
  if (props.open?.icon)
    return props.open.icon
  if (props.open)
    return 'fluent:chevron-right-16-filled'
  return null
})

function onClick(e: Event) {
  if (props.disabled)
    return
  if (slots.options) {
    options.value = !options.value
    return
  }
  if (props.open) {
    props.open.ref.open({
      id,
      label: props.open.label ?? props.label,
      component: props.open.component,
      page: props.open.page,
      caption: props.open.caption,
      props: props.open.props,
    })
  }
  emit('click', e)
}

const tag = props.href ? 'a' : 'div'
const clickable = computed(() => props.clickable || props.href || props.open || slots.options)
</script>

<template>
  <div class="item relative">
    <component
      :is="tag"
      v-click="onClick"
      class="relative block min-h-11 w-full flex overflow-hidden rounded-xl text-left desktop:min-h-10 card:rounded-none"
      color="default"
      :class="{ clickable, opened }"
      :href="href"
      v-bind="$attrs"
    >
      <div
        ref="el"
        class="relative min-h-11 flex flex-1 items-center gap-3 px-3 py-3 desktop:min-h-10 desktop:py-2"
      >
        <Icon v-if="$props.icon" :name="$props.icon" />
        <Text
          v-if="$props.label || $props.caption"
          flex
          :label="$props.label"
          :caption="$props.caption"
        />
        <Text
          v-if="$props.value"
          class="text-faint"
          :label="$props.value"
        />
        <slot name="default" />
      </div>
      <div v-if="openIcon" class="ml--3 flex items-center p-2">
        <Icon
          :name="openIcon"
          size="18"
          class="ml--3 mr--1 transition-color text-faint"
        />
      </div>
    </component>
    <template v-if="$slots.options">
      <Transition
        enter-active-class="transition duration-50 ease-out"
        enter-from-class="translate-x-100%"
      >
        <div
          v-if="options"
          class="absolute right-0 top-0 h-full flex select-none items-stretch"
          @click="options = false"
        >
          <slot name="options" />
        </div>
      </Transition>
    </template>
  </div>
</template>
