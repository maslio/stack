<!-- eslint-disable ts/no-use-before-define -->
<script setup lang="ts" generic="T">
import type { Ref, useAsyncData } from '#imports'

const props = withDefaults(defineProps<{
  label?: string
  caption?: string
  data?: ReturnType<typeof useAsyncData<T[] | null, any>>
  total?: ReturnType<typeof useAsyncData<number | null, any>>
  items?: T[]
  itemKey?: keyof T
  limit?: number
  increment?: number
  debounce?: string | number
  search?: string | null
  showSearch?: boolean
  showTotal?: boolean
  separator?: boolean
  transition?: boolean
}>(), {
  limit: 5,
  increment: 5,
})
const emit = defineEmits([
  'update:search',
  'update:limit',
])
defineSlots<{
  item: (props: {
    item: T
    index: number
  }) => any
  label: () => any
  append: () => any
}>()
const debounce = useToNumber(() => props.debounce ?? 0)

const input = ref(props.search ?? '')
watchDebounced(input, (value) => {
  emit('update:search', value)
  focus.first()
}, { debounce })

watch(() => props.search, (value) => {
  if (value)
    input.value = value
})

const list = ref<HTMLDivElement>()

const items = computed<T[]>(() => {
  if (props.data)
    return props.data.data.value as T[]
  if (props.items)
    return props.items
  return []
})

const total = computed(() => {
  if (!props.total)
    return null
  return props.total.data.value
})

const hasMore = computed<number>(() => {
  if (!items.value?.length)
    return 0
  if (total.value && total.value > items.value.length) {
    const more = total.value - items.value.length
    if (more > props.increment)
      return props.increment
    return more
  }
  return 0
})
async function increaseLimit() {
  focus.remember()
  emit('update:limit', props.limit + props.increment)
}

const focus = (function () {
  const active = ref(false)
  const index = ref<number>(-1)
  function focus(i: number) {
    if (items.value[i] || (hasMore.value && items.value.length === i))
      index.value = i
  }
  function next() {
    focus(index.value + 1)
  }
  function prev() {
    focus(index.value - 1)
  }
  function first() {
    focus(0)
  }
  function select() {
    const clickableEl = list.value?.querySelector('.focused .clickable') as HTMLElement
    clickableEl?.dispatchEvent(new MouseEvent('click'))
  }
  const rememberedIndex = ref(index.value)
  function remember() {
    rememberedIndex.value = index.value
  }
  function restore() {
    index.value = rememberedIndex.value
  }
  onKeyStroke(['ArrowDown', 'ArrowUp', 'Enter', 'Escape'], (e) => {
    if (!active.value)
      return
    e.preventDefault()
    if (e.key === 'ArrowDown')
      next()
    else if (e.key === 'ArrowUp')
      prev()
    else if (e.key === 'Enter')
      select()
    else if (e.key === 'Escape')
      input.value = ''
  })
  return toReactive({ active, index, first, remember, restore })
})()
</script>

<template>
  <Card :label>
    <div
      ref="list"
      class="list overflow-hidden rounded-xl card:rounded-none dialog:rounded-none"
      color="default"
    >
      <template v-if="$props.search != null">
        <InputString
          v-model="input"
          placeholder="$t:search"
          flat
          @focus="focus.active = true"
          @blur="focus.active = false"
        >
          <div v-if="$props.data?.status.value === 'pending'">
            <Icon name="spinner" animate-spin />
          </div>
          <div
            v-else-if="input"
            class="flex items-center text-faint"
          >
            <ItemButton icon="close" @click="input = ''" />
          </div>
        </InputString>
        <Separator />
      </template>
      <template v-if="items?.length">
        <TransitionGroup
          :name="transition ? 'items' : ''"
        >
          <div
            v-for="(item, index) in items"
            :key="String(item[props.itemKey ?? 'id' as keyof T])"
            :class="{ focused: (focus.active && index === focus.index) }"
          >
            <slot name="item" :item="item" :index />
            <Separator v-if="separator && index !== items.length - 1" inset />
          </div>
        </TransitionGroup>
      </template>
      <template v-else>
        <div class="flex flex-col items-center justify-center p-3">
          <Icon name="tabler:mood-empty" size="40" />
          <div text-faint>
            No data
          </div>
        </div>
      </template>
      <template v-if="hasMore">
        <Separator />
        <div :class="{ focused: (focus.active && items.length === focus.index) }">
          <Item clickable @click="increaseLimit">
            <template #main>
              <div text-center>
                {{ `${$t('show_more')} ${hasMore}` }}
              </div>
            </template>
          </Item>
        </div>
      </template>
      <template v-if="$slots.append">
        <slot name="append" />
      </template>
    </div>
  </Card>
  <div
    v-if="total && showTotal"
    class="m-2 text-center text-faint"
  >
    {{ $t('total') }}: {{ total }}
  </div>
</template>

<style scoped>
.items-move,
.items-enter-active,
.items-leave-active {
  --uno: transition duration-200 ease-out;
}
.items-enter-from {
  --uno: translate-x-10 opacity-0;
}
.items-leave-to {
  --uno: translate-x--10 opacity-0;
}
.items-leave-active {
  --uno: absolute;
}
</style>
