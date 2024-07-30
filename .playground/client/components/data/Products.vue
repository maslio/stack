<script setup lang="ts">
import ProductsEdit from './ProductsEdit.vue'

const { items } = await useItems('products', {
  fields: ['name'],
  live: true,
})
const next = openRef()
</script>

<template>
  <List v-slot="{ item }" :items>
    <Item
      :label="item.name"
      :open="{
        id: item.id,
        ref: next,
        component: ProductsEdit,
        props: {
          id: item.id,
          onUpdate: () => {
            next?.close()
          },
        },
      }"
    />
  </List>
  <Open ref="next" />
</template>
