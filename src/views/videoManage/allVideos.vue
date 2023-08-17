<template>
  <div id="video-check">
    <commonTable
      :columns="columns"
      :data="data"
      :isSpin="isSpin"
      :total="total"
      :page="params.page"
      :pageSize="params.pageSize"
      stripe
      @refresh="refresh"
      @onSelectionChange="onSelectionChange"
    >
      <template #leftBar>
        <Button
          type="primary"
          style="margin-right: 5px"
          v-debounce:click="handleDel"
          >批量删除</Button
        >
      </template>
      <template #rightBar>
      </template>
    </commonTable>
    <videoPreview ref="videoPreviewRef"></videoPreview>
  </div>
</template>

<script setup lang="ts">
import commonTable from "@/components/tableCmps/commonTable.vue";
import videoPreview from "@/components/mediaCmps/videoPreview.vue";
import { Message, Modal } from "view-ui-plus";
import { ref, reactive } from "vue";
import videoModel from "@/api/videoApi";

interface Item {
  id: number;
  status: number;
  checkComment: string | null;
  videoTitle: string | null;
  videoDesc: string | null;
  themeInfo: string | null;
  videoUrl: string;
  cover: string | null;
  [other: string]: any;
}
const params = ref({
  filters: {},
  orderParams: {},
  page: 1,
  pageSize: 10,
});
const total = ref(0);

const isSpin = ref(false);
const columns = reactive([
  {
    type: "selection",
    width: 60,
    align: "center",
  },
  {
    title: "标题",
    key: "videoTitle",
    align: "center",
  },
  {
    title: "描述",
    key: "videoDesc",
    align: "center",
  },
  {
    title: "主题",
    key: "themeInfo",
    align: "center",
  },
  {
    title: "发布人",
    key: "username",
    align: "center",
  },
  {
    title: "状态",
    key: "status",
    align: "center",
    width: 100,
    render: (h: Function, params: any) => {
      let { key } = params.column;
      let value = params.row[key];
      let num: any = {
        "-1": "草稿",
        0: "审核中",
        1: "审核通过",
        2: "审核不通过",
      };
      const colors: { [key: string]: string } = {
        1: "#19be6b",
        2: "#f00",
      };
      return h(
        "span",
        {
          style: {
            color: colors[value],
          },
        },
        num[value]
      );
    },
  },
  {
    title: "预览",
    key: "cover",
    align: "center",
    render: (h: Function, params: any) => {
      let { key } = params.column;
      let value = params.row[key];
      return h("img", {
        src: value,
        style: {
          width: "60px",
          height: "60px",
          cursor: "pointer",
          verticalAlign: "bottom",
          'object-fit': 'cover'
        },
        onclick() {
          preView(params.row);
        },
      });
    },
  },
]);
const data = ref<any>([]);
const selection = ref<Item[]>([]);

const handleDel = (): void => {
  if (selection.value.length == 0) {
    Message.error("请至少选择一项");
    return;
  } else {
    Modal.confirm({
      title: '提示',
      content: '是否删除？',
      onOk:() => {
        const ids = selection.value.map((item: Item) => item.id);
        videoModel.deleteXtVideo(ids).then(() => {
          Message.success('删除成功')
          refresh()
        })
      }
    })
  }
};
interface Pars {
  page: number;
  pageSize: number;
}
const refresh = (pars?: Pars | undefined): void => {
  const { page, pageSize } = pars || {};
  page && (params.value.page = page);
  pageSize && (params.value.pageSize = pageSize);

  isSpin.value = true;
  videoModel.getVideoListForBackGround(params.value).then((da: any) => {
    data.value = (da.data?.list || []).map((item: Item) => {
      return {
        ...item,
        // _disabled: item.status != 0,
      };
    });
    total.value = da.data?.totalCount || 0;
    params.value.page = da.data?.currPage || 1;
    params.value.pageSize = da.data?.pageSize || -1;
    isSpin.value = false;
  }).catch(err => {
    console.log(err)
    isSpin.value = false;
  });
};

const videoPreviewRef = ref<InstanceType<typeof videoPreview>>();
const preView = (row: Item): void => {
  videoPreviewRef.value?.open(row.videoUrl);
};

const onSelectionChange = (selected: Item[]): void => {
  selection.value = selected;
};
</script>
