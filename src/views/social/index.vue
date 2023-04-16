<template>
  <div class="dashboard-container">
    <div>
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
    </div>

    <div class="app-container">
      <el-card>
        <div class="social">
          <div class="title"> <strong>社保公积金</strong> </div>
          <div class="table">
            <div class="tabTit"><div>缴费项目</div><div>基数</div><div> 企业缴纳 </div><div>个人缴纳</div></div>
            <div class="tabRow"><div>社保</div><div> {{ socdata.social_security_base }} </div><div>{{ socdata.qe_social_security_base }}</div><div> {{ socdata.person_salays }} </div></div>
            <div class="tabRow"><div>公积金</div><div> {{ socdata.provident_fund_base }} </div><div>{{ socdata.qe_provident_fund_base }}</div><div> {{ socdata.person_fund }} </div></div>
            <div class="tabRow"><div>缴费合计</div><div>{{ socdata.social_security_base+socdata.provident_fund_base }}</div><div>{{ socdata.qe_social_security_base +socdata.qe_provident_fund_base }}</div><div> {{ socdata.person_salays + socdata.person_fund }} </div></div>
          </div>
        </div>
      </el-card></div>
  </div></template>

<script>
import { getsocialSecuritysById } from '@/api'
import { mapGetters } from 'vuex'
import ImagHolder from '../../components/ImageHolder'
export default {
  components: {
    ImagHolder
  },
  data() {
    return {
      yearMonth: '',
      timetip: '',
      socdata: {
      },
      query: {
        page: 1, // 页码
        size: 10 // 每页条数
      }
    }
  },
  computed: {
    ...mapGetters([
      'name', 'avatar', 'userId', 'departmentName'
    ])
  },
  created() {
    this.getSocialFn()
    this.mytimeTip()
  },
  mounted() {
  },
  methods: {
    other() {
      this.$router.push('/social/many_people')
    },
    async getSocialFn() {
      console.log('@@@@', this.userId)
      const res = await getsocialSecuritysById(this.userId)
      this.socdata = res.data
      // console.log('@@@@??', this.socdata)
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

  <style rel="stylesheet/scss" lang="scss" scoped>
 @import "../../styles/variables.scss";

 .social{
        padding-bottom: 10px;
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
      }
.app-container{
  padding: 30px;
}
.info{
          margin-left: 10px;
          line-height: 25px;
        }
.fff{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.page-tools {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dfdfdf{
  padding: 10px;
}
.dashboard-container {
  margin: 10px;
  li {
    list-style: none;
  }
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
}
</style>
