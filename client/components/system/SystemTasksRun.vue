<script setup lang="ts">
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

const props = defineProps<{
  task: string
}>()

const data = reactive<{
  status: 'ready' | 'pending' | 'error' | 'success'
  result?: any
}>({
  status: 'ready',
  result: undefined,
})

async function run() {
  data.status = 'pending'
  try {
    const { result } = await $fetch<{ result: any }>(`/_tasks/${props.task}`)
    data.result = result
    data.status = 'success'
  }
  catch (e) {
    data.result = e
    data.status = 'error'
  }
}
</script>

<template>
  <Button
    color="primary"
    :click="run"
    :disabled="data.status === 'pending'"
    label="RUN"
  />
  <Spinner
    v-if="data.status === 'pending'"
    size="32"
  />
  <div v-else-if="data.status === 'success'">
    <VueJsonPretty :data="data.result" />
  </div>
  <Item v-else-if="data.status === 'error'">
    <VueJsonPretty :data="data.result" />
  </Item>
</template>
