<script setup lang="ts">
const { isMini } = defineProps<{
  isMini: boolean
}>()
const emit = defineEmits<{
  close: []
}>()
const render = ref()
function close() {
  render.value = null
  emit('close')
}
const layout = ref()
function open(data: any) {
  layout.value?.close('next')
  render.value = {
    id: data.id,
    page: data.page,
    slot: data.slot,
    label: data.label ?? '',
    props: data.props ?? {},
    skeleton: data.skeleton,
    noHeader: data.noHeader,
  }
}

defineExpose({ open, close })
</script>

<template>
  <Transition
    enter-from-class="translate-x-10 mobile:translate-x-0!"
    enter-active-class="transition-200 mobile:transition-300"
    leave-active-class="mobile:transition-300 v-leave-active"
    leave-to-class="translate-x-0!"
  >
    <template v-if="render">
      <Layout
        ref="layout"
        :label="render.label"
        class="mobile:translate-x--100%"
        :close-icon="isMini ? 'back' : 'close'"
        :close
        :no-header="render.noHeader"
      >
        <Render v-bind="render" />
      </Layout>
    </template>
  </Transition>
</template>
