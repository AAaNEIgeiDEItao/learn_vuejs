import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 状态
  state: {
    isLogin: false,
    users: [
      {
        id: 0,
        username: 'jwy',
        age: 23
      },
      {
        id: 1,
        name: 'zq',
        age: 30
      },
      {
        id: 2,
        name: 'ljm',
        age: 3
      }
    ],
    count: 0

  },
  // 如果你要改变store中的状态，请在mutations的定义那些方法，然后在组件中使用store实例的commit(mutations)调用
  mutations: {
    changeLoginState (state) {
      state.isLogin = !state.isLogin
    },
    changeCount (state, num) {
      state.count += num
    }
  },
  actions: {

  },

  // getters:存放派生出的属性和方法
  getters: {
    // 通过属性访问
    getAdults: state => {
      return state.users.filter(user => user.age > 18)
    },

    // 通过方法访问
    getUserById: state => id => state.users.find(user => user.id === id)
  }
})
