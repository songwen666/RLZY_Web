import Layout from '@/layout'
export default {
  path: '/social', // 社保
  component: Layout,
  children: [
    {
      path: '',
      name: 'Social_securitys',
      component: () => import('@/views/social'),
      meta: { title: '社保管理', icon: 'table' }
    },
    {
      path: 'many_people',
      name: 'many_people',
      component: () => import('@/views/social/components/many_people'),
      hidden: true
    },
    {
      path: '/many_people/excel',
      name: 'excel',
      component: () => import('@/views/social/components/excel'),
      hidden: true
    }
  ]
}
