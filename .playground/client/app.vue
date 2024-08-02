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
      <Open
        icon="material-symbols:translate"
        label="$t:translations"
        page="admin/translate"
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
</template>
