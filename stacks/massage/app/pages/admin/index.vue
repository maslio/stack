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
      icon="material-symbols:store"
      label="$t:branches"
      page="admin/branches/list"
      skeleton="h-11 h-50"
    />
    <Open
      icon="material-symbols:folded-hands-rounded"
      label="$t:services"
      page="admin/services/list"
      skeleton="h-11 h-50"
    />
    <Open
      icon="streamline:money-cash-bag-dollar-bag-payment-cash-money-finance"
      label="$t:expenses"
      page="admin/expenses/list"
      skeleton="h-11 h-50"
    />
    <Open
      icon="material-symbols:bar-chart-4-bars"
      label="$t:reports"
      page="reports/branches"
      skeleton="h-11 h-50"
    />
  </Card>
</template>
