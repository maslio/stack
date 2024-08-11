<script setup lang="ts">
defineProps<{
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
function open(data: any) {
  render.value = {
    id: data.id,
    page: data.page,
    slot: data.slot,
    label: data.label ?? 'next',
    props: data.props ?? {},
    skeleton: data.skeleton,
    noHeader: data.noHeader,
    component: data.component,
  }
}

defineExpose({ open, close })
</script>

<template>
  <Transition
    enter-from-class="translate-x-100% desktop:translate-x-320px"
    enter-active-class="transition-300"
    leave-active-class="transition-200 mobile:transition-300 v-leave-active"
    leave-to-class="translate-x-100% desktop:translate-x-320px desktop:opacity-0"
  >
    <template v-if="render">
      <Layout
        :label="render.label"
        close-icon="back"
        :no-header="render.noHeader"
        :close
      >
        <Render v-bind="render" />
      </Layout>
    </template>
  </Transition>
</template>
