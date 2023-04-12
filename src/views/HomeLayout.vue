<template>
    <div class="home-layout">
      <n-layout-header style="height: 64px;" bordered>
        <n-grid x-gap="12" :cols="3" style="height: 60px" item-responsive responsive="screen">
          <n-gi>
            <div class="header-item">
              <HamburgerButton v-model="collapsed"/>
            </div>
          </n-gi>
          <n-gi>
            <div class="header-item">

            </div>
          </n-gi>
          <n-gi>
            <div class="header-item" style="justify-content: end">
              <n-button @click="modalData.showModal = true">Share EHR</n-button>
            </div>
          </n-gi>
        </n-grid>
      </n-layout-header>
      <n-layout has-sider>
        <n-layout-sider
            bordered
            collapse-mode="transform"
            :show-collapsed-content="false"
            :width="240"
            :collapsed-width="0"
            :collapsed="collapsed"
            @collapse="collapsed = true"
            @expand="collapsed = false"
        >
          <n-space style="height: 100%" justify="space-between" vertical>
            <n-menu
                :collapsed="collapsed"
                :collapsed-width="64"
                v-model:value="selectedKey"
                :collapsed-icon-size="22"
                :options="menuOptions"
                style="user-select: none;"
                accordion
            />
            <div style="display: flex; justify-content: center; width: 100%; padding: 10px 0">
              <n-button type="warning" @click="handleLogout" quaternary>
                Log Out
              </n-button>
            </div>
          </n-space>
        </n-layout-sider>
        <n-layout style="padding: 15px; white-space: nowrap">
          <RouterView />
        </n-layout>
      </n-layout>
      <n-modal v-model:show="modalData.showModal"
               class="custom-card"
               preset="card"
               title="Share Health Records"
               :bordered="false"
               :style="modalStyle"
               size="huge">
          <p>Select EHR data to share:</p>
          <n-checkbox-group v-model:value="modalData.healthRecords">
            <n-grid :y-gap="8" :cols="2">
              <n-gi>
                <n-checkbox size="large"
                            value="allergies"
                            label="Allergies"/>
              </n-gi>
              <n-gi>
                <n-checkbox size="large"
                            value="conditions"
                            label="Conditions"/>
              </n-gi>
              <n-gi>
                <n-checkbox size="large"
                            value="immunizations"
                            label="Immunizations"/>
              </n-gi>
              <n-gi>
                <n-checkbox size="large"
                            value="medication"
                            label="Medication"/>
              </n-gi>
              <n-gi>
                <n-checkbox size="large"
                            value="medical-tests"
                            label="Medical Tests"/>
              </n-gi>
            </n-grid>
          </n-checkbox-group>
          <template #footer>
            <div style="display: flex; width: 100%; justify-content: center">
              <n-button type="primary" :disabled="!modalData.healthRecords.length">
                Generate QR Code
              </n-button>
            </div>
          </template>
      </n-modal>
    </div>
</template>

<script setup>
import {
  NLayout,
  NLayoutSider,
  NMenu,
  NGrid,
  NGi,
  NLayoutHeader,
  NSpace,
  NButton,
  NModal,
  NCheckboxGroup,
  NCheckbox,
} from "naive-ui";
import { computed, h, onMounted, reactive, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import HamburgerButton from "../components/HamburgerButton.vue";
import routeNames from "../router/routeNames.js";
import { setUser } from "../util/util.js";

const collapsed = ref(true);
const menuOptions = reactive([
  {
    label: () => h(RouterLink, {
      to: { name: routeNames.HOME },
    }, {
      default: () => "Home"
    }),
    key: "home",
  },
  {
    label: "My Health Records",
    key: "health-records",
    children: [
      {
        label: () => h(RouterLink, {
          to: { name: routeNames.HEALTH_RECORDS, params: { recordType: "allergies" } },
        }, {
          default: () => "Allergies"
        }),
        key: "allergies"
      },
      {
        label: () => h(RouterLink, {
          to: { name: routeNames.HEALTH_RECORDS, params: { recordType: "conditions" } },
        }, {
          default: () => "Conditions"
        }),
        key: "conditions"
      },
      {
        label: () => h(RouterLink, {
          to: { name: routeNames.HEALTH_RECORDS, params: { recordType: "immunizations" } },
        }, {
          default: () => "Immunizations"
        }),
        key: "immunizations"
      },
      {
        label: () => h(RouterLink, {
          to: { name: routeNames.HEALTH_RECORDS, params: { recordType: "medication" } },
        }, {
          default: () => "Medication"
        }),
        key: "medication"
      },
      {
        label: () => h(RouterLink, {
          to: { name: routeNames.HEALTH_RECORDS, params: { recordType: "medical-tests" } },
        }, {
          default: () => "Medical Tests"
        }),
        key: "medical-tests"
      },
    ]
  },
  {
    label: "Administrative",
    key: "administrative",
    children: [
      {
        label: () => h(RouterLink, {
          to: "/",
        }, {
          default: () => "Invoices"
        }),
        key: "rat"
      }
    ]
  }
]);
const selectedKey = ref("home");
const router = useRouter();
const modalData = reactive({
  healthRecords: [],
  showModal: false
});
const modalStyle = computed(() => {
  const viewportWidth = window.innerWidth;
  if(viewportWidth < 768) {
    return {
      width: "100%",
      height: "70vh"
    };
  }
  return {
    width: "70%",
    height: "70vh"
  };
});

onMounted(() => {
  const path = router.currentRoute.value.path;
  if(path === "/") {
    selectedKey.value = "home";
  } else if(path.includes("health-records")) {
    if(path.includes("allergies")) {
      selectedKey.value = "allergies";
    } else if(path.includes("conditions")) {
      selectedKey.value = "conditions";
    } else if(path.includes("immunizations")) {
      selectedKey.value = "immunizations";
    } else if(path.includes("medication")) {
      selectedKey.value = "medication";
    } else if(path.includes("medical-tests")) {
      selectedKey.value = "medical-tests";
    }
  } else if(path.includes("administrative")) {
    selectedKey.value = "administrative";
  }

  const viewportWidth = window.innerWidth;
  if(viewportWidth > 768) {
    collapsed.value = false;
  }

});

async function handleLogout() {
  setUser(null);
  await router.push({ name: routeNames.LOGIN });
}

</script>

<style scoped>

.header-item {
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 25px;
}

.home-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

</style>