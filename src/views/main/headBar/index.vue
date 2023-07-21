<template>
  <div class="head-bar">
    <div class="left">
      <Icon
        @click="collapsedSider"
        :class="rotateIcon"
        style="cursor: pointer"
        type="md-menu"
        size="24"
        class="collapsed-icon"
      ></Icon>
      <Breadcrumb class="bread-crumb">
        <BreadcrumbItem>{{ getRouteName(route.name) }}</BreadcrumbItem>
        <BreadcrumbItem>{{
          getRouteName(route.matched[0].name)
        }}</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="right">
      <div class="system-list">
        <div
          v-for="sys in systemInfo.systemList"
          :key="sys.value"
          :class="[
            'system-item',
            { 'active-system': sys.value == systemInfo.active },
          ]"
        >
          {{ sys.name }}
        </div>
      </div>
      <Dropdown class="avatar-wrapper" @on-click="handleDropdown">
        <div class="avatar">
          <Avatar icon="ios-person" class="avatar-icon" />
          <span class="name">{{ userInfo.truename || userInfo.username }}</span>
        </div>
        <template #list>
          <DropdownMenu>
            <DropdownItem :name="0">退出登录</DropdownItem>
          </DropdownMenu>
        </template>
      </Dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, computed } from "vue";
import { getRouteName } from "@/libs/util";

import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

import { useStore } from "@/store";
const store = useStore();
const systemInfo: object = store.getSystemInfo;
const userInfo: object = store.getUserInfo;

const isCollapsed = inject("isCollapsed");
const rotateIcon = computed(() => [
  "menu-icon",
  isCollapsed.value ? "rotate-icon" : "",
]);
const emit = defineEmits(["collapsedSider"]);
const collapsedSider = (): void => {
  emit("collapsedSider");
};

const handleDropdown = (name:number):void => {
  if(name == 0) {
    store.logOut()
    router.push({name: 'login'})
  }
}
</script>

<style lang="less" scoped>
.head-bar {
  .user-select-none;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  .left {
    display: flex;
    align-items: center;
    .collapsed-icon {
      margin-right: 50px;
    }
  }
  .right {
    display: flex;
    .system-list {
      .system-item {
        width: 100px;
        text-align: center;
        cursor: pointer;
        &:hover {
          background: @color-hover;
        }
      }
      .active-system {
        background: @color-active;
        color: #fff;
        &:hover {
          background: @color-active;
        }
      }
    }
    .avatar-wrapper {
      height: 100%;
      display: flex;
      align-items: center;
      .avatar {
        margin: 0 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
        cursor: pointer;
        .avatar-icon {
          margin-bottom: 2px;
          background: @color-active;
        }
        .name {
          color: @color-active;
          line-height: 1;
        }
      }
    }
  }
}
</style>
