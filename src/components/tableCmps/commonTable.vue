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
    <Table 
      :columns="props.columns" 
      :data="props.data" border 
      stripe 
      size="small" 
      :max-height="maxHeight"
      @on-selection-change="onSelectionChange"
      ></Table>
    <Row v-if="props.pageSize !== -1" style="margin: 10px 0;" class="page-row">
      <Col :span="12">
        {{ `显示第 ${props.total == 0 ? 0 : (props.page - 1) * props.pageSize + 1} 到第 ${props.pageSize * props.page < props.total ? props.pageSize * props.page : props.total} 条记录，总共 ${props.total} 条记录` }}
      </Col>
      <Col :span="12" align="right">
        <Page transfer :total="props.total" :page-size="props.pageSize" :current="props.page" :page-size-opts="props.pageSizeOpts"
          show-elevator show-sizer style="display:inline-block;overflow:hidden" class="page" 
          @on-change="pageChange" @on-page-size-change="sizeChange"
        />
      </Col>
    </Row>
    <Spin fix v-if="props.isSpin">
      <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
      <div>加载中</div>
    </Spin>
  </div>
</template>

<script setup lang="ts">
import { onMounted, inject, computed } from 'vue'
interface Props {
  columns: object[];
  data: object[];
  isSpin: boolean,
  total?: number,
  page?: number,
  pageSize?: number,
  pageSizeOpts?: number[],
}
const mainHeight = inject('mainHeight')
const maxHeight = computed(() => mainHeight.value - 120)
const props = withDefaults(defineProps<Props>(), {
  columns: [],
  data: [],
  isSpin: false,
  total: 0,
  page: 1,
  pageSize: -1,
  pageSizeOpts: [10, 50, 100],
});
const emit = defineEmits(["refresh", "onSelectionChange"]);
const refresh = (params?:any): void => {
  emit("refresh", params);
};
const pageChange = (page:number): void => {
  refresh({page})
}
const sizeChange = (pageSize:number): void => {
  refresh({pageSize})
}
const onSelectionChange = (selection:object[]): void => {
  emit("onSelectionChange", selection)
}

onMounted(() => {
  refresh()
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
  .page-row {
    font-size: 12px;
    .page {
      :deep(*) {
        font-size: 12px;
      }
    }
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
