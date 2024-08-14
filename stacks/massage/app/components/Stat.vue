<script setup lang="ts">
const props = defineProps<{
  label: string
  value: number
  quota?: number
  page?: string
  props?: Record<string, any>
}>()

const percent = computed(() => {
  if (!props.quota)
    return 0
  return Math.round(props.value / props.quota * 100)
})
const width = computed(() => {
  return `${percent.value}%`
})
</script>

<template>
  <Open
    :label :page :props="props.props"
    class="h-48px"
  >
    <div class="flex justify-between">
      <div
        class="absolute left-0 top-0 h-full w-10"
        dark="bg-green-800"
        light="bg-green-300"
        :style="{ width }"
      />
      <div
        class="fit"
      >
        <div class="flex items-center justify-between p-2 pr-6">
          <div>
            {{ $mt(label) }}
          </div>
          <div class="flex-col items-end pr-1 text-right">
            <Currency :value="value" class="text-sm" />
            <Currency :value="quota" class="text-sm text-faint" />
          </div>
        </div>
      </div>
    </div>
  </Open>
</template>
