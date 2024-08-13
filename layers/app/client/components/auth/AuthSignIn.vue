<script setup lang="ts">
// const { $user, $appearance } = useNuxtApp()
const { login } = useDirectus()
const email = ref('')
const password = ref('')

async function click() {
  await login(email.value, password.value)
  // if ($user.value.appearance)
  //   $appearance.value = $user.value.appearance
  // console.log($user.value.appearance)
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <Card class="w-300px py-3">
      <InputString
        v-model="email"
        type="email"
        label="email"
        autocomplete="username"
      />
      <InputPassword
        v-model="password"
        label="password"
        autocomplete="current-password"
        submit
      />
    </Card>
    <Button
      label="sign in"
      color="primary"
      :click
    />
  </div>
</template>
