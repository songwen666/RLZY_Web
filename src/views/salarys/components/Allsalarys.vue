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
          <el-button type="danger" size="small" @click="back()">回退</el-button>
          <el-button type="primary" size="small" @click="add()">导入薪资信息</el-button>
          <el-button type="primary" size="small" @click="downloadExcel()">导出薪资信息</el-button>
        </template>
      </page-tools>

      <el-card style="margin-top: 10px;">
        <el-table :data="Mydata" border style="width: 100%" stripe>
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column label="性名" prop="username" width="140" />
          <el-table-column label="工号" prop="workNumber" width="140" />
          <el-table-column label="部门" prop="departmentName" width="140" />
          <el-table-column label="电话号码" prop="mobile" width="140" />
          <el-table-column label="身份证号" prop="id_number" width="280" />
          <el-table-column label="聘用形式" prop="formOfEmployment" :formatter="formatter" width="120" />
          <el-table-column label="基本工资" prop="base_salary" width="120" />
          <el-table-column label="津贴" prop="allowance_scheme" />
          <el-table-column label="操作" width="280">
            <template v-slot="{ row }">
              <el-button type="primary" size="small" @click="change(row.id)">调整</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <el-dialog
        title="新增"
        :visible.sync="showDialog"
        width="50%"
      >
        <emp-dialog
          ref="addEmpDialog"
          @close_empdialog="close"
          @update_from="updatesalarysFn"
        />
      </el-dialog>

    </div>
  </div>
</template>

<script>
import Employees from '@/api/constant/employees'
import empDialog from './empDialog.vue'
import { getSalarysAPI, getSalarysByidAPI, putSalarysAPI } from '@/api'
import dayjs from 'dayjs'
import { getID } from '@/utils/auth'
import PageTools from '@/components/PageTools'
export default {
  name: 'Allsalarys',
  components: {
    PageTools,
    empDialog
  },
  data() {
    return {
      userId: '',
      treeData: [],
      Mydata: [],
      showDialog: false,
      total: ''
    }
  },
  computed: {
  },
  created() {
    this.userId = getID('rlzy-user-ID')
    this.getSalarysFn()
  },
  methods: {
    add() {
      this.$router.push('/allsalarys/excel')
    },
    close() {
      this.showDialog = false
    },
    back() {
      this.$router.back()
    },
    // 调整
    async change(ID) {
      this.showDialog = true
      const res = await getSalarysByidAPI(ID)
      // this.treeData = res.data
      this.$refs.addEmpDialog.treeData = res.data
      console.log('?<>', res.data)
    },
    async getSalarysFn() {
      const res = await getSalarysAPI()
      console.log(',?ewqewqewqe', res.data)
      this.Mydata = res.data.depts
      this.total = res.data.total
      if (!res.success) this.$message.error(res.message)
      this.$message.success(res.message)
      console.log(res)
    },
    async updatesalarysFn(data) {
      console.log('gai', data)
      const res = await putSalarysAPI(data)
      if (!res.success) this.$message.error(res.message)
      this.$message.success(res.message)
      this.getSalarysFn()
    },
    // 导出数据方法前对数据处理
    transData(rows) {
      // 4.0 准备一个列表头中文数组 (8个)
      const headerArr = ['序号', '姓名', '基本工资', '津贴', '手机号', '工号', '聘用形式', '部门', '身份证号码']
      // 4.1 数据key的映射关系(思路: 遍历上边数组里按照顺序, 取出中文的名字, 但是对应数组值的数组, 要从英文key对象中取出value值, 我要用中文key换到英文key然后去取到值)
      const myObj = {
        // 序号可以等遍历的时候直接用索引值, 而不是来自于英文对象里
        '姓名': 'username',
        '基本工资': 'base_salary',
        '津贴': 'allowance_scheme',
        '手机号': 'mobile',
        '工号': 'workNumber',
        '聘用形式': 'formOfEmployment',
        '部门': 'departmentName',
        '身份证号码': 'id_number'
      }
      // 4.2 按照顺序
      // rows是用api请求的数据 很多对象那个
      const resultArr = rows.map((English_val_obj, index) => {
        const trans_date_Arr = []
        headerArr.forEach(chinese_value => {
          if (chinese_value === '序号') {
            trans_date_Arr.push(index + 1)
          } else {
            // 把传入对象的 含英文键名的 值取到 依次放入 对象大概为
            // {'username'：'xxx',
            // 'staffPhoto': 'xxx'
            // }
            // trans_date_Arr.push(English_val_obj[myObj[chinese_value]])
            const English_key = myObj[chinese_value]
            const obj_value = English_val_obj[English_key]
            if (English_key === 'formOfEmployment') {
              const obj = Employees.hireType.find(item => item.id === Number(obj_value))
              trans_date_Arr.push(obj ? obj.value : '未知')
            } else {
              trans_date_Arr.push(obj_value)
            }
          }
        })
        return trans_date_Arr
      })
      // 形成表格数据
      return { header: headerArr, data: resultArr }
    },
    // 导出 数据
    async downloadExcel() {
      console.log('daochu')
      const res2 = await getSalarysAPI()
      const excelObj = this.transData(res2.data.depts)
      import('@/vendor/Export2Excel').then(excel => {
      // excel表示导入的模块对象
        excel.export_json_to_excel({
          header: excelObj.header, // 表头 必填
          data: excelObj.data, // 具体数据 必填
          filename: '员工列表', // 文件名称
          autoWidth: true, // 宽度是否自适应
          bookType: 'xlsx' // 生成的文件类型
        })
      })
    },
    // 格式化时间
    timeFormatter(row) {
      return dayjs(row.creationTime).format('YYYY-MM-DD')
    },
    // 控制聘用形式
    formatter(row, column, cellValue, index) {
      const obj = Employees.hireType.find((item) => item.id === Number(cellValue))
      return obj ? obj.value : '未知'
    }
  }
}
</script>

  <style lang="scss" scoped>

  </style>

