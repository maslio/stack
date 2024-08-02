<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})
const props = defineProps<{
  id?: string
  page?: string
  slot?: () => any
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
const component = computed(() => {
  if (props.component)
    return props.component
  if (props.page)
    return resolveComponent(resolvePage(props.page))
  if (props.slot)
    return h(props.slot)
  return null
})
</script>

<template>
  <Suspense :key="key">
    <template #default>
      <component v-if="component" :is="component" v-bind="props.props" />
      <slot v-else />
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
