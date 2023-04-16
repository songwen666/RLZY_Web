<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 卡片组件 -->
      <!-- 使用 Tabs 组件完成标签页布局 -->
      <el-card class="header-card">
        <div class="fff">
          <div class="fl headL">
            <div class="headImg">
              <ImagHolder :src="avatar+'?imageView2/1/w/200/h/200'" />
            <!-- <img :src="avatar"> -->
            </div>

            <div class="headInfoTip">
              <p class="firstChild">{{ timetip }}，{{ name }}，祝你开心每一天！</p>
              <p class="lastChild">{{ name }} | 公司-{{ departmentName }} </p>
            </div>

          </div>
          <el-button type="primary" size="small" @click="other()">查看更多</el-button>
        </div>
      </el-card>

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
        </el-table>
      </el-card>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import attendance from '@/api/constant/attendance'
import ImagHolder from '../../components/ImageHolder'
import { getMyselfAttendenceByid } from '@/api'
import { getID } from '@/utils/auth'
import { mapGetters } from 'vuex'
export default {
  name: 'Myselfapprovals',
  components: {
    ImagHolder
  },
  data() {
    return {
      timetip: '',
      Mydata: []
    }
  },
  computed: {
    ...mapGetters([
      'name', 'avatar', 'userId', 'departmentName'
    ])
  },
  created() {
    this.mytimeTip()
    this.userId = getID('rlzy-user-ID')
    this.getSalarysByidFn()
  },
  methods: {
    other() {
      this.$router.push('/allattendances')
    },
    async getSalarysByidFn() {
      console.log(this.userId)
      const res = await getMyselfAttendenceByid(this.userId)
      this.Mydata = res.data.depts
      console.log(this.Mydata)
      if (!res.success) this.$message.error(res.message)
      this.$message.success(res.message)
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
    },
    mytimeTip() {
      const date = new Date()
      const hour = date.getHours()
      // console.log('现在时间是:' + hour + '点!')
      if (hour >= 0 && hour < 12) {
        this.timetip = '上午好'
      } else if (hour === 12) {
        this.timetip = '中午好'
      } else if (hour > 12 && hour < 18) {
        this.timetip = '下午好'
      } else {
        this.timetip = '晚上好'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.headImg {
    float: left;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #999;
    position: relative;
    top: -7px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
.fff{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.headInfoTip {
    padding: 32px 0 0;
    margin-left: 120px;
    p {
      padding: 0 0 15px;
      margin: 0;
      &.firstChild {
        font-size: 20px;
      }
      &.lastChild {
        font-size: 16px;
        color: #7f8c8d;
      }
    }
  }

  .title{
          line-height: 40px;
        }
        .table{
          display: table;
          background: #f9f9f9;
          padding: 20px;
          line-height: 30px;
          width: 100%;
          text-align: center;
          .tabTit{
            display: table-row;
            font-weight: bold;
            div{
              display: table-cell;
            }
          }
          .tabRow{
            display: table-row;
            width: 100%;
            div{
              display: table-cell;
            }
          }
        }
</style>
