<script setup lang="ts">
import type { Field } from '@directus/types'

const props = defineProps<{
  pattern: string
  fields: Field[]
  item: Record<string, any>
}>()

const fields = props.pattern
  .replace(/\{\{/g, '')
  .split('}}').map(part => part.trim())
  .filter(p => p.length)
  .map(p => props.fields.find(f => f.field === p))
</script>

<template>
  <div class="flex justify-start gap-1">
    <div v-for="field in fields" :key="field?.field">
      <div v-if="field?.type === 'string'">
        {{ item[field.field] }}
      </div>
    </div>
  </div>
</template>
