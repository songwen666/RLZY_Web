<template>
  <div class="app-container">
    <!-- 封装的组件 -->
    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
    <!-- 列表渲染 -->
    <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
      <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
    </el-table>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { postattendencebatch } from '@/api'
export default {
  name: 'Excel',
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: []
    }
  },
  methods: {
    rTime(date) {
      var json_date = new Date(date).toJSON()
      console.log(json_date.toString().slice(10, 11) === 'T')
      return new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    },
    transExcel(results) {
      const userRelations = {
        '用户ID': 'user_id',
        '手机号': 'mobile',
        '姓名': 'username',
        '部门': 'departmentName',
        '在职状态': 'job_statu',
        '考勤状态': 'adt_statu',
        '签到时间': 'adt_in_time',
        '签到日期': 'day'
      }
      return results.map(item => {
        // 定义新对象
        const newobj = {}
        // console.log(item)
        // 拿到所有的key 名
        const arr_contentKeys = Object.keys(item)
        // console.log(arr_contentKeys)
        arr_contentKeys.forEach(chinese_userRelations => {
          const English_userRelations = userRelations[chinese_userRelations]
          // 获取英文字符串key   ???????
          if (English_userRelations === 'adt_in_time') {
            newobj[English_userRelations] = this.rTime(item[chinese_userRelations])
          } else {
            const English_userRelations = userRelations[chinese_userRelations]
            newobj[English_userRelations] = item[chinese_userRelations]
          }
        })
        return newobj
      })
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 15

      if (isLt1M) {
        return true
      }

      this.$message({
        message: '请不要上传大于15M以上的大文件.',
        type: 'warning'
      })
      return false
    },
    async handleSuccess({ results, header }) {
      // 记录头部数据
      // 记录表格体数据
      this.tableData = results
      this.tableHeader = header
      const arr = this.transExcel(results)
      console.log('上传的表格arr', arr)
      console.log('上传的数据', this.tableData)
      const res = await postattendencebatch(arr).catch(err => err)
      if (!res.success) return this.$message.error(res.message)
      this.$router.back()
      this.$message.success(res.message)
      console.log('转换之后的格式是', arr)
    }
  }
}
</script>
