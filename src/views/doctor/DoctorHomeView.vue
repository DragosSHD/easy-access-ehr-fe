<template>
  <div class="page-wrapper">
    <div class="flex-container" style="justify-content: space-between">
      <h1>Doctor Dashboard</h1>
      <n-select class="select-button" v-model:value="selectedPatientID" :options="patientsToSelect" />
    </div>
    <div v-if="selectedPatient">
      <n-descriptions label-placement="top" title="Patient Summary">
        <n-descriptions-item label="First Name">
          {{ selectedPatient?.firstName }}
        </n-descriptions-item>
        <n-descriptions-item label="Last Name">
          {{ selectedPatient?.lastName }}
        </n-descriptions-item>
        <n-descriptions-item label="Birth Date" :span="2">
          {{ new Date(selectedPatient?.birthDate).toLocaleDateString() }}
        </n-descriptions-item>
      </n-descriptions>
      <div class="flex-container" style="justify-content: start">
        <h4>Selected EHR Category: </h4>
        <n-select class="select-button" v-model:value="selectedCategory" :options="categoriesToSelect" />
      </div>
      <div v-if="isAuthorized">
        <n-data-table
            v-if="selectedCategory"
            :columns="ehrDataToDisplay.columns"
            :data="ehrDataToDisplay.data"
            :bordered="false"
        />
      </div>
      <div v-if="!isAuthorized && selectedCategory && !notAuthotizedError">
        Loading...
      </div>
      <div v-if="notAuthotizedError" class="alert-container">
        <n-alert title="Not authorized" type="error">
          You are not authorized to see EHR under this category.
          Please ask the patient to provide an authorization QR code.
        </n-alert>
      </div>
    </div>
  </div>
</template>

<script setup>
import { users } from "@/util/mock-data.js";
import { NSelect, NDescriptions, NDescriptionsItem, NDataTable, NAlert, useLoadingBar } from "naive-ui";
import { computed, onMounted, ref, watch } from "vue";
import { ehrCategories } from "@/util/constants.js";
import { getEhrCategoryData } from "@/util/api.js";

const selectedPatientID = ref();
const patientsToSelect = computed(() => {
  return users.patients.map((patient) => ({
    label: `${patient.firstName} ${patient.lastName}`,
    value: patient.id
  }));
});
const selectedCategory = ref();
const categoriesToSelect = computed(() => {
  return Object.keys(ehrCategories).map((categoryKey) => ({
    label: ehrCategories[categoryKey].display,
    value: ehrCategories[categoryKey].field
  }));
});
const selectedPatient = computed(() => {
  return users.patients.find((patient) => patient.id === selectedPatientID.value);
});
const ehrDataToDisplay = computed(() => {
  const categoryData = selectedPatient.value.ehr[selectedCategory.value.toUpperCase()];
  if (categoryData) {
    return {
      columns: Object.keys(categoryData[0]).map((key) => ({ title: key.toUpperCase(), key, sorter: 'default' })),
      data: categoryData
    }
  }
  return {
    columns: [],
    data: []
  };
});
const isAuthorized = ref(false);
const notAuthotizedError = ref(false);
const loadingBar = useLoadingBar()

watch(selectedCategory, async () => {
  if (!selectedCategory.value || !selectedPatientID.value) return;
  notAuthotizedError.value = false;
  isAuthorized.value = false;
  loadingBar.start();
  const apiResponse = await getEhrCategoryData(selectedCategory.value, selectedPatientID.value);
  if (apiResponse?.error) {
    notAuthotizedError.value = true;
    loadingBar.error();
    return;
  }
  isAuthorized.value = true
  loadingBar.finish();
});

onMounted(() => {
  selectedPatientID.value = users.patients[0].id;
});

</script>

<style scoped>

.flex-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.select-button {
  max-width: 15rem;
}

.alert-container {
  white-space: normal;
}


</style>