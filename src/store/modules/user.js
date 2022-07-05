import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { constantRoutes, dynamicRoutes,errRouter,resetRouter } from '@/router'
import router from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '', //头像
    menuBar:constantRoutes||[] //菜单栏展示路由数据
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // 登录
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    const result = await login({ username: username.trim(), password: password })
    if (result.code == 20000) {
      commit('SET_TOKEN', result.data.token)
      setToken(result.data.token)
    } else {
      return Promise.reject(new Error(result.message))
    }
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('验证失败，请重新登录')
        }
        const { name, avatar } = data
        commit('SET_NAME', name)

        // if (!sessionStorage.getItem('router')) {
          router.addRoutes(dynamicRoutes.concat(errRouter))//添加动态路由
          state.menuBar = constantRoutes.concat(dynamicRoutes,errRouter)// 更新菜单栏展示数据
          // sessionStorage.setItem('router',JSON.stringify(state.menuBar)) //本地存储路由，解决刷新404问题
        // }else{
        //   router.addRoutes(errRouter)
        // }

        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 退出登录
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // 删除token
        resetRouter() // 重置路由
        commit('RESET_STATE')//清除仓库用户信息
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 删除 token (permission.js 路由守卫)
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // 删除token
      commit('RESET_STATE')//清除仓库用户信息
      resolve()
    })
  }
}

export default {
  namespaced: true,//namespaced: true 的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接。
  state,
  mutations,
  actions
}

