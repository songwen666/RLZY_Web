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
          <el-table-column label="考勤状态" prop="adt_statu" :formatter="formatter" width="140" />
          <el-table-column label="在职状态" prop="job_statu" :formatter="formatter_p" width="140" />
          <el-table-column label="部门" prop="departmentName" width="140" />
          <el-table-column label="电话号码" prop="mobile" width="140" />
          <el-table-column label="签到时间" prop="adt_in_time" :formatter="timeFormatter" width="280" />
          <el-table-column label="签到日期" prop="day" />
          <el-table-column label="操作" width="280">
            <template v-slot="{ row }">
              <el-button type="primary" size="small" @click="change(row.id)">调整</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <!-- 分页区域 -->
          <el-pagination
            :current-page="query.page"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="query.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-row>
      </el-card>

    </div>
  </div>
</template>

<script>
import attendance from '@/api/constant/attendance'
import { getAttendanceListAPI } from '@/api'
import dayjs from 'dayjs'
import { getID } from '@/utils/auth'
import PageTools from '@/components/PageTools'
export default {
  name: 'Allattendances',
  components: {
    PageTools
  },
  data() {
    return {
      query: {
        page: 1, // 页码
        size: 5 // 每页条数
      },
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
    this.getAttendanceListFn()
  },
  methods: {
    add() {
      this.$router.push('/allattendances/excel')
    },
    back() {
      this.$router.back()
    },
    // 每页显示的条数发生改变时触发
    handleSizeChange(newSize) {
      this.query.size = newSize
      this.getAttendanceListFn()
    },

    // 当前页面发生改变时触发
    handleCurrentChange(newPage) {
      this.query.page = newPage
      this.getAttendanceListFn()
    },
    // 调整
    async getAttendanceListFn() {
      const res = await getAttendanceListAPI(this.query)
      console.log(',?ewqewqewqe', res.data)
      this.Mydata = res.data.rows
      this.total = res.data.total
      if (!res.success) this.$message.error(res.message)
      this.$message.success(res.message)
      console.log(res)
    },
    // 导出数据方法前对数据处理
    transData(rows) {
      // 4.0 准备一个列表头中文数组 (8个)
      const headerArr = ['序号', '姓名', '手机号', '部门', '在职状态', '考勤状态', '签到时间', '签到日期']
      // 4.1 数据key的映射关系(思路: 遍历上边数组里按照顺序, 取出中文的名字, 但是对应数组值的数组, 要从英文key对象中取出value值, 我要用中文key换到英文key然后去取到值)
      const myObj = {
        // 序号可以等遍历的时候直接用索引值, 而不是来自于英文对象里
        '姓名': 'username',
        '手机号': 'mobile',
        '部门': 'departmentName',
        '在职状态': 'job_statu',
        '考勤状态': 'adt_statu',
        '签到时间': 'adt_in_time',
        '签到日期': 'day'
      }
      // 4.2 按照顺序
      // rows是用api请求的数据 很多对象那个
      const resultArr = rows.map((English_val_obj, index) => {
        const trans_date_Arr = []
        headerArr.forEach(chinese_value => {
          if (chinese_value === '序号') {
            trans_date_Arr.push(index + 1)
          } else {
            const English_key = myObj[chinese_value]
            const obj_value = English_val_obj[English_key]
            if (English_key === 'adt_statu') {
              const obj = attendance.holidayType.find(item => item.id === Number(obj_value))
              trans_date_Arr.push(obj ? obj.value : '未知')
            } else if (English_key === 'job_statu') {
              const obj = attendance.classType.find(item => item.id === Number(obj_value))
              trans_date_Arr.push(obj ? obj.value : '未知')
            } else {
              trans_date_Arr.push(obj_value)
            }
          }
        })
        console.log(trans_date_Arr)
        return trans_date_Arr
      })
      // 形成表格数据
      return { header: headerArr, data: resultArr }
    },
    // 导出 数据
    async downloadExcel() {
      console.log('daochu')
      const res2 = await getAttendanceListAPI({ page: 1, size: this.total })
      const excelObj = this.transData(res2.data.rows)
      console.log(excelObj)
      import('@/vendor/Export2Excel').then(excel => {
      // excel表示导入的模块对象
        excel.export_json_to_excel({
          header: excelObj.header, // 表头 必填
          data: excelObj.data, // 具体数据 必填
          filename: '考勤列表', // 文件名称
          autoWidth: true, // 宽度是否自适应
          bookType: 'xlsx' // 生成的文件类型
        })
      })
    },
    timeFormatter(row) {
      return dayjs(row.adt_in_time).format('YYYY-MM-DD h:mm')
    },
    formatter(row, column, cellValue, index) {
      const obj = attendance.holidayType.find((item) => item.id === Number(cellValue))
      return obj ? obj.value : '未知'
    },
    formatter_p(row, column, cellValue, index) {
      const obj = attendance.classType.find((item) => item.id === Number(cellValue))
      return obj ? obj.value : '未知'
    }
  }
}
</script>

  <style lang="scss" scoped>

  </style>

