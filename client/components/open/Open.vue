<script setup lang="ts">
import { defu } from 'defu'
import { nanoid } from 'nanoid'
import type { Component } from '#imports'
import { computed, defineAsyncComponent, ref, shallowRef } from '#imports'

type Target = 'next' | 'bottom' | 'top' | 'new' | 'full' | 'center'

interface Props {
  id?: number | string
  target?: Target
  label?: string
  caption?: string
  props?: Record<string, any>
  component?: Component | string
}

const props = withDefaults(defineProps<Props>(), {
  target: 'next',
})

defineSlots<{
  default: (data: {
    label: string
    props: Record<string, any>
  }) => any
  pending: () => any
  pendingDev: () => any
}>()
const targetIs = computed(() => {
  if (props.target === 'next')
    return defineAsyncComponent(() => import('./OpenNext.vue'))
  if (props.target === 'full')
    return defineAsyncComponent(() => import('./OpenFull.vue'))
  return defineAsyncComponent(() => import('./OpenDialog.vue'))
})
const targetRef = ref()
const id = ref()
const data = shallowRef<Props>({})

async function open(_data: Omit<Props, 'target'> = {}) {
  id.value = _data.id ?? nanoid()
  data.value = defu<Props, any>(_data, props)
  targetRef.value.open(id.value)
}
function close() {
  targetRef.value.close()
}
function opened(_id?: typeof id['value']) {
  if (_id)
    return _id === id.value
  return !!id.value
}
function onClose() {
  id.value = null
}

defineExpose({ open, close, opened, _isOpen: true })
const error = ref<Error | null>(null)
const loading = ref(true)
onErrorCaptured((e: Error) => {
  error.value = e
  loading.value = false
  console.error(e)
  return false
})
</script>

<template>
  <component
    :is="targetIs"
    :id
    ref="targetRef"
    :target="target"
    v-bind="data"
    @close="onClose"
  >
    <template v-if="id">
      <OpenError v-if="error" :error @close="close" />
      <Suspense
        v-else
        :key="data.id"
        @resolve="loading = false"
        @pending="loading = true"
      >
        <slot
          v-if="$slots.default"
          :label="data.label ?? ''"
          :props="data.props ?? {}"
        />
        <component
          :is="data.component"
          v-else-if="data.component"
          v-bind="data.props"
        />
        <template #fallback>
          <slot v-if="$slots.pending" name="pending" />
          <template v-else>
            <div class="flex flex-col gap-3">
              <Placeholder color="default" class="h-20" />
            </div>
          </template>
        </template>
      </Suspense>
      <div v-if="$slots.pendingDev" class="fit opacity-80">
        <div class="px-3">
          <slot name="pendingDev" />
        </div>
      </div>
    </template>
  </component>
</template>
