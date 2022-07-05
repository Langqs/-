import defaultSettings from '@/settings'

const { fixedHeader, sidebarLogo } = defaultSettings
const state = {
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo
}
//更改设置
const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,//namespaced: true 的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接
  state,
  mutations,
  actions
}

