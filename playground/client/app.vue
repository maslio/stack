<script setup lang="ts">
import {
  LazySystemTasks,
  LazyUserList,
  UiElements,
  UiInputs,
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
        :open="{ ref: next, component: LazySystemTasks }"
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
    <Open ref="next" />
  </AuthLayout>
</template>
