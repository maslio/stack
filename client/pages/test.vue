<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})
const { open } = useLayout()
function onClick(page: string, target: string) {
  open(target, {
    id: page,
    page,
    props: {
      label: 'Hello world',
    },
  })
}
</script>

<template>
  <Card>
    <Item label="self" clickable @click="onClick('test', 'self')" />
    <Item label="next" clickable @click="onClick('test', 'next')" />
    <Item label="hello tasks" open="/admin/tasks/hello" />
  </Card>
</template>
