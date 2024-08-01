<script setup lang="ts">
defineProps<{
  isMini: boolean
}>()
const emit = defineEmits<{
  close: []
}>()
const next = ref()
function close() {
  next.value = null
  emit('close')
}
function open(data: any) {
  next.value = {
    id: data.id,
    page: data.page,
    label: data.label ?? 'next',
    props: data.props ?? {},
    noHeader: data.noHeader,
  }
}

defineExpose({ open, close })
</script>

<template>
  <Transition
    enter-from-class="translate-x-100% desktop:translate-x-320px"
    enter-active-class="transition-300"
    leave-active-class="transition-200 v-leave-active"
    leave-to-class="translate-x-100% desktop:translate-x-320px desktop:opacity-0"
  >
    <template v-if="next">
      <Layout
        :label="next.label"
        close-icon="back"
        :no-header="next.noHeader"
        :close
      >
        <Page
          :id="next.id"
          :page="next.page"
          :component="next.component"
          :props="next.props"
        />
      </Layout>
    </template>
  </Transition>
</template>
