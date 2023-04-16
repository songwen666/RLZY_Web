<template>
  <div class="employees-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="我发起的">
            <myselfapprovals />
          </el-tab-pane>
          <el-tab-pane label="审批通过">
            <pending />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { } from '@/api'
import Pending from './detail/pending.vue'
import Myselfapprovals from './detail/myselfapprovals.vue'
export default {
  components: {
    Pending,
    Myselfapprovals
  },
  data() {
    return {
      treeData: [] // 存储部门列表(树结构)
    }
  },
  created() {
    // this.getUserPhotoFn()
  },
  methods: {
  }
}
</script>

  <style lang="scss" scoped>

  </style>

