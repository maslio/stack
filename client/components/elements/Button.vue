<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})
const props = withDefaults(defineProps<{
  label?: string
  color?: 'default' | 'primary' | 'positive' | 'negative' | 'contrast'
  icon?: string
  iconColor?: string
  click?: (e?: Event) => any
  disabled?: boolean
  mini?: boolean
  flat?: boolean
}>(), {
  color: 'default',
})

const emit = defineEmits(['click'])
const el = ref() as Ref<HTMLElement>

const { pending, action, shake, error } = useAction(async (e: Event) => {
  if (props.disabled)
    return
  if (props.click)
    await props.click(e)
  emit('click', e)
})
onKeyStroke('Enter', (e) => {
  // @ts-expect-error classList
  if (e.target?.classList.contains('submit'))
    action(e)
})
</script>

<template>
  <div
    class="dialog:my-0"
    :class="{ 'w-full dialog:px-2': !mini }"
  >
    <Error v-if="error" :error />
    <button
      ref="el"
      class="max-h-full min-h-11 w-full rounded-xl font-500 desktop:min-h-10 item:h-full item:min-w-11 item:rounded-none"
      :color
      :disabled="disabled || pending"
      :class="{ clickable: !disabled, mini, flat, shake }"
      @click="action"
    >
      <div v-if="pending">
        <Spinner :size="mini ? '20' : '24'" />
      </div>
      <div v-else class="flex items-center justify-center gap-2">
        <NuxtIcon v-if="icon" :name="icon" :color="iconColor" />
        <div v-if="label">
          {{ $mt(label) }}
        </div>
      </div>
    </button>
  </div>
</template>

<style scoped>
.mini {
  --uno: w-10;
}
.flat {
  --uno: bg-transparent;
}
</style>
