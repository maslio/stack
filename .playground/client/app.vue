<script setup lang="ts">
// import {
//   DataProducts,
//   LazyDevDirectus,
//   LazyDevTasks,
//   LazyUserList,
//   UiElements,
//   UiInputs,
// } from '#components'

// const next = openRef()
// const full = openRef()
// const label = ref('1')
</script>

<template>
  <Layout root>
    <Open icon="material-symbols:user-attributes" label="$t:users" page="admin/users" />
    <Open label="Test" page="test" />
    <Open label="Test2" page="test" />
  </Layout>

  <!-- <AuthLayout>
    <Card>
      <Item
        label="Users"
        icon="material-symbols:user-attributes"
        :open="{ ref: next, page: 'admin/users' }"
      />
      <Item
        icon="material-symbols:translate"
        label="Translations"
        :open="{ ref: next, page: 'admin/translate' }"
      />
      <Item
        icon="material-symbols:process-chart"
        label="Tasks"
        :open="{ ref: next, page: 'admin/tasks' }"
      />
      <Item
        icon="simple-icons:directus"
        label="Directus"
        :open="{ ref: full, component: LazyDevDirectus }"
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
    <Open ref="full" target="full" />
  </AuthLayout> -->
</template>
