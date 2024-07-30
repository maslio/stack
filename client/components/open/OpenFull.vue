<script setup lang="ts">
import Layout from '../layout/Layout.vue'
import { onErrorCaptured, ref } from '#imports'

defineOptions({
  inheritAttrs: false,
})
defineProps<{
  label?: string
  width?: number
}>()
const emit = defineEmits(['close'])
const opened = ref(false)
const mounted = ref(false)
onMounted(() => {
  mounted.value = true
})
function close() {
  opened.value = false
  emit('close')
}
function open() {
  opened.value = true
}
defineExpose({ open, close, opened })
</script>

<template>
  <Teleport v-if="mounted" to="#__nuxt">
    <Transition
      enter-from-class="translate-x-100% desktop:translate-x-320px desktop:opacity-0"
      enter-active-class="transition-300"
      leave-active-class="transition-200 v-leave-active"
      leave-to-class="translate-x-100% desktop:translate-x-320px desktop:opacity-0"
    >
      <Layout
        v-if="opened"
        :label
        :width
        :no-header="!label"
        :close
        close-icon="back"
      >
        <slot />
      </Layout>
    </Transition>
  </Teleport>
</template>
