<template>
  <div>
    <!-- 卡片组件 -->
    <!-- 使用 Tabs 组件完成标签页布局 -->
    <page-tools>
      <!-- 自定义左侧内容 -->
      <template #slot-left>
        <span>共{{ total }}条数据</span>
      </template>

      <!-- 自定义右侧内容 -->
      <template #slot-right>
        <el-button type="primary" size="small" @click="back()">返回</el-button>
      </template>
    </page-tools>
    <el-tabs>
      <el-table :data="Mydata" border style="width: 100%" stripe>
        <el-table-column type="index" label="序号" width="120" />
        <el-table-column label="性名" prop="username" width="240" />
        <el-table-column label="类型" prop="type" :formatter="formatter" width="240" />
        <el-table-column label="审批状态" prop="status" :formatter="formatter_ped" width="240" />
        <el-table-column label="电话号码" prop="mobile" />
        <el-table-column label="创建时间" prop="creationTime" :formatter="timeFormatter" />
        <el-table-column label="原因" prop="reason" />
      </el-table>
    </el-tabs>
  </div>
</template>

<script>
import Employees from '@/api/constant/employees'
import { getapprovalsByID, getUserPhotoAPI } from '@/api'
import dayjs from 'dayjs'
import { getID } from '@/utils/auth'
import PageTools from '@/components/PageTools'
export default {
  name: 'Myselfapprovals',
  components: {
    PageTools
  },
  data() {
    return {
      userId: '',
      Mydata: [],
      total: ''
    }
  },
  computed: {
  },
  created() {
    this.userId = getID('rlzy-user-ID')
    this.getUserPhotoAPI()
    this.getapprovalsByIDFn()
  },
  methods: {
    back() {
      this.$router.back()
    },
    async getapprovalsByIDFn() {
      const res = await getapprovalsByID(this.userId)
      console.log(',?ewqewqewqe', res.data)
      this.Mydata = res.data.depts
      this.total = res.data.total
      if (!res.success) this.$message.error(res.message)
      this.$message.success(res.message)
      console.log(res)
    },
    async getUserPhotoAPI() {
      const res = await getUserPhotoAPI(this.userId).catch(err => err)
      console.log(res)
    },
    // 格式化时间
    timeFormatter(row) {
      return dayjs(row.creationTime).format('YYYY-MM-DD')
    },
    // 控制聘用形式
    formatter(row, column, cellValue, index) {
      // 用数组的 find 方法找到 id = 1 的元素，再取出它的 value
    // cellvalue：字段值。
    // row：行记录数据。
    // index: 行索引。
    // Number(cellValue)是因为在后台给的数据转化成了字符串
      console.log('wsq', Number(cellValue))
      const obj = Employees.ApplicationType.find((item) => item.id === Number(cellValue))
      console.log('<>>>', obj)
      if (Number(cellValue) === 2) return '请假'
      if (Number(cellValue) === 3) return '调休'
      return obj.value
    },
    formatter_ped(row, column, cellValue, index) {
      if (Number(cellValue) === 1) return '审批中'
      if (Number(cellValue) === 0) return '已撤销'
      if (Number(cellValue) === 2) return '通过'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
