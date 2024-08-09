<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})
const props = withDefaults(defineProps<{
  label?: string
  color?: 'default' | 'primary' | 'positive' | 'negative' | 'contrast'
  icon?: string
  iconColor?: string
  iconSize?: string
  click?: (e?: Event) => any
  disabled?: boolean
  mini?: boolean
  flat?: boolean
}>(), {
  color: 'default',
  iconSize: '24',
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
    :class="{ 'w-full dialog:px-2 item:w-8 item:min-h-8': !mini }"
  >
    <Error
      v-if="error" :error
      class="input:absolute input:bottom-7 input:right-0"
    />
    <button
      ref="el"
      class="max-h-full min-h-11 w-full rounded-xl font-500 desktop:min-h-10 input:min-h-8 input:w-8 item:min-h-8 item:w-8 input:rounded-full"
      :color
      :disabled="disabled || pending"
      :class="{ clickable: !disabled, mini, flat, shake }"
      @click="action"
    >
      <div v-if="pending">
        <Spinner :size="iconSize" />
      </div>
      <div v-else class="flex items-center justify-center gap-2">
        <NuxtIcon
          v-if="icon" :name="icon" :color="iconColor"
          :size="iconSize"
        />
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
