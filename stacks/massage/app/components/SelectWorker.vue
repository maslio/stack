<script setup lang="ts">
const props = withDefaults(defineProps<{
  label?: string
  branch?: number
}>(), {
  label: '$t:worker',
})

const model = defineModel<number | string | null>({ default: null })

const { items } = await useItems('workers', {
  fields: ['id', 'name', 'branch'],
})
const search = ref('')
const options = computed(() => {
  const workers = items.value.filter(item => item.name.includes(search.value))
  if (props.branch)
    return workers.filter(item => item.branch === props.branch)
  return workers
})

const selected = computed(() => {
  return items.value.find(item => item.id === model.value)
})
</script>

<template>
  <Select
    v-model="model"
    v-model:search="search"
    label="$t:worker"
    :options
    close-on-apply
    apply-on-change
  >
    <template #item>
      <div class="flex items-center justify-between gap-2">
        <div>{{ $mt('$t:worker') }}</div>
        <div class="h-30px">
          <div v-if="selected">
            <Avatar :src="selected.avatar" size="30" />
          </div>
        </div>
      </div>
    </template>
    <template #option="{ item }">
      <div class="flex items-center gap-2">
        <Avatar :src="item.avatar" size="30" />
        <span>{{ item.name }}</span>
      </div>
    </template>
  </Select>
</template>
