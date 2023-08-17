<template>
  <transition name="modal">
    <div v-if="isModal" class="video-wrapper" transfer >
      <div class="video-content" @click.self="close">
        <video :src="src" controls autoplay class="video"></video>
        <Icon type="md-close" size="30" class="close" @click="close" />
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const isModal = ref(false);
const src = ref("");

const open = (value: string) => {
  isModal.value = true;
  src.value = value;
};
defineExpose({
  open
})
const close = () => {
  isModal.value = false;
};
</script>

<style lang="less" scoped>
.video-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  background: rgba(55, 55, 55, 0.6);
  width: 100vw;
  height: 100vh;
  z-index: 999;
  .video-content {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .video {
      max-height: 100vh;
      max-width: 100vw;
      cursor: pointer;
      object-fit: contain;
      &:focus {
        outline:none;
      }
    }
    .close {
      position: absolute;
      right: 50px;
      top: 50px;
      color: #fff;
      background: rgba(55, 55, 55, 0.4);
      padding: 5px;
      border-radius: 50%;
      cursor: pointer;
    }
  }
}
.modal-enter-active,.modal-leave-active {
  transition: opacity 0.4s ease;
}
.modal-enter-from,.modal-leave-to {
  opacity: 0;
}
</style>
