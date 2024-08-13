<script setup lang="ts">
const props = defineProps<{
  id: number
}>()
const emit = defineEmits<{
  (event: 'save', item: Record<string, any>): void
}>()

const { readItem, updateItem } = useCollection('workers')
const worker = ref(await readItem(props.id))
const newAvatar = ref<File>()
async function uploadAvatar(files: File[]) {
  newAvatar.value = files[0]
}
async function save() {
  await updateItem(props.id, { ...worker.value, avatar: newAvatar.value })
  emit('save', worker.value)
}
</script>

<template>
  <FilesUpload @upload="uploadAvatar" />
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
    color="primary"
    label="$t:save"
    :click="save"
  />
</template>
