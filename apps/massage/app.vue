<template>
  <AuthLayout>
    <AuthUser />
    <Card v-if="$access('admin1')">
      <Open
        icon="material-symbols:user-attributes"
        label="$t:users"
        page="directus/users"
      />
      <Open
        icon="material-symbols:process-chart"
        label="$t:tasks"
        page="admin/tasks"
      />
      <Open
        icon="material-symbols:translate"
        label="$t:translation"
        page="admin/translate"
        skeleton="h-11 h-50"
      />
      <Open
        icon="material-symbols:database"
        label="Directus"
        page="directus"
        target="self"
      />
    </Card>
    <Card>
      <Open
        label="$t:services"
        page="services/list"
        skeleton="h-11 h-50"
      />
      <Open
        label="$t:salons"
        page="salons/list"
        skeleton="h-11 h-50"
      />
    </Card>
  </AuthLayout>
</template>
