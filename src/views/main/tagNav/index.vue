<template>
  <div class="tag-nav">
    <div class="left">
      <div class="arrow" @click="handleScroll(0)">
        <Icon type="ios-arrow-back" size="18" />
      </div>
    </div>
    <div class="tag-wrapper" ref="tagWrapper">
      <div class="tag-list" ref="tagListRef" :style="tagListStyle">
        <Tag v-for="tag in routes" 
        :key="tag.name" 
        :name="tag.name"
        class="tag" 
        type="dot" 
        :closable="tag.name !== initRoute"
        :color="route.name == tag.name ? 'primary' : 'default'"
        @click="handleTag(tag.name)"
        @on-close="handleTagClose"
        >{{ getRouteName(tag.name) }}</Tag>
      </div>
    </div>
    <div class="right">
      <div class="arrow" @click="handleScroll(1)"><Icon type="ios-arrow-forward" size="18" /></div>
      <Dropdown transfer placement="bottom-end" @on-click="handleDropDown">
        <div class="arrow close"><Icon type="ios-close-circle-outline" size="18"/></div>
        <template #list>
            <DropdownMenu>
                <DropdownItem :name="0">关闭其他</DropdownItem>
                <DropdownItem :name="1">关闭全部</DropdownItem>
            </DropdownMenu>
        </template>
    </Dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { initRoute } from '@/router/config'
import { getRouteName } from '@/libs/util'

// 状态
const store = useStore()
const routes = computed(() => store.getRoutesLog)

// 路由
const route = useRoute()
const router = useRouter()

// 组件
const tagWrapper = ref(null)
const tagListRef = ref(null)
const tagListLeft = ref(0)
const tagListStyle = computed(() => {
  return {
    left: tagListLeft.value + 'px'
  }
})

const handleScroll = (v:number):void => {
  let step:number = 200
  if(v === 0) {
    tagListLeft.value += step
    tagListLeft.value >= 0 && (tagListLeft.value = 0)
  }else if(v === 1) {
    if(-tagListLeft.value + tagWrapper.value.offsetWidth >= tagListRef.value.scrollWidth) {
      tagListLeft.value += step
    }
    tagListLeft.value -= step
  }
}
const handleTag = (name: string) => {
  router.push({name})
}
const handleTagClose = (event: any,name: string) => {
  const index:number = store.delRouteLog(name)
  if(route.name == name && index !== -1) {
    const len:number = routes.value.length
    let nextIndex:number = 0
    if(len === index) {
      nextIndex = len-1
    }else {
      nextIndex = index
    }
    const nextRouteName = routes.value[nextIndex].name
    router.push({name: nextRouteName})
  }
}
const handleDropDown = (name:number) => {
  if(name === 0) {
    store.clearRouteLog(route.name)
  }else {
    store.clearRouteLog()
    router.push({name: initRoute})
  }
}
</script>

<style lang="less" scoped>
.tag-nav {
  .user-select-none;
  height: 40px;
  background: @color-back;
  position: relative;
  .left,
  .right {
    position: absolute;
    cursor: pointer;
  }
  .arrow {
    width: 30px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #fff;
    border: 1px solid @color-back;
  }
  .left {
  }
  .right {
    top: 0;
    right: 0;
    display: flex;
  }
  .tag-wrapper {
    width: calc(~"100% - 60px");
    height: 40px;
    margin: 0 30px;
    display: flex;
    align-items: center;
    overflow: hidden;
    .tag-list {
      display: flex;
      align-items: center;
      position: relative;
      transition: 0.5s ease-in-out;
      .tag {
        cursor: pointer;
        font-size: 12px;
        padding: 0 10px;
        margin-left: 5px;
        display: inline-block;
        flex-shrink: 0;
        :deep(.ivu-tag-dot-inner) {
          transition: all 0.2s ease;
        }
      }
    }
  }
}
</style>
