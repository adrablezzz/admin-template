<template>
  <div>
    <commonTable :columns="columns" :data="data" :isSpin="isSpin" @refresh="refresh">
      <template #leftBar>
        <Button type="primary" style="margin-right:5px">审核通过</Button>
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
const data = reactive([
  {
    name: "John Brown",
    age: 18,
    address: "New York No. 1 Lake Park",
    date: "2016-10-03",
  },
  {
    name: "Jim Green",
    age: 24,
    address: "London No. 1 Lake Park",
    date: "2016-10-01",
  },
  {
    name: "Joe Black",
    age: 30,
    address: "Sydney No. 1 Lake Park",
    date: "2016-10-02",
  },
  {
    name: "Jon Snow",
    age: 26,
    address: "Ottawa No. 2 Lake Park",
    date: "2016-10-04",
  },
]);

const refresh = ():void => {
  isSpin.value = true
  videoModel.getVideoListForBackGround(params.value).then((da:any) => {
    isSpin.value = false
  })
}
</script>
