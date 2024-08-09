<script setup lang="ts">
const { items } = await useItems('branches')
const layout = useLayout()
function onCreate(item: Record<string, any>) {
  layout.open('next', {
    page: 'admin/branches/info',
    props: { id: item.id },
  })
}
</script>

<template>
  <Card>
    <List :items="items">
      <template #item="{ item, index }">
        <Open
          :label="item.name"
          page="admin/branches/info"
          :props="{ id: item.id }"
        >
          <template #item>
            <div class="flex items-center gap-4">
              <div class="w-4 text-center">
                <div class="font-mono">
                  {{ index + 1 }}
                </div>
              </div>
              <div>
                <div>{{ item.name }}</div>
                <div class="text-sm text-faint">
                  {{ item.address }}
                </div>
              </div>
            </div>
          </template>
        </Open>
      </template>
    </List>
  </Card>
  <Open
    label="$t:create_branch"
    icon="material-symbols:add"
    page="admin/branches/create"
    :props="{ onSave: onCreate }"
  />
</template>
