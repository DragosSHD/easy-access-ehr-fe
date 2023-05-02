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
             :on-after-leave="handleModalClose"
             size="huge">
      <template v-if="!modalData.showQrCode">
        <p>Select EHR data to share:</p>
        <n-checkbox-group :style="{ marginBottom: '15px' }" v-model:value="modalData.healthRecords">
          <n-grid :y-gap="8" cols="1 400:2">
            <n-gi v-for="ehrCategory in ehrCategories" :key="ehrCategory">
              <n-checkbox size="large"
                          :value="ehrCategory"
                          :label="ehrCategory"/>
            </n-gi>
          </n-grid>
        </n-checkbox-group>
        <p>Choose access expiration date:</p>
        <n-date-picker v-model:value="modalData.expirationDate"
                       :min-date="modalData.expirationDate"
                       :is-date-disabled="modalData.minDate"
                       type="date"/>
      </template>
      <template v-else>
        <QrCode :value="modalData.qrCode"
                v-if="modalData.qrCode"
                style="height: 100%; display: flex; justify-content: center; align-items: center"/>
      </template>
      <template #footer v-if="!modalData.showQrCode">
        <div style="display: flex; width: 100%; justify-content: center">
          <n-button type="primary"
                    @click="handleQrGeneration"
                    :disabled="!modalData.healthRecords.length || !modalData.expirationDate">
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
  NDatePicker
} from "naive-ui";
import { computed, h, onMounted, reactive, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import HamburgerButton from "../components/HamburgerButton.vue";
import routeNames from "../router/routeNames.js";
import { getUser, setUser } from "../util/util.js";
import { ehrCategories, userRoles } from "../util/constants.js";
import QrCode from "../components/QrCode.vue";
import { getAuthorizationToken } from "../util/api.js";

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
    label: "My Patients",
    key: "health-records",
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
  expirationDate: null,
  minDate: (ts) => {
    return new Date(ts) < new Date();
  },
  qrCode: "",
  showModal: false,
  showQrCode: false
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

  const user = getUser();
  if([userRoles.DOCTOR, userRoles.ADMIN].includes(user.role)) {
    const administrativeMenu = menuOptions.find(menu => menu.key === "administrative");
    administrativeMenu.children.push({
      label: () => h(RouterLink, {
        to: { path: "/rat" },
      }, {
        default: () => "Patient Dashboard"
      }),
      key: "rat"
    });
  }

  const viewportWidth = window.innerWidth;
  if(viewportWidth > 768) {
    collapsed.value = false;
  }
});

async function handleModalClose() {
  modalData.showModal = false;
  modalData.showQrCode = false;
  modalData.healthRecords = [];
  modalData.expirationDate = null;
  modalData.qrCode = "";
}

async function handleLogout() {
  setUser(null);
  await router.push({ name: routeNames.LOGIN });
}

async function handleQrGeneration() {
  const { healthRecords, expirationDate } = modalData;
  modalData.showQrCode = true;
  const tokenRes = await getAuthorizationToken({
    healthRecords,
    expirationDate,
    types: ['read']
  });
  modalData.qrCode = tokenRes.data;
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