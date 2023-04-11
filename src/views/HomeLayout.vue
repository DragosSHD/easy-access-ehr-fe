<template>
    <div class="home-layout">
      <n-layout-header style="height: 64px;" bordered>
        <n-grid x-gap="12" :cols="3" style="height: 60px" item-responsive responsive="screen">
          <n-gi>
            <div class="header-item">
              <HamburgerButton @toggleActive="(value) => collapsed = !value" />
            </div>
          </n-gi>
          <n-gi>
            <div class="header-item">

            </div>
          </n-gi>
          <n-gi>
            <div class="header-item">

            </div>
          </n-gi>
        </n-grid>
      </n-layout-header>
      <n-layout has-sider>
        <n-layout-sider
            bordered
            collapse-mode="width"
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
                accordion
            />
            <div style="display: flex; justify-content: center; width: 100%; padding: 10px 0">
              <n-button type="warning" @click="handleLogout" quaternary>
                Log Out
              </n-button>
            </div>
          </n-space>
        </n-layout-sider>
        <n-layout style="padding: 15px">
          <RouterView />
        </n-layout>
      </n-layout>
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
} from "naive-ui";
import { h, reactive, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import HamburgerButton from "../components/HamburgerButton.vue";
import routeNames from "../router/routeNames.js";
import { setUser } from "../util/util.js";

const collapsed = ref(false);
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