<template>
  <Modal v-model="isModal" width="600" title="视频审核">
    <Form ref="formFieldRef" :model="formItem" :rules="ruleValidate" :label-width="80">
      <FormItem label="审核意见" prop="comment">
        <Input
          v-model="formItem.comment"
          placeholder="填写审核意见"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 6 }"
        ></Input>
      </FormItem>

    </Form>

    <template #footer>
      <Row style="display:flex;justify-content:space-between">
        <Button @click="handlePass(2)">审核不通过</Button>
        <Button type="primary" @click="handlePass(1)">审核通过</Button>
      </Row>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import videoModel from '@/api/videoApi.ts'

const isModal = ref(false);
interface FormItem {
  status: number
  comment: string
  ids: number[]
}
const formItem = ref<FormItem>({
  status: 0,
  comment: '',
  ids: []
})
const ruleValidate = ref({
  comment: [
    { required: true, message: '审核意见不能为空', trigger: 'change' }
  ]
})
const open = (ids: number[]): void => {
  formItem.value.ids = ids
  isModal.value = true;
};
defineExpose({ open });
const formFieldRef = ref(null)
const handlePass = (status:number): void => {
  // 1通过 2不通过
  formFieldRef.value.validate((v:boolean) => {
    if(v) {
      formItem.value.status = status
      let params = formItem.value
      videoModel.checkVideo(params).then((da:any) => {
        Message.success("操作成功")
      })
    }else {
      Message.error('请填写完整信息')
    }
  })
}
</script>
