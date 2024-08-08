<template>
  <AuthLayout>
    <AuthUser />
    <Card v-if="$access('super')">
      <Open
        icon="material-symbols:translate"
        label="$t:translation"
        page="admin/translate"
        skeleton="h-11 h-50"
      />
    </Card>
    <Card v-if="$access('admin')">
      <Open
        icon="material-symbols:person"
        label="$t:users"
        page="directus/users"
        skeleton="h-11 h-50"
      />
    </Card>
    <Card v-if="$access('admin')">
      <Open
        icon="material-symbols:folded-hands-rounded"
        label="$t:services"
        page="services/list"
        skeleton="h-11 h-50"
      />
      <Open
        icon="material-symbols:house-siding-rounded"
        label="$t:salons"
        page="salons/list"
        skeleton="h-11 h-50"
      />
      <Open
        icon="material-symbols:emoji-people"
        label="$t:workers"
        page="workers/list"
        skeleton="h-11 h-50"
      />
    </Card>
    <Render v-if="$access('manager')" page="manager/menu" />
  </AuthLayout>
</template>
