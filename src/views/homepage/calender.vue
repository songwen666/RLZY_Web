<template>
  <el-calendar v-model="clickDate">
    <template slot="dateCell" slot-scope="{ date, data }">
      <div class="date-content">
        <div
          v-for="(item, index) in calendarData"
          :key="index"
        >
          <div v-if="data.day == item.day">
            {{ item.adt_statu===1?'✔️':'❓' }}
          </div>
        </div>
        <span
          class="text"
          :class="data.isSelected ? 'is-selected' : ''"
          @click="fn()"
        >
          {{ getDay(data.day) }} {{ data.isSelected ? '🚩' : '' }}
        </span>
        <span v-if="isWeek(date)" class="rest">休</span>
      </div>
    </template>
  </el-calendar>
</template>

<script>
import Cookies from 'js-cookie'
import { mapGetters } from 'vuex'
import { getAttendenceByidAPI, postAttendenceAPI, getMyselfAttendenceByid } from '@/api'
export default {
  data() {
    return {
      calendarData: [
        // { day: '2023-04-15', adt_statu: '✔️' },
        // { day: '2023-04-14', adt_statu: '❓' }
      ],
      signtime: {
        id: '',
        adt_statu: '',
        job_statu: '',
        adt_in_time: '',
        day: ''
      },
      clickDate: new Date()
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  created() {
    this.getMyselfAttendenceByidFn()
  },
  methods: {
    async fn() {
      const time = new Date()
      // 当前的时间和日子
      const day = this.getTime_d(time)
      const now_time = this.setTime(time)
      // 点击的时间和日子
      const click_day = this.getTime_d(this.clickDate)
      const click_time = this.setTime(this.clickDate)
      // 获取当前几点了
      const hour = this.getTime_h(time)

      if (now_time === click_time) {
        const res = await getAttendenceByidAPI({ day: now_time, id: this.userId })
        if (!res.success) this.$message.error(res.message)
        if (res.data === 1 && res.success) {
          // 已经打卡了
          this.$message.warning(res.message)
          return
          // 没有打卡的情况
        } else if (res.data === 0 && (hour >= 6 && hour < 10) && res.success) {
          this.signtime.adt_statu = 1
        } else if (res.data === 0 && (hour < 6 || hour >= 10) && res.success) {
          this.signtime.adt_statu = 2
        }
        this.signtime.job_statu = 1
        this.signtime.adt_in_time = now_time
        this.signtime.day = now_time
        this.signtime.id = this.userId
        console.log(this.signtime)
        this.postattendenceFn(this.signtime)
      } else {
        // console.log('时间已过')
        if (day > click_day) { this.$message.error('签到时间已过 不能签到') } else if (day < click_day) { this.$message.error('时间未到 不能签到') }
      }
    },
    async postattendenceFn(obj) {
      const res = await postAttendenceAPI(obj)
      // console.log(res)
      if (!res.success) this.$message.error(res.message)
      this.$message.success(res.message)
    },
    async getMyselfAttendenceByidFn() {
      const id = Cookies.get('rlzy-user-ID')
      const res = await getMyselfAttendenceByid(id)
      this.calendarData = res.data.depts
      console.log('xdc', res)
    },
    getDay(value) {
      // 数据是以 09-28
      const day = value.split('-')[2] // 11, 02
      return day.startsWith('0') ? day.slice(1) : day
    },
    // 判断是否周末
    isWeek(date) {
      return date.getDay() === 6 || date.getDay() === 0
    },
    setTime(dateData) {
      const date = new Date(dateData)
      const y = date.getFullYear()
      let m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      let d = date.getDate()
      d = d < 10 ? '0' + d : d
      const time_end = y + '-' + m + '-' + d
      return time_end
    },
    getTime_h(time) {
      const date = new Date(time)
      var h = date.getHours()
      return h
    },
    getTime_d(time) {
      const date = new Date(time)
      var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
      return D
    }
  }
}
</script>
<style lang="scss" scoped>
.is-selected {
    color: #1989FA;
  }
::v-deep td.next {
  display: none;
}
::v-deep .current ~ td {
  display: revert !important;
}

::v-deep .next ~ td {
  display: none;
}
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text {
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
}
</style>
