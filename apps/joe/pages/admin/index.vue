<template>
  <Card>
    <Open
      icon="material-symbols:person"
      label="$t:users"
      page="directus/users"
      skeleton="h-11 h-50"
    />
  </Card>
  <Card>
    <Open
      icon="material-symbols:house-siding-rounded"
      label="$t:branches"
      page="admin/branches/list"
      skeleton="h-11 h-50"
    />
    <!-- <Open
      icon="material-symbols:emoji-people"
      label="$t:workers"
      page="admin/workers/list"
      skeleton="h-11 h-50"
    /> -->
  </Card>
  <!-- <Card>
    <Open
      icon="material-symbols:folded-hands-rounded"
      label="$t:services"
      page="admin/services/list"
      skeleton="h-11 h-50"
    />
    <Open
      icon="material-symbols:folded-hands-rounded"
      label="$t:expensess"
      page="admin/expensess/list"
      skeleton="h-11 h-50"
    />
  </Card> -->
</template>
