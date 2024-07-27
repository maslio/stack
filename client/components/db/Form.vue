<script setup lang="ts">
import { readFieldsByCollection } from '@directus/sdk'
import type { Field as DirectusField } from '@directus/types'
import { titleCase } from 'scule'
import { defu } from 'defu'
import { flatten, omit } from 'lodash-es'

interface Field {
  field: string
  [key: string]: any
}
type PropFields = string | string[] | Field[]
export interface Group {
  label?: string
  fields: string | string[] | Field[]
}
defineOptions({
  inheritAttrs: false,
})
const props = defineProps<{
  collection: string
  fields?: PropFields
  groups?: Group[]
  values?: Record<string, any>
  submitLabel?: string
  submit: (data: Record<string, any>) => any
}>()

const emit = defineEmits(['submit'])

const { requestAny } = useDirectus()

function parseField(field: string | Field): Field {
  if (typeof field === 'string')
    return { field }
  return field
}

function parseFields(fields: PropFields): Field[] {
  if (typeof fields === 'string')
    return fields.split(' ').map(parseField)
  return fields.map(parseField)
}

const fields = props.groups
  ? flatten(props.groups.map(g => parseFields(g.fields)))
  : props.fields ? parseFields(props.fields) : []

function getFieldComponent(field: DirectusField) {
  if (field.meta?.interface === 'input-hash')
    return defineAsyncComponent(() => import('./FormPassword.vue'))
  if (field.meta?.interface === 'input-multiline')
    return defineAsyncComponent(() => import('./FormText.vue'))
  if (field.meta?.interface === 'select-dropdown')
    return defineAsyncComponent(() => import('./FormSelect.vue'))
  if (field.type === 'boolean')
    return defineAsyncComponent(() => import('./FormBoolean.vue'))
  return defineAsyncComponent(() => import('./FormString.vue'))
}

const directusFields = await requestAny(readFieldsByCollection(props.collection)) as DirectusField[]

const data = fields.map((field) => {
  const key = field.field
  const props = omit(field, ['field'])
  const directusField = directusFields.find(f => f.field === key)
  if (!directusField)
    throw new Error(`field '${key}' is not found in collection ${props.collection}`)
  return {
    key,
    props,
    error: ref(false),
    label: titleCase(field.field),
    field: directusField,
    component: getFieldComponent(directusField),
  }
})

const groups = props.groups ?? [{ fields }]
function getGroupFields(fields: PropFields) {
  fields = parseFields(fields).map(f => f.field)
  return data.filter(d => fields.includes(d.key))
}

const values = reactive(
  Object.fromEntries(
    fields.map(f => [f.field, props.values?.[f.field] ?? null]),
  ),
)

const errors = reactive(Object.fromEntries(
  data.map(field => [field.key, false]),
))

watch(values, () => {
  Object.keys(errors).forEach((key) => {
    errors[key] = false
  })
})

async function save() {
  const data = defu(values, props.values)
  try {
    if (props.submit)
      await props.submit(data)
    emit('submit', data)
  }
  catch (e: any) {
    if (e.errors) {
      const field = e.errors[0].extensions.field
      errors[field] = true
      throw new Error(e.errors[0].message)
    }
    throw new Error(e)
  }
}
</script>

<template>
  <Card v-for="(group, index) in groups" :key="index">
    <Component
      :is="field.component"
      v-for="field in getGroupFields(group.fields)"
      :key="field.key"
      v-model="values[field.key]"
      :field="field.field"
      :label="field.label"
      :error="errors[field.key]"
      v-bind="field.props"
    />
  </Card>
  <Button :label="submitLabel ?? '$t:save'" :click="save" color="primary" />
</template>
