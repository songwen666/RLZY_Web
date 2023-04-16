<template>
  <!-- 表单 -->
  <el-form label-width="120px">
    <el-form-item label="申请类型">
      <el-select v-model="formData.type" style="width:30%" placeholder="请选择" value="">
        <el-option
          v-for="item in Type"
          :key="item.id"
          :label="item.value"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item v-show="`${formData.type}`==1?true:false" :label="`${formData.type==1?'加班':'离职'}开始时间`" prop="beginTime">
      <el-date-picker v-model="formData.beginTime" style="width:30%" placeholder="请选择开始时间" />
    </el-form-item>
    <el-form-item :label="`${formData.type==1?'加班结束':'期望离职'}时间`" prop="endTime">
      <el-date-picker v-model="formData.endTime" style="width:30%" placeholder="请选择结束时间" />
    </el-form-item>
    <el-form-item label="申请原因" prop="reason">
      <el-input v-model="formData.reason" type="textarea" style="width:50%" />
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

export default {
  name: 'EmpDialog',
  data() {
    return {
      Type: employees.ApplicationType,
      formData: {
        reason: '',
        type: '', // 聘用形式
        beginTime: '', // 开始时间
        endTime: '' // 结束时间
      }
    }
  },
  methods: {
    close() {
      this.$emit('formData', this.formData)
      this.$emit('closedialog', false)
    },
    closeFn() {
      this.$emit('closedialog', false)
    },
    reset() {
      this.formData = {}
    }
  }

}
</script>

  <style lang="scss" scoped></style>
