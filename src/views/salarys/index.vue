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
        <div class="social">
          <div class="title"> <strong>工资</strong></div>
          <div class="table">
            <div class="tabTit"><div>缴费项目</div><div>基数</div></div>
            <div class="tabRow"><div>基本工资</div><div> {{ Mydata.base_salary }} </div></div>
            <div class="tabRow"><div>津贴</div><div> {{ Mydata.allowance_scheme }} </div></div>
            <div class="tabRow"><div>缴费合计</div><div>{{ Mydata.base_salary+Mydata.allowance_scheme }}</div></div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import ImagHolder from '../../components/ImageHolder'
import { getSalarysByidAPI } from '@/api'
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
      this.$router.push('/allsalarys')
    },
    async getSalarysByidFn() {
      console.log(this.userId)
      const res = await getSalarysByidAPI(this.userId)
      this.Mydata = res.data
      console.log(this.Mydata)
      if (!res.success) this.$message.error(res.message)
      this.$message.success(res.message)
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
