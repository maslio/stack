<script setup lang="ts">
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

const { options } = defineProps<{
  options: {
    label: string
    route: string
    params?: Record<string, any>
  }[]
}>()

const data = reactive<{
  status: 'ready' | 'pending' | 'error' | 'success'
  result?: any
}>({
  status: 'ready',
  result: undefined,
})

const selected = ref<string>()
async function click() {
  if (!selected.value)
    return
  const option = options.find(option => option.route === selected.value)
  if (!option)
    return
  data.status = 'pending'
  try {
    const result = await $fetch<{ result: any }>(option.route, {
      params: option.params,
    })
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
  <Select
    v-model="selected"
    :options="options"
    option-value="route"
  />
  <Button :click color="primary" label="$t:submit" />
  <div v-if="data.status === 'success'">
    <VueJsonPretty :data="data.result" />
  </div>
  <div v-else-if="data.status === 'error'">
    <VueJsonPretty :data="data.result" />
  </div>
</template>
