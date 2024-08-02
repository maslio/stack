<script setup lang="ts">
import { pascalCase } from 'scule'

defineOptions({
  inheritAttrs: false,
})
const props = defineProps<{
  id?: string
  page?: string
  component?: string | Component
  props?: Record<string, any>
  skeleton?: string | string[]
}>()
const key = computed(() => props.id ?? props.page)
const skeleton = computed(() => props.skeleton
  ? typeof props.skeleton === 'string'
    ? props.skeleton.split(' ')
    : props.skeleton
  : ['h-20'],
)

const component = computed(() => props.component
  ? props.component
  : resolveComponent(pascalCase(`lazy-page-${props.page?.replace(/:/g, '-')}`)))
</script>

<template>
  <Suspense :key="key">
    <template #default>
      <component :is="component" v-bind="props.props" />
    </template>
    <template #fallback>
      <div class="flex flex-col items-center gap-3">
        <Skeleton
          v-for="(classes, index) in skeleton"
          :key="index"
          :class="classes"
        />
      </div>
    </template>
  </Suspense>
</template>
