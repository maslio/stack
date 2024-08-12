<script setup lang="ts">
const props = defineProps<{
  label: string
  value: number
  quota: number
  page?: string
  props?: Record<string, any>
}>()

const percent = computed(() => {
  return Math.round(props.value / props.quota * 100)
})
const width = computed(() => {
  return `${percent.value}%`
})
</script>

<template>
  <Open :label :page :props="props.props">
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
        <div class="flex items-center justify-between p-3 pr-6">
          <div>
            {{ $mt(label) }}
          </div>
          <Currency :value class="" />
        </div>
      </div>
    </div>
  </Open>
</template>
