<script setup lang="ts">
</script>

<template>
  <AuthLayout>
    <AuthMe />
    <Card>
      <Open
        icon="material-symbols:user-attributes"
        label="$t:users"
        page="admin/users"
      />
      <Open
        icon="material-symbols:process-chart"
        label="$t:tasks"
        page="admin/tasks"
      />
    </Card>
    <Card>
      <Open
        label="UI Inputs"
        page="inputs"
        skeleton="h-20 h-42 h-20"
      />
    </Card>
  </AuthLayout>

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
