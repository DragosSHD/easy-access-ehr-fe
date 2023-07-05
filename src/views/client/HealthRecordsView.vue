<template>
  <div >
    <h1>{{heading}}</h1>
    <n-data-table
        :columns="ehrDataToDisplay.columns"
        :data="ehrDataToDisplay.data"
        :bordered="false"
    />
  </div>
</template>

<script setup>

import { useRoute } from "vue-router";
import { computed } from "vue";
import { NDataTable } from "naive-ui";
import { getUser } from "@/util/util.js";
import { users } from "@/util/mock-data.js";

const route = useRoute();
const heading = computed(() => {
  return route.path.split('/').pop();
});
const selectedPatient = computed(() => {
  const user = getUser();
  const localUser = users.patients.find((patient) => patient.id === user.id);
  if (localUser) return localUser;
  return users.doctors.find((patient) => patient.id === user.id);
});
const ehrDataToDisplay = computed(() => {
  const category = route.path.split('/').pop().toUpperCase();
  const categoryData = selectedPatient.value.ehr[category.toUpperCase()];
  if (categoryData && categoryData.length > 0) {
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


</script>

<style scoped>

h1 {
  text-transform: capitalize;
}

</style>