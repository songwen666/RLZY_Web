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
import { postsocialSecuritysAPI } from '@/api'
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
    transExcel(results) {
      const userRelations = {
        '数据库ID': 'id',
        '手机号': 'mobile',
        '姓名': 'username',
        '工号': 'workNumber',
        '部门': 'department',
        '身份证号码': 'id_number',
        '开户行': 'opening_bank',
        '开户行卡号': 'bank_card_number',
        '公积金城市': 'provident_fund_city',
        '参保城市': 'participating_in_the_city',
        '社保基数': 'social_security_base',
        '公积金基数': 'provident_fund_base',
        '企业社保基数': 'qe_social_security_base',
        '企业公积金基数': 'qe_provident_fund_base',
        '个人社保缴纳': 'person_salays',
        '个人公积金缴纳': 'person_fund'
      }
      return results.map(item => {
        // 定义新对象
        const newobj = {}
        // console.log(item)
        // 拿到所有的key 名
        const arr_contentKeys = Object.keys(item)
        // console.log(arr_contentKeys)
        arr_contentKeys.forEach(chinese_userRelations => {
          // 获取英文字符串key
          const English_userRelations = userRelations[chinese_userRelations]
          newobj[English_userRelations] = item[chinese_userRelations]
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
      const res = await postsocialSecuritysAPI(arr).catch(err => err)
      if (!res.success) return this.$message.error(res.message)
      this.$router.back()
      this.$message.success(res.message)
      console.log('转换之后的格式是', arr)
    }
  }
}
</script>
