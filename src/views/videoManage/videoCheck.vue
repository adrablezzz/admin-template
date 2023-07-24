<template>
  <div>
    <commonTable :columns="columns" :data="data" :isSpin="isSpin" @refresh="refresh">
      <template #leftBar>
        <Button type="primary" style="margin-right:5px" v-debounce:click="handlePass">审核通过</Button>
        <Button>审核不通过</Button>
      </template>
    </commonTable>
  </div>
</template>

<script setup lang="ts">
import commonTable from '@/components/tableCmps/commonTable.vue'
import { ref, reactive } from "vue";
import videoModel from '@/api/videoApi'
const params = ref({
  filters: {},
  orderParams: {},
  page: 1,
  pageSize: 10
})

const isSpin = ref(false)
const columns = reactive([
  {
    title: "Name",
    key: "name",
  },
  {
    title: "Age",
    key: "age",
  },
  {
    title: "Address",
    key: "address",
  },
]);
const data = reactive<any>([]);

const handlePass = ():void => {
  console.log('pass')
}
const refresh = ():void => {
  isSpin.value = true
  videoModel.getVideoListForBackGround(params.value).then((da:any) => {
    isSpin.value = false
    data.value = da.data
  })
}
</script>
