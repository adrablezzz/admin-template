<template>
  <div class="logo">
    <img :src="imgSrc" alt="logo">
  </div>
</template>

<script lang="ts" setup>
import { inject, computed } from 'vue';
import logo from '@/assets/img/logo.png'
import logoMin from '@/assets/img/logo-min.png'
const isCollapsed = inject('isCollapsed')
const imgSrc = computed(() => isCollapsed.value ? logoMin : logo)
</script>

<style lang="less" scoped>
  .logo {
    width: auto;
    height: 64px;
    padding: 10px;
    overflow: hidden;
    img {
      width: auto;
      height: 46px;
      display: block;
      margin: 0 auto;
    }
  }
</style>