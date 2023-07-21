<template>
  <div class="common-table">
    <Row class="tool-bar">
      <Col span="12">
        <slot name="leftBar"></slot>
      </Col>
      <Col span="12" align="right">
        <slot name="rightBar"></slot>
        <Button icon="md-refresh" @click="refresh"></Button>
      </Col>
    </Row>
    <Table :columns="props.columns" :data="props.data" border stripe></Table>
    <Spin fix v-if="props.isSpin">
      <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
      <div>加载中</div>
    </Spin>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
interface Props {
  columns: object[];
  data: object[];
  isSpin: boolean
}
const props = withDefaults(defineProps<Props>(), {
  columns: [],
  data: [],
  isSpin: false
});
const emit = defineEmits(["refresh"]);
const refresh = (): void => {
  emit("refresh");
};

onMounted(() => {
  refresh && refresh()
})
</script>

<style lang="less" scoped>
.common-table {
  position: relative;
  .tool-bar {
    width: 100%;
    height: 32px;
    margin-bottom: 10px;
  }
}
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
