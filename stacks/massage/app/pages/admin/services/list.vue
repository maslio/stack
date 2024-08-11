<script setup lang="ts">
const { items, refresh } = await useItems('services')
const layout = useLayout()

function onSave() {
  refresh()
  layout.close('next')
}
</script>

<template>
  <Card>
    <List :items="items">
      <template #item="{ item }">
        <Open
          :label="item.name"
          page="admin/services/edit"
          :props="{ id: item.id, onSave }"
        >
          <div>
            <div>{{ item.name }}</div>
            <div v-if="item.options" class="flex gap-2 text-sm text-faint">
              <div v-for="option in item.options" :key="option.duration">
                {{ option.duration }}={{ option.amount }}฿
              </div>
            </div>
          </div>
        </Open>
      </template>
    </List>
  </Card>
  <Open
    label="$t:create_a_service"
    icon="material-symbols:add"
    page="admin/services/edit"
    :props="{ onSave }"
  />
</template>
