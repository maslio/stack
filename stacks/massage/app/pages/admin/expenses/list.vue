<script setup lang="ts">
const { items, refresh } = await useItems('expenses')
const layout = useLayout()

function onSave() {
  refresh()
  layout.close('next')
}
</script>

<template>
  <Card>
    <List :items="items" separator>
      <template #item="{ item }">
        <OpenCurrency
          :label="item.name"
          :value="item.amount"
          page="admin/expenses/edit"
          :props="{ id: item.id, onSave }"
        />
      </template>
    </List>
  </Card>
  <Open
    label="$t:create_an_expense"
    icon="material-symbols:add"
    icon-color="primary"
    page="admin/expenses/edit"
    :props="{ onSave }"
  />
</template>
