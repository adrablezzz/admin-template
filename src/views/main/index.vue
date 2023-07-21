<style lang="less" scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  height: 100vh;
  .ivu-menu {
    z-index: 0;
  }
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
</style>
<template>
  <div class="layout">
    <Layout style="height: 100%">
      <Sider
        ref="siderRef"
        hide-trigger
        collapsible
        :collapsed-width="78"
        v-model="isCollapsed"
      >
        <sideMenu :isCollapsed="isCollapsed"></sideMenu>
      </Sider>
      <Layout>
        <Header :style="{ padding: 0 }" class="layout-header-bar">
          <headBar @collapsedSider="collapsedSider"></headBar>
        </Header>
        <Content
          style="background: #f5f7f9; min-height: 260px"
        >
        <tagNav></tagNav>
        <router-view v-slot="{ Component }">
          <!-- <keep-alive> -->
            <component :is="Component" style="padding:10px"/>
          <!-- </keep-alive> -->
        </router-view>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script lang="ts" setup>
import { ref, provide } from 'vue'
// 子组件
import sideMenu from '@/views/main/sideMenu'
import headBar from '@/views/main/headBar'
import tagNav from '@/views/main/tagNav'

const isCollapsed = ref(false)
provide('isCollapsed', isCollapsed)

const siderRef = ref(null)
const collapsedSider = () => {
  siderRef.value.toggleCollapse()
}
</script>
