<template>
  <!-- 表单 -->
  <el-form label-width="120px">
    <el-form-item label="申请类型">
      <el-select v-model="formData_2.type" style="width:30%" placeholder="请选择" value="">
        <el-option
          v-for="item in Type"
          :key="item.id"
          :label="item.value"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item :label="`${formData_2.type==2?'请假':'调休'}开始时间`" prop="beginTime">
      <el-date-picker v-model="formData_2.beginTime" style="width:30%" placeholder="请选择开始时间" />
    </el-form-item>
    <el-form-item :label="`${formData_2.type==2?'请假':'调休'}结束时间`" prop="endTime">
      <el-date-picker v-model="formData_2.endTime" style="width:30%" placeholder="请选择结束时间" />
    </el-form-item>
    <el-form-item label="申请原因" prop="reason">
      <el-input v-model="formData_2.reason" type="textarea" style="width:50%" />
    </el-form-item>
    <el-form-item>
      <el-button @click="closeFn()">取消</el-button>
      <el-button @click="reset()">重置</el-button>
      <el-button type="primary" @click="close()">确定</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import employees from '@/api/constant/employees'
import { addApprovalsAPI } from '@/api'
import { mapGetters } from 'vuex'
export default {
  name: 'EmpDialog',
  data() {
    return {
      Type: employees.otherType,
      formData_2: {
        reason: '',
        type: '', // 聘用形式
        beginTime: '', // 开始时间
        endTime: '' // 结束时间
      }
    }
  },
  computed: {
    ...mapGetters([
      'name', 'avatar', 'userId', 'departmentName'
    ])
  },
  methods: {
    async close() {
      console.log('????')
      console.log('请假调休', this.formData_2)
      console.log(this.formData_2)
      this.formData_2.username = this.name
      const res = await addApprovalsAPI(this.formData_2)
      console.log(res)
      if (!res.success) this.$message.error(res.message)
      this.$message.success(res.message)
      this.$emit('closedialog', false)
    },
    closeFn() {
      this.$emit('closedialog', false)
    },
    reset() {
      this.formData_2 = {}
    }
  }

}
</script>

    <style lang="scss" scoped></style>

