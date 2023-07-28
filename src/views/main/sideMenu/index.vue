<template>
  <Menu
    ref="menuRef"
    :active-name="currentRoute"
    theme="dark"
    width="auto"
    accordion
    :class="menuitemClasses"
    :open-names="openNames"
    @click.capture="handleMenuClick"
    @on-select="onSelect"
  >
    <logo></logo>
    <Dropdown
      v-show="isShowDrop"
      transfer
      placement="right-start"
      v-for="subMenu in mainRoutes"
      :key="subMenu.name"
      @on-click="handleDropdownSelect"
      style="width: auto"
    >
      <Submenu :name="subMenu.name" class="subMenu">
        <template #title>
          <Icon :type="getRouteIcon(subMenu.name)"></Icon>
        </template>
      </Submenu>
      <template #list>
        <DropdownMenu class="dropdown-menu">
          <DropdownItem
            class="dropdown-item"
            v-for="menu in subMenu?.children"
            :key="menu.name"
            :name="menu.name"
            >{{ getRouteName(menu.name) }}</DropdownItem
          >
        </DropdownMenu>
      </template>
    </Dropdown>
    <Submenu
      v-show="!isShowDrop"
      v-for="subMenu in mainRoutes"
      :key="subMenu.name"
      :name="subMenu.name"
      class="subMenu"
    >
      <template #title>
        <Icon :type="getRouteIcon(subMenu.name)"></Icon>
        <span class="submenu-title">{{ getRouteName(subMenu.name) }}</span>
      </template>
      <MenuItem
        v-for="menu in subMenu.children"
        :key="menu.name"
        :name="menu.name"
        :class="menuItem"
        >{{ getRouteName(menu.name) }}</MenuItem
      >
    </Submenu>
  </Menu>
</template>
<script lang="ts" setup>
import { ref, computed, watch, nextTick, inject } from "vue";
import mainRoutes from "@/router/routes";
import { getRouteName, getRouteIcon } from '@/libs/util'
// 子组件
import logo from "./logo.vue";
// 路由
import { useRouter } from "vue-router";
const router = useRouter();
const currentRoute = ref("");
const currentSubRoute = ref("");
const openNames = ref([]);
const menuRef = ref(null);
watch(
  () => router.currentRoute.value,
  (to: any) => {
    currentRoute.value = to.name;
    currentSubRoute.value = to.matched[0].name;
    openNames.value = [currentSubRoute.value];
    nextTick(() => {
      menuRef.value.updateOpened();
    });
  },
  { immediate: true }
);
// 菜单折叠
const isCollapsed:any = inject("isCollapsed");
const isShowDrop = ref(false); // 动画完成后展示折叠下拉
watch(isCollapsed, (cur: boolean, old: boolean) => {
  setTimeout(() => {
    isShowDrop.value = cur;
  }, 200);
});
const menuitemClasses = computed(() => [
  "menu-item",
  isCollapsed.value ? "collapsed-menu" : "",
  isShowDrop.value ? "show-drop" : "",
]);
const menuItem = computed(() => [isCollapsed.value ? "hide-item" : ""]);
// 折叠菜单下拉选择
const handleDropdownSelect = (name: string): void => {
  router.push({ name });
};
// 子菜单选择
const onSelect = (name: string): void => {
  router.push({ name });
};
// 一级菜单点击捕获，折叠状态点击不会展开
const handleMenuClick = (e: any): void => {
  isCollapsed.value && e.stopPropagation();
};
</script>
<style lang="less" scoped>
.menu-item {
  .user-select-none;
  span {
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width 0.2s ease 0.2s;
  }
  i {
    transform: translateX(0px);
    transition: font-size 0.2s ease, transform 0.2s ease;
    vertical-align: middle;
    font-size: 16px;
  }
}
.collapsed-menu {
  span {
    width: 0px;
    transition: width 0.2s ease;
  }
  i {
    transform: translateX(5px);
    transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
    vertical-align: middle;
    font-size: 22px;
  }
}
.show-drop {
  :deep(.ivu-menu-submenu-title-icon) {
    display: none;
  }
  .subMenu {
    :deep(ul.ivu-menu) {
      display: none;
    }
  }
}
.subMenu {
  :deep(.ivu-menu-submenu-title) {
    background: #515a6e !important;
  }
}
.dropdown-menu {
  width: 150px;
  .dropdown-item {
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding: 0 15px;
  }
}
.hide-item {
  display: none;
}
</style>
