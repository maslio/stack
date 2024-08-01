<script setup lang="ts">
const { isMini } = defineProps<{
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
    placeholder: data.placeholder,
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
    <template v-if="next">
      <Layout
        :label="next.label"
        class="mobile:translate-x--100%"
        :close-icon="isMini ? 'back' : 'close'"
        :close
        :no-header="next.noHeader"
      >
        <Render
          :id="next.id"
          :page="next.page"
          :component="next.component"
          :props="next.props"
          :placeholder="next.placeholder"
        />
      </Layout>
    </template>
  </Transition>
</template>
