<script setup lang="ts">
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
    enter-from-class="translate-x-320px"
    enter-active-class="transition-300"
    leave-active-class="transition-300"
    leave-to-class="translate-x-320px"
  >
    <template v-if="render">
      <div class="right-0 top-0 h-full w-320px flex">
        <Separator vertical />
        <div class="relative flex-1">
          <div class="fit">
            <Layout
              ref="layout"
              :label="render.label"
              :width="320"
              class="mobile:translate-x--100%"
              close-icon="close"
              :close
              :no-header="render.noHeader"
            >
              <Render v-bind="render" />
            </Layout>
          </div>
        </div>
      </div>
    </template>
  </Transition>
</template>
