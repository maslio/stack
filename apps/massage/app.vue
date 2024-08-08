<template>
  <AuthLayout>
    <AuthUser />
    <!-- <Card v-if="$access('super')">
      <Open
        icon="material-symbols:translate"
        label="$t:translation"
        page="admin/translate"
        skeleton="h-11 h-50"
      />
    </Card> -->
    <!-- <Render v-if="$access('admin')" page="admin" />
    <Render v-else-if="$access('manager')" page="manager" /> -->
  </AuthLayout>
</template>
