<template>
  <div>
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
      @onAction="onAction"
    >
      <template #leftBar>
        <Button
          style="margin-right: 5px"
          v-debounce:click="handleAdd"
          >发布视频</Button
        >
        <Button
          v-show="canEdit"
          style="margin-right: 5px"
          v-debounce:click="handleDel"
          >删除视频</Button
        >
      </template>
      <template #rightBar>
        <Select
          v-model="type"
          style="width: 100px; margin-right: 5px"
          transfer
          @on-change="typeChange"
        >
          <Option
            v-for="item in typeGroup"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </Option>
        </Select>
      </template>
    </commonTable>
    <videoPreview ref="videoPreviewRef"></videoPreview>
    <myWorksModal ref="myWorksModalRef" @refresh="refresh"></myWorksModal>
  </div>
</template>

<script setup lang="ts">
import commonTable from "@/components/tableCmps/commonTable.vue";
import videoPreview from "@/components/mediaCmps/videoPreview.vue";
import myWorksModal from "./components/myWorksModal.vue";
import { ref, reactive, computed} from "vue";
import videoModel from "@/api/videoApi";
import { Message, Modal } from "view-ui-plus";

enum Method {
  getMyVideoList = 'getMyVideoList',
  getMyDraftVideoList = 'getMyDraftVideoList',
  getMySecretVideoList = 'getMySecretVideoList',
  getMyLikeVideoList = 'getMyLikeVideoList',
  getMyCollectVideoList = 'getMyCollectVideoList',
}
const type = ref(Method.getMyVideoList)
const typeGroup = ref([
  {value: 'getMyVideoList', label: '我的作品'},
  {value: 'getMyDraftVideoList', label: '我的草稿'},
  {value: 'getMySecretVideoList', label: '我的私密'},
  {value: 'getMyLikeVideoList', label: '我的点赞'},
  {value: 'getMyCollectVideoList', label: '我的收藏'},
])
const typeChange = (): void => {
  refresh()
}

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
  orderParams: {
    // orderParams: [{ orderColumn: "videoId", order: "ASC" }],
  },
  page: 1,
  pageSize: 10,
});
const total = ref(0);
const isSpin = ref(false);
const canEdit = computed(() => ['getMyVideoList', 'getMyDraftVideoList', 'getMySecretVideoList'].includes(type.value))
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
    action: canEdit
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
      let emun: any = {
        "-1": "草稿",
        0: "审核中",
        1: "审核通过",
        2: "审核不通过",
      };
      const colors: {[key:string]:string} = {
        1: '#19be6b',
        2: '#f00'
      }
      return h("span", {
        style: {
          color: colors[value]
        }
      }, emun[value]);
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

const myWorksModalRef = ref<InstanceType<typeof myWorksModal>>();
const handleAdd = (): void => {
  myWorksModalRef.value?.open()
};
const handleDel = (): void => {
  if(selection.value.length == 0) {
    Message.error('请至少选择一条视频')
    return
  }
  Modal.confirm({
    title: '提示',
    content: '是否删除视频',
    onOk: () => {
      let ids = selection.value.map(item => item.id)
      videoModel.deleteXtVideo(ids).then(_da => {
        Message.success('删除成功')
        refresh()
      })
    }
  })
}
const onAction = (row: any): void => {
  myWorksModalRef.value?.open(row)
}

interface Pars {
  page: number;
  pageSize: number;
}
const refresh = (pars?: Pars | undefined): void => {
  const { page, pageSize } = pars || {};
  page && (params.value.page = page);
  pageSize && (params.value.pageSize = pageSize);

  isSpin.value = true;
  videoModel[type.value](params.value).then((da: any) => {
    data.value = da.data.items || []
    total.value = da.data.count;
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