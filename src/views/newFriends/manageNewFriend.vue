<template>
  <div class="card">
    <DataTable :value="products" tableStyle="min-width: 50rem">
      <Column
        v-for="col of columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
      ></Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref } from "vue";

const products = ref({
  id: "1000",
  code: "f230fh0g3",
  name: "Bamboo Watch",
  description: "Product Description",
  image: "bamboo-watch.jpg",
  price: 65,
  category: "Accessories",
  quantity: 24,
  inventoryStatus: "INSTOCK",
  rating: 5,
});
const columns = [
  { field: "code", header: "Code" },
  { field: "name", header: "Name" },
  { field: "category", header: "Category" },
  { field: "quantity", header: "Quantity" },
];
</script>
