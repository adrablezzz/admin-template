<template>
  <div class="common-table">
    <Row class="tool-bar">
      <Col span="12">
        <slot name="leftBar"></slot>
      </Col>
      <Col span="12" style="display: flex;justify-content: flex-end;">
        <slot name="rightBar"></slot>
        <Button icon="md-refresh" @click="refresh"></Button>
      </Col>
    </Row>
    <Table
      :columns="columns"
      :data="props.data"
      border
      :stripe="props.stripe"
      size="small"
      :max-height="maxHeight"
      :row-class-name="props.rowClassName"
      @on-selection-change="onSelectionChange"
    ></Table>
    <Row style="margin: 10px 0" class="page-row">
      <Col :span="12">
        <span v-if="props.pageSize == -1">{{
          `显示第 1 到第 ${props.data.length} 条记录，总共 ${props.data.length} 条记录`
        }}</span>
        <span v-else>{{
          `显示第 ${
            props.total == 0 ? 0 : (props.page - 1) * props.pageSize + 1
          } 到第 ${
            props.pageSize * props.page < props.total
              ? props.pageSize * props.page
              : props.total
          } 条记录，总共 ${props.total} 条记录`
        }}</span>
      </Col>
      <Col v-if="props.pageSize !== -1" :span="12" align="right">
        <Page
          :total="props.total"
          :page-size="props.pageSize"
          :current="props.page"
          :page-size-opts="props.pageSizeOpts"
          show-elevator
          show-sizer
          style="display: inline-block; overflow: hidden"
          class-name="page"
          @on-change="pageChange"
          @on-page-size-change="sizeChange"
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
import { onMounted, inject, computed, ref } from "vue";
interface Props {
  columns: { [key: string]: any }[];
  data: { [key: string]: any }[];
  isSpin: boolean;
  total?: number;
  page?: number;
  pageSize?: number;
  pageSizeOpts?: number[];
  stripe?: boolean;
  rowClassName?: (row: any, index: number) => string;
}
const mainHeight = inject("mainHeight", ref(0));
const maxHeight = computed(() => mainHeight.value - 120);
const props = withDefaults(defineProps<Props>(), {
  columns: () => [],
  data: () => [],
  isSpin: false,
  total: 0,
  page: 1,
  pageSize: -1,
  pageSizeOpts: () => [10, 50, 100],
  stripe: false,
});
const columns = computed(() =>
  props.columns.map((item) => {
    if (item.action) {
      item.render = (h: Function, params: any) => {
        let key = params.column.key;
        return h(
          "span",
          {
            style: {
              color: "#2d8cf0",
              cursor: "pointer",
            },
            onclick: () => {
              emit("onAction", params.row);
            },
          },
          params.row[key]
        );
      };
    }
    return item;
  })
);
const emit = defineEmits(["refresh", "onSelectionChange", "onAction"]);
const refresh = (params?: { page?: number; pageSize?: number }): void => {
  emit("refresh", params);
};
const pageChange = (page: number): void => {
  refresh({ page });
};
const sizeChange = (pageSize: number): void => {
  refresh({ pageSize });
};
const onSelectionChange = (selection: { [key: string]: any }[]): void => {
  emit("onSelectionChange", selection);
};

onMounted(() => {
  refresh();
});
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
      :deep(.ivu-select-dropdown) {
        .ivu-select-item {
          font-size: 12px !important;
        }
      }
    }
  }
}
</style>
