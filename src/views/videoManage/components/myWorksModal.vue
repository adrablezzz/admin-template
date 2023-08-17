<template>
  <Modal
    v-model="isModal"
    width="600"
    :title="isEdit ? '修改视频' : '发布视频'"
    :mask-closable="false"
  >
    <Form
      ref="formFieldRef"
      :model="formItem"
      :rules="ruleValidate"
      :label-width="80"
    >
      <FormItem label="标题" prop="videoTitle">
        <Input v-model="formItem.videoTitle" placeholder="填写视频标题"></Input>
      </FormItem>
      <FormItem label="描述" prop="videoDesc">
        <Input
          type="textarea"
          maxlength="6"
          :autosize="{ minRows: 2, maxRows: 6 }"
          v-model="formItem.videoDesc"
          placeholder="填写视频描述"
        ></Input>
      </FormItem>
      <FormItem label="主题" prop="themeInfo">
        <!-- <Input v-model="formItem.themeInfo" placeholder="填写视频主题"></Input> -->
        <AutoComplete
          v-model="formItem.themeInfo"
          :data="themeList"
          @on-change="onChange"
          placeholder="填写视频主题"
        ></AutoComplete>
      </FormItem>
      <FormItem label="视频" prop="videoUrl">
        <div v-if="formItem.videoUrl">
          <video
            ref="videoRef"
            :src="formItem.videoUrl"
            controls
            class="video"
          ></video>
          <Row type="flex" justify="space-between">
            <Col>
              <span style="font-size: 12px; color: #f00">
                * 选择一帧画面作为视频封面
              </span>
            </Col>
            <Col>
              <Button
                type="warning"
                @click="
                  formItem.videoUrl = '';
                  formItem.cover = '';
                "
                >删除视频</Button
              >
            </Col>
          </Row>
        </div>
        <Upload
          v-else
          action="xxx"
          type="drag"
          :show-upload-list="false"
          :before-upload="handleBeforeUpload"
        >
          <div>
            <Icon
              type="ios-cloud-upload"
              size="52"
              style="color: #3399ff"
            ></Icon>
            <p>拖拽或点击上传</p>
          </div>
        </Upload>
      </FormItem>
    </Form>
    <template #footer>
      <Row style="display: flex; justify-content: space-between">
        <Button @click="isModal = false">取消</Button>
        <Button type="primary" @click="handleSubmit">{{
          isEdit ? "修改" : "发布"
        }}</Button>
      </Row>
    </template>
    <Spin fix v-if="isSpin">
      <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
      <div>正在上传...</div>
    </Spin>
  </Modal>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import videoModel from "@/api/videoApi.ts";
import uploadModel from "@/api/upload.ts";
import { Message } from "view-ui-plus";
import { useStore } from "@/store";
const store = useStore();
import { getVideoBase64, base64ToFile } from "@/libs/tools.ts";

const isModal = ref(false);
const isEdit = ref(false);
const isSpin = ref(false);

const tempVideoFile = ref<any>();
interface FormItem {
  checkComment: string;
  checkTm: string;
  checkUserId: number;
  cover: string;
  crtTm: string;
  crtUserId: number;
  deleteFlag: number;
  id: number;
  status: number;
  themeInfo: string;
  videoDesc: string;
  videoTitle: string;
  videoType: string;
  videoUrl: string;
}
const formItem = ref<FormItem>({
  checkComment: "",
  checkTm: "",
  checkUserId: 0,
  cover: "",
  crtTm: "",
  crtUserId: (store.getUserInfo as any)?.id || 0,
  deleteFlag: 0,
  id: 0,
  status: 0,
  themeInfo: "",
  videoDesc: "",
  videoTitle: "",
  videoType: "mp4",
  videoUrl: "",
});
const ruleValidate = ref({
  videoTitle: [
    { required: true, message: "视频标题不能为空", trigger: "change" },
  ],
  videoDesc: [
    { required: true, message: "视频描述不能为空", trigger: "change" },
  ],
  themeInfo: [
    { required: true, message: "视频主题不能为空", trigger: "change" },
  ],
  videoUrl: [{ required: true, message: "请上传视频", trigger: "change" }],
});
const formFieldRef = ref<any>();

