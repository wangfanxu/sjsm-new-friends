<template>
  <div class="card">
    <DataTable
      paginator
      :rows="10"
      :value="documents"
      tableStyle="min-width: 50rem"
    >
      <Column field="id" sortable hidden></Column>
      <Column field="displayName" header="姓名" sortable></Column>
      <Column field="contactNumber" header="联系方式" sortable></Column>
      <Column field="receptionistName" header="招待员" sortable></Column>

      <Column>
        <template #body="slotProps">
          <button @click="handleEdit(slotProps)">修改</button>
        </template>
      </Column>
    </DataTable>
  </div>
  <Dialog
    v-model:visible="displaySetting"
    modal
    header="修改"
    :style="{ width: '50vw' }"
  >
    <label>姓名</label>
    <input type="text" v-model="selectedRow.displayName" />

    <label>性别</label>
    <input type="text" v-model="selectedRow.gender" />

    <label>联系方式</label>
    <input type="text" v-model="selectedRow.contactNumber" />

    <label>招待员</label>
    <input type="text" v-model="selectedRow.receptionistName" />

    <Button @click="handleUpdate(selectedRow)">提交</Button>
  </Dialog>
</template>

<script setup>
import getCollection from "@/composables/getCollection";
import useDocument from "@/composables/useDoc";
import { ref } from "vue";
const { documents } = getCollection("seekers");
const displaySetting = ref(false);
const selectedRow = ref(null);

const handleEdit = ({ data }) => {
  selectedRow.value = data;
  displaySetting.value = true;
};

const handleUpdate = async (selectedRow) => {
  const { updateDoc } = useDocument(`/seekers/${selectedRow.id}`);
  try {
    await updateDoc({ ...selectedRow });
  } catch (e) {
    console.log("error", e);
  }
};
</script>

<style>
.card {
  background: var(--surface-card);
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 1rem;
}
</style>
