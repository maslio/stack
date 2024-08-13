<template>
  <Card>
    <Open
      icon="user"
      icon-color="primary"
      label="$t:users"
      page="directus/users"
      skeleton="h-11 h-50"
    />
  </Card>
  <Card>
    <Open
      icon="branch"
      icon-color="primary"
      label="$t:branches"
      page="admin/branches/list"
      skeleton="h-11 h-50"
    />
    <Separator icon />
    <Open
      icon="service"
      icon-color="primary"
      label="$t:services"
      page="admin/services/list"
      skeleton="h-11 h-50"
    />
    <Separator icon />
    <Open
      icon="expense"
      icon-color="primary"
      label="$t:expenses"
      page="admin/expenses/list"
      skeleton="h-11 h-50"
    />
  </Card>
  <Card>
    <Open
      icon="report"
      icon-color="primary"
      label="$t:reports"
      page="reports/branches"
      skeleton="h-11 h-50"
    />
  </Card>
</template>