const open = (row?: any): void => {
  if (row) {
    const { id, themeInfo, videoDesc, videoTitle, videoUrl, cover } = row;
    formItem.value.id = id;
    formItem.value.themeInfo = themeInfo;
    formItem.value.videoDesc = videoDesc;
    formItem.value.videoTitle = videoTitle;
    formItem.value.videoUrl = videoUrl;
    formItem.value.cover = cover;
    isEdit.value = true;
  } else {
    isEdit.value = false;
    formFieldRef.value.resetFields();
  }
  getThemeList()
  isModal.value = true;
};
defineExpose({ open });
const emit = defineEmits(["refresh"]);

const handleSubmit = async () => {
  const validate = await formFieldRef.value.validate();
  if (!validate) {
    Message.error("请填写完整信息");
    return;
  }
  isSpin.value = true;
  if (formItem.value.cover) {
    // 修改 但没重新上传
    const params = { ...formItem.value };
    videoModel.updateXtVideo(params).then((_da) => {
      isSpin.value = false;
      Message.success("修改成功");
      emit("refresh");
      isModal.value = false;
    });
  } else {
    getCoverFile((coverFile: File) => {
      Promise.all([
        handleUpload(coverFile, "jpeg"), // 上传封面
        handleUpload(tempVideoFile.value, "mp4"), // 上传视频
      ]).then((da: any[]) => {
        const cover: string = da[0].data;
        const videoUrl: string = da[1].data;
        const params = {
          ...formItem.value,
          cover,
          videoUrl,
        };
        if (isEdit.value) {
          videoModel.updateXtVideo(params).then((_da) => {
            isSpin.value = false;
            Message.success("修改成功");
            emit("refresh");
            isModal.value = false;
          });
        } else {
          videoModel.insertXtVideo(params).then((_da) => {
            isSpin.value = false;
            Message.success("发布成功");
            isModal.value = false;
            emit("refresh");
          });
        }
      });
    });
  }
};

const videoRef = ref<InstanceType<typeof HTMLVideoElement>>();
const getCoverFile = (callback: Function) => {
  let currentTime: number | undefined = videoRef.value?.currentTime;
  getVideoBase64(
    formItem.value.videoUrl,
    (data: string) => {
      const coverFile = base64ToFile(data, "cover");
      callback && callback(coverFile);
    },
    currentTime
  );
};

const handleUpload = (file: File, fileType: string) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("fileType", fileType);
    formData.append("uploadFile", file);
    uploadModel
      .upload(formData)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const handleBeforeUpload = (file: File) => {
  tempVideoFile.value = file;

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    formItem.value.videoUrl = this.result as any;
    formFieldRef.value.validateField("videoUrl");
  };
  return false;
};

// 主题搜索模块
const onChange = (query: string) => {
  console.log(query)
  getThemeList(query)
};
interface ThemeItem {
  id: number | string;
  title: string;
  [key: string]: any;
}
const themeList = ref<string[]>([]);
const getThemeList = (query?: string) => {
  const params = {
    filters: {
      groupOp: "OR",
      rules: [
        {
          groupOp: "AND",
          rules: [
            {
              groupOp: "AND",
              field: "title",
              op: "cn",
              data: query || "",
              ptype: "string",
            },
          ],
        },
      ],
    },
    orderParams: {},
    page: 1,
    pageSize: 10,
  };
  videoModel.getThemeSearchList(params).then((da: any) => {
    themeList.value = (da.data.list || []).map((item:ThemeItem) => item.title);
  });
};
</script>
<style lang="less" scoped>
.video {
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
  &:focus {
    outline: none;
  }
}
.spin-loading {
  animation: spin-run 1s linear infinite;
}
@keyframes spin-run {
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
