<script setup lang="ts">
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

const { tasks } = await $fetch<{
  tasks: Record<string, {
    name: string
    description: string
  }>
}>('_nitro/tasks')

const data = reactive<{
  status: 'ready' | 'pending' | 'error' | 'success'
  result?: any
}>({
  status: 'ready',
  result: undefined,
})

const selected = ref<string>()
const options = Object.entries(tasks).map(([name, task]) => ({
  name,
  description: task.description,
}))
async function runTask() {
  if (!selected.value)
    return
  data.status = 'pending'
  try {
    const { result } = await $fetch<{ result: any }>(`_nitro/tasks/${selected.value}`)
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
    search
    :options="options"
    option-key="name"
    value-key="name"
  >
    <template #default="{ item }">
      <div>
        <div class="font-mono">
          {{ item.name }}
        </div>
        <div class="text-faint">
          {{ item.description }}
        </div>
      </div>
    </template>
  </Select>
  <Button
    label="Run"
    color="primary"
    :disabled="!selected"
    :click="runTask"
  />
  <div v-if="data.status === 'success'">
    <VueJsonPretty :data="data.result" />
  </div>
  <Item v-else-if="data.status === 'error'">
    <VueJsonPretty :data="data.result" />
  </Item>
</template>
