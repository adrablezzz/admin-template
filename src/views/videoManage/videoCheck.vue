<template>
  <div>
    <commonTable
      :columns="columns"
      :data="data"
      :isSpin="isSpin"
      :total="total"
      :page="params.page"
      :pageSize="params.pageSize"
      @refresh="refresh"
      @onSelectionChange="onSelectionChange"
    >
      <template #leftBar>
        <Button
          type="primary"
          style="margin-right: 5px"
          v-debounce:click="handlePass"
          >批量审核</Button
        >
      </template>
    </commonTable>
    <videoView ref="videoViewRef"></videoView>
    <videoCheckModal ref="videoCheckModalRef"></videoCheckModal>
  </div>
</template>

<script setup lang="ts">
import commonTable from "@/components/tableCmps/commonTable.vue";
import videoView from '@/components/mediaCmps/videoView.vue'
import videoCheckModal from './components/videoCheckModal.vue'
import { Message } from 'view-ui-plus'
import { ref, reactive } from "vue";
import videoModel from "@/api/videoApi";

interface Item {
  id: number
  status: number
  checkComment: string | null
  videoTitle: string | null
  videoDesc: string | null
  themeInfo: string | null
  videoUrl: string | null
  cover: string | null
  [other:string]: any
}

const params = ref({
  filters: {},
  orderParams: {},
  page: 1,
  pageSize: 10,
});
const total = ref(0)

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
    render: (h:Function, params:any) => {
      let {key} = params.column
      let value = params.row[key]
      let emun:any = {
        '-1': '草稿',
        0: '审核中',
        1: '审核通过',
        2: '审核不通过'
      }
      return h('span', emun[value])
    }
  },
  {
    title: "预览",
    key: "cover",
    align: "center",
    render: (h:Function, params:any) => {
      let {key} = params.column
      let value = params.row[key]
      return h('img', {
        src: value,
        style: {
          width: '60px',
          height: '60px',
          cursor: 'pointer',
          verticalAlign: 'bottom'
        },
        onclick() {
          preView(params.row)
        }
      })
    }
  },
]);
const data = ref<any>([]);
const selection = ref([])

const videoCheckModalRef = ref(null)
const handlePass = (): void => {
  if(selection.value.length == 0) {
    Message.error('请至少选择一项')
    return
  }else {
    const ids = selection.value.map((item:Item) => item.id)
    videoCheckModalRef.value.open(ids)
  }
};
interface Pars {
  page: number
  pageSize: number
}
const refresh = (pars:Pars | undefined): void => {
  const { page, pageSize } = pars || {}
  page && (params.value.page = page)
  pageSize && (params.value.pageSize = pageSize)

  isSpin.value = true;
  videoModel.getVideoListForBackGround(params.value).then((da: any) => {
    data.value = da.data.list;
    total.value = da.data.totalCount
    params.value.page = da.data.currPage
    params.value.pageSize = da.data.pageSize
    isSpin.value = false;
  });
};

const videoViewRef = ref(null)
const preView = (row:Item): void => {
  videoViewRef.value.open(row.videoUrl)
}

const onSelectionChange = (selected: Item[]): void => {
  selection.value = selected
}
</script>
