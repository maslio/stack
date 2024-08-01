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
const placeholder = props.placeholder
  ? typeof props.placeholder === 'string'
    ? [props.placeholder]
    : props.placeholder
  : ['h-20']

const component = props.component
  ? props.component
  : resolveComponent(pascalCase(`lazy-page-${props.page?.replace(/:/g, '-')}`))
</script>

<template>
  <Suspense :key="id">
    <component :is="component" v-bind="props.props" />
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
