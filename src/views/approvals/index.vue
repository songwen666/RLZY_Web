<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 卡片组件 -->
      <!-- 使用 Tabs 组件完成标签页布局 -->
      <page-tools>
        <!-- 自定义左侧内容 -->
        <template #slot-left>
          <span>共{{ total }}条数据</span>
        </template>

        <!-- 自定义右侧内容 -->
        <template #slot-right>
          <el-button type="primary" size="small" @click="history()">历史归档信息</el-button>
        </template>
      </page-tools>

      <el-card style="margin-top: 10px;">
        <el-table :data="Mydata" border style="width: 100%" stripe>
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column label="性名" prop="username" width="140" />
          <el-table-column label="类型" prop="type" :formatter="formatter" width="140" />
          <el-table-column label="审批状态" prop="status" :formatter="formatter_ped" width="140" />
          <el-table-column label="电话号码" prop="mobile" width="140" />
          <el-table-column label="创建时间" prop="creationTime" :formatter="timeFormatter" width="140" />
          <el-table-column label="原因" prop="reason" />
          <el-table-column label="操作" width="280">
            <template v-slot="{ row }">
              <el-button type="success" size="small" @click="passFn(row.app_id)">通过</el-button>
              <el-button type="primary" size="small" @click="backhistory(row.app_id)">归档信息</el-button>
              <el-button type="danger" size="small" @click="delFn(row.app_id)">驳回</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import Employees from '@/api/constant/employees'
import { getapprovalsAllPendByID, putapprovals } from '@/api'
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
    this.getapprovalsAllPendByIDFn()
  },
  methods: {
    backhistory() {
      console.log('?')
    },
    history() {
      this.$router.push('/history')
    },
    async passFn(ID) {
      console.log(ID)
      const data = {}
      data.app_id = ID
      data.status = 2
      const res = await putapprovals(data)
      console.log('通过', res)
      this.getapprovalsAllPendByIDFn()
    },
    async delFn(ID) {
      console.log(ID)
      const data = {}
      data.app_id = ID
      data.status = 0
      const res = await putapprovals(data)
      console.log('驳回', res)
      this.getapprovalsAllPendByIDFn()
    },
    async getapprovalsAllPendByIDFn() {
      const res = await getapprovalsAllPendByID()
      console.log(',?ewqewqewqe', res.data)
      this.Mydata = res.data.depts
      this.total = res.data.total
      if (!res.success) this.$message.error(res.message)
      this.$message.success(res.message)
      console.log(res)
    },
    // 格式化时间
    timeFormatter(row) {
      return dayjs(row.creationTime).format('YYYY-MM-DD')
    },
    // 控制聘用形式
    formatter(row, column, cellValue, index) {
      const obj = Employees.ApplicationType.find((item) => item.id === Number(cellValue))
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
