<template>
  <Card>
    <InputDate />
    <InputDateRange />
  </Card>
  <Card>
    <InputString label="String" />
    <InputText label="Text" />
  </Card>
  <Card>
    <div class="flex">
      <InputNumber label="Sum" :decimal="2" />
      <InputNumber label="Sum" :decimal="1" />
    </div>
  </Card>
</template>
