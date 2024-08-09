<script setup lang="ts">
export interface Props {
  id?: string | number
  icon?: string
  label?: string
  caption?: string
  value?: string
  valueClass?: string
  clickable?: boolean | string
  tag?: string
  disabled?: boolean
  opened?: boolean
  rightIcon?: string
}

const props = defineProps<Props>()
const emit = defineEmits(['click'])
defineSlots<{
  default: () => any
  options: () => any
}>()
const slots = useSlots()
const options = ref(false)

function onClick(e: Event) {
  if (props.disabled)
    return
  if (slots.options) {
    options.value = !options.value
    return
  }
  emit('click', e)
}

// const tag = props.href ? 'a' : 'div'
const clickable = computed(() => {
  if (props.disabled)
    return false
  return props.clickable || slots.options
})
</script>

<template>
  <div
    v-click="onClick"
    class="item"
    color="default"
    :class="{ clickable, opened }"
    v-bind="$attrs"
  >
    <Icon v-if="$props.icon" :name="$props.icon" />
    <div class="flex-1">
      <slot v-if="$slots.default" />
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
    </div>
    <div v-if="rightIcon" class="ml--4 mr--2 flex items-center">
      <Icon
        :name="rightIcon"
        size="18"
        class="transition-color text-faint"
      />
    </div>
  </div>
</template>

<style scoped>
.item {
  --uno: 'relative block w-full overflow-hidden text-left px-3 py-3 desktop:py-2 rounded-xl card:rounded-none flex gap-3 items-center flex-shrink-0';
}
</style>
