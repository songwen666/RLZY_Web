<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <el-row>
          <el-col :span="2">
            <div>
              <div class="fl headL">
                <div class="headImg">
                  <ImagHolder :src="avatar+'?imageView2/1/w/200/h/200'" />
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <el-form label-width="90px">
              <el-form-item label="姓名">
                <el-input v-model="name" disabled style="width:35%" />
              </el-form-item>
              <el-form-item label="手机号">
                <el-input v-model="form.phone" disabled style="width:35%" />
              </el-form-item>
              <el-form-item label="工号">
                <el-input v-model="form.workNumber" disabled style="width:35%" />
              </el-form-item>
              <el-form-item label="转正时间">
                <el-input v-model="form.correctionTime" disabled style="width:35%" />
              </el-form-item>
              <el-form-item label="所属部门">
                <el-input v-model="departmentName" disabled style="width:35%" />
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>

        <!-- 退出 -->
        <el-row class="inline-info" type="flex" justify="center">
          <el-col :span="14">
            <el-button @click="$router.back()">返回</el-button>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getID } from '@/utils/auth'
import { getmyselfdetailAPI } from '@/api'
import ImagHolder from '../.././components/ImageHolder'
export default {
  name: 'Myinfo',
  components: {
    ImagHolder
  },
  data() {
    return {
      form: {
        id: '',
        phone: '',
        workNumber: '',
        correctionTime: ''
      },
      userInfo: {
        photo: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'name', 'avatar', 'userId', 'departmentName'
    ])
  },
  created() {
    this.form.id = getID('rlzy-user-ID')
    this.getmyselfdetailFn()
  },
  methods: {
    async getmyselfdetailFn() {
      const res = await getmyselfdetailAPI(this.form).catch(err => err)
      console.log(res)
      this.form.phone = res.data.mobile
      this.form.correctionTime = res.data.correctionTime
      this.form.workNumber = res.data.workNumber
      console.log('getUser', res)
    }
  }
}
</script>

<style lang="scss" scoped>
pp{
  margin: 30px;
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
app-container{
  padding: 30px;
}
dashboard-container{
  padding: 10px 30px;
}
.box-card {
  padding: 10px 30px;
}
</style>
