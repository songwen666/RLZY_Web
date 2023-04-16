import Layout from '@/layout'
export default {
  path: '/approvals', // 审批
  component: Layout,
  children: [
    {
      path: '',
      name: 'Approvals',
      component: () => import('@/views/approvals'),
      meta: { title: '审批管理', icon: 'tree-table' }
    },
    {
      path: '/history',
      name: 'History',
      component: () => import('@/views/approvals/components/history'),
      hidden: true
    }
  ]
}
