<template>
  <!-- 表单 -->
  <el-form ref="dialogForm" label-width="120px" :model="treeData">
    <el-form-item label="姓名" prop="username">
      <el-input v-model="treeData.username" style="width:70%" placeholder="请输入姓名" />
    </el-form-item>
    <el-form-item label="手机" prop="mobile">
      <el-input v-model="treeData.mobile" style="width:70%" placeholder="请输入手机号" />
    </el-form-item>
    <el-form-item label="身份证号" prop="id_number">
      <el-input v-model="treeData.id_number" style="width:70%" placeholder="请输入身份证号" />
    </el-form-item>
    <el-form-item label="社保基数" prop="social_security_base">
      <el-input v-model="treeData.social_security_base" style="width:70%" placeholder="请输入基本工资" />
    </el-form-item>
    <el-form-item label="公积金基数" prop="provident_fund_base">
      <el-input v-model="treeData.provident_fund_base" style="width:70%" placeholder="请输入津贴" />
    </el-form-item>
    <el-form-item label="企业社保基数" prop="qe_social_security_base">
      <el-input v-model="treeData.qe_social_security_base" style="width:70%" placeholder="请输入基本工资" />
    </el-form-item>
    <el-form-item label="企业公积金基数" prop="qe_provident_fund_base">
      <el-input v-model="treeData.qe_provident_fund_base" style="width:70%" placeholder="请输入津贴" />
    </el-form-item>
    <el-form-item label="个人社保缴纳" prop="person_salays">
      <el-input v-model="treeData.person_salays" style="width:70%" placeholder="请输入基本工资" />
    </el-form-item>
    <el-form-item label="个人公积金缴纳" prop="person_fund">
      <el-input v-model="treeData.person_fund" style="width:70%" placeholder="请输入津贴" />
    </el-form-item>

    <el-form-item class="left">
      <el-button @click="addCancel">取消</el-button>
      <el-button type="primary" @click="addSubmit">确定</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'EmpDialog',
  // props: {
  //   treeData: {
  //     type: Array,
  //     default: _ => []
  //   }
  // },
  data() {
    return {
      // salarysdata: [], // 工资数
      showTree: false, // 是否显示树形组件
      clickDepartName: '', // 点击的部门名字
      treeData: {
        username: '', // 用户名
        mobile: '', // 手机号
        workNumber: '', // 工号
        base_salary: '',
        allowance_scheme: '199'
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          { min: 1, max: 4, message: '用户姓名为1-4位', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    addCancel() {
      this.treeData = []
      this.$emit('close_empdialog', false)
    },
    async addSubmit() {
      console.log(this.treeData.allowance_scheme)
      console.log('this. treeData', this.treeData)
      this.$emit('update_from', this.treeData)
      this.$emit('close_empdialog', false)
    }
  }

}
</script>

  <style lang="scss" scoped>
  .left{
      position: relative;
      top:30px;
      left: 300px;
  }
  </style>

