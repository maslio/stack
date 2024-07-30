<script setup lang="ts">
import {
  DataProducts,
  LazyDevDirectus,
  LazyDevTasks,
  LazyUserList,
  UiElements,
  UiInputs,
  UiSelects,
} from '#components'

const next = openRef()
</script>

<template>
  <AuthLayout>
    <Card>
      <Item
        label="Users"
        icon="material-symbols:user-attributes"
        :open="{ ref: next, component: LazyUserList }"
      />
      <Item
        icon="material-symbols:process-chart"
        label="Tasks"
        :open="{ ref: next, component: LazyDevTasks }"
      />
      <Item
        icon="simple-icons:directus"
        label="Directus"
        :open="{ ref: next, component: LazyDevDirectus }"
      />
    </Card>
    <Card>
      <Item
        label="UI elements"
        :open="{ ref: next, component: UiElements }"
      />
      <Item
        label="UI inputs"
        :open="{ ref: next, component: UiInputs }"
      />
    </Card>
    <Card>
      <Item
        label="Data products"
        :open="{ ref: next, component: DataProducts }"
      />
    </Card>
    <Open ref="next" />
  </AuthLayout>
</template>
