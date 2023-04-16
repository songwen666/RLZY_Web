import { getToken, setToken, removeToken, setID, removeID } from '@/utils/auth'
import { loginAPI, getUserProfileAPI, getUserPhotoAPI } from '@/api'
import { resetRouter } from '@/router'
// getDefaultState 就是  state
const getDefaultState = () => {
  return {
    token: getToken(), // 用户 Token，默认为 ''
    userInfo: {}, // 用户基本资料
    name: '',
    avatar: ''
  }
}
const state = getDefaultState()

const mutations = {
  // 把getDefaultState 合并到state
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN(state, newToken) {
    state.token = newToken
    // 数据持久化
    setToken(newToken)
  },
  SET_ID(state, newID) {
    state.userInfo.userId = newID
    // 数据持久化
    setID(newID)
  },
  // 删除token
  REMOVE_TOKEN(state) {
    state.token = ''
    removeToken()
  },
  // 退出时 删除ID
  REMOVE_ID(state) {
    state.userInfo.userId = ''
    removeID()
  },
  /** ********* */
  SET_USER(state, value) {
    state.userInfo = value
  },
  REMOVE_USER(state) {
    state.userInfo = {}
  }
}

const actions = {
  // user login
  // {commit} 就是state
  async loginActions({ commit }, value) {
    console.log('!!!!!!!!{ commit }, value', { commit }, value)
    try {
      const res = await loginAPI(value)
      // 我们只需要token, 保存到上面的vuex中
      console.log('token??????', res)
      commit('SET_TOKEN', res.data)
      // 逻辑页面还在接收数组, 外面写成功/失败的逻辑, 所以这里要把数组返回出去
      // return到actions调用的地方(login/index.vue)
      return res
    } catch (err) {
      return Promise.reject(err)
    }
  },
  // {commit} 就是 { commit: context.commit } 也就是 local.commit
  async getUserInfoActions({ commit }) {
    // 解构赋值
    // 传入的数据中的data中含有很多信息 其大致如下
    // { data: userObj }={ data:{id:'121',name:'56'}}
    const { data: userObj } = await getUserProfileAPI() // 获取用户基本资料对象
    const userinfo = await getUserProfileAPI() // 获取用户基本资料对象
    // console.log('???jiaose', userObj.roles.menus)
    // console.log('userinfo@@@@@', userinfo)
    commit('SET_ID', userinfo.data.userId)

    const { data: photoObj } = await getUserPhotoAPI(userObj.userId) // 获取用户头像等
    const sss = await getUserPhotoAPI(userObj.userId)
    console.log('用户ID', userObj.userId)
    console.log('sss', sss)
    console.log('useo@@@@@', photoObj)
    const newObj = { ...userObj, ...photoObj }
    // commit('SET_USER', userObj) // 保存到vuex的userInfo对象里
    commit('SET_USER', newObj)
    // 将角色的权限返回出去
    return userObj.roles.menus
  },
  async logOutActions({ commit }) {
    commit('REMOVE_TOKEN')
    commit('REMOVE_ID')
    commit('RESET_STATE')
    resetRouter()
  }

}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

