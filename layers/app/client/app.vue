<script setup lang="ts">
import inputs from './playground/inputs.vue'
</script>

<template>
  <AuthLayout>
    <AuthUser />
    <Card>
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
        label="UI Inputs"
        :component="inputs"
        skeleton="h-20 h-42 h-20"
      />
    </Card>
  </AuthLayout>
</template>
