<script setup lang="ts">
withDefaults(defineProps<{
  label?: string
  empty?: boolean
  emptyLabel?: string
}>(), {
  label: '$t:branch',
  empty: false,
  emptyLabel: '$t:all',
})

const { items } = await useItems('branches', {
  fields: ['id', 'name'],
})
const search = ref('')
const options = computed(() => {
  return items.value.filter(item => item.name.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()))
})

const model = defineModel<number | string | null>({ default: null })
const selected = computed(() => {
  return items.value.find(item => item.id === model.value)
})
</script>

<template>
  <Select
    v-model="model"
    v-model:search="search"
    label="$t:branch"
    :options
    close-on-apply
    apply-on-change
    :empty
    :empty-label
  >
    <template #item>
      <div class="flex items-center gap-2">
        <Icon name="material-symbols:store" />
        <div class="flex-1">
          {{ $mt(label) }}
        </div>
        <div class="text-faint">
          <div v-if="selected">
            {{ selected.name }}
          </div>
        </div>
      </div>
    </template>
    <template #option="{ item }">
      <div class="flex items-center gap-2">
        <span>{{ item.name }}</span>
      </div>
    </template>
  </Select>
</template>
