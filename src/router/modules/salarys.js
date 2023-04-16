import Layout from '@/layout'
export default {
  path: '/salarys', // 工资
  component: Layout,
  children: [
    {
      path: '',
      name: 'Salarys',
      component: () => import('@/views/salarys'),
      meta: { title: '工资管理', icon: 'el-icon-s-finance' }
    },
    {
      path: '/allsalarys',
      name: 'Allsalarys',
      component: () => import('@/views/salarys/components/Allsalarys'),
      hidden: true
    },
    {
      path: '/allsalarys/excel',
      name: 'Allsalarys_excel',
      component: () => import('@/views/salarys/components/excel'),
      hidden: true
    }
  ]
}
