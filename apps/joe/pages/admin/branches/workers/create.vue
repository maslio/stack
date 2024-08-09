<script setup lang="ts">
const props = defineProps<{
  branch: number
}>()
const emit = defineEmits<{
  (event: 'save', item: Record<string, any>): void
}>()

const { createItem } = useCollection('workers')
const worker = ref({
  name: '',
  branch: props.branch,
  type: 'employee',
})
async function save() {
  await createItem(worker.value)
  emit('save', worker.value)
}
</script>

<template>
  <Card>
    <InputString
      v-model="worker.name"
      label="$t:person.name"
    />
  </Card>
  <Card>
    <SelectBranch v-model="worker.branch" />
  </Card>
  <Card>
    <Option v-model="worker.type" value="employee" label="Employee" />
    <Option v-model="worker.type" value="freelancer" label="Freelancer" />
  </Card>
  <Button
    :disabled="!worker.name || !worker.branch || !worker.type"
    color="primary"
    label="$t:save"
    :click="save"
  />
</template>
