<script setup lang="ts">
const { user } = defineProps<{
  user: Item
}>()
const { request } = useDirectus()
async function click() {
  request(deleteUsers([user.id]))
}
</script>

<template>
  <Item>
    <Text class="text-center">
      {{ `${$t('confirm_user_delete')} ${getUsername(user)}` }}
    </Text>
  </Item>
  <Button label="$t:delete_user" color="negative" :click />
</template>
