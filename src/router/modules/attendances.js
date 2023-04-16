import Layout from '@/layout'
export default {
  path: '/attendances', // 考勤
  component: Layout,
  children: [
    {
      path: '',
      name: 'Attendances',
      component: () => import('@/views/attendances'),
      meta: { title: '考勤管理', icon: 'el-icon-add-location' }
    },
    {
      path: '/allattendances',
      name: 'Allattendances',
      component: () => import('@/views/attendances/components/Allattendances'),
      hidden: true
    },
    {
      path: '/allattendances/excel',
      name: 'allattendances_excel',
      component: () => import('@/views/attendances/components/excel'),
      hidden: true
    }
  ]
}
