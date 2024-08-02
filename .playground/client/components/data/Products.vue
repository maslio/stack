<script setup lang="ts">
import ProductsEdit from './ProductsEdit.vue'

const { items } = await useItems('products', {
  fields: ['name'],
  live: true,
})
const next = openRef()
</script>

<template>
  <List :items v-slot="{ item }">
    <Item
      :label="item.name"
      :open="{ ref: next, id: item.id, props: { id: item.id } }"
    />
  </List>
  <Open ref="next" v-slot="{ props }">
    <ProductsEdit :id="props.id" @update="next?.close()" />
  </Open>
</template>
