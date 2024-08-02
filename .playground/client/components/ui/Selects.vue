<script setup lang="ts">
interface User {
  id: number
  name: string
  username: string
  email: string
  address: {
    streen: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}
const users = await $fetch<User[]>('https://jsonplaceholder.typicode.com/users')
const modelSingle = ref<User['id']>()
const modelMulti = ref<User['id'][]>([])
</script>

<template>
  <Card>
    <InputSelect
      v-model="modelSingle"
      label="User"
      :options="users"
      option-value="id"
      option-label="name"
      search
      v-slot="{ item }"
    >
      <div>{{ item.name }}</div>
    </InputSelect>
    <InputSelectMulti
      v-model="modelMulti"
      label="Users"
      :options="users"
      option-value="id"
      option-label="name"
    />
  </Card>
</template>
