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
  placeholder?: string | string[]
}>()
const key = computed(() => props.id ?? props.page)
const placeholder = computed(() => props.placeholder
  ? typeof props.placeholder === 'string'
    ? props.placeholder.split(' ')
    : props.placeholder
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
      <div class="flex flex-col gap-3">
        <Placeholder
          v-for="(classes, index) in placeholder"
          :key="index"
          :class="classes"
        />
      </div>
    </template>
  </Suspense>
</template>
