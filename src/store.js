import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// function test (timeout) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => resolve(timeout), timeout)
//   })
// }
export default new Vuex.Store({
  // state用于存储状态
  // 单一状态树
  state: {
    isLogin: false,
    users: [
      {
        id: 0,
        name: 'jwy',
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
    count: 0,
    currentUser: null
  },

  // 如果你要改变store中的状态，请在mutations的定义那些方法，然后在组件中使用store实例的commit(mutations)调用
  // mutation 都是同步操作
  // 大型开发中请用常量替代 Mutation 事件类型
  mutations: {
    changeLoginState (state) {
      state.isLogin = !state.isLogin
    },
    changeCount (state, num) {
      state.count += num
    },
    // 建议通过对象来传参
    reduceCount (state, payload) {
      state.count -= payload.reduceSize
    },

    // 测试异步用
    mutationA (state) {
      state.isLogin = true
    },
    mutationB (state, payload) {
      console.log(payload)
      state.currentUser = state.users[payload.index]
    }

  },

  // Action类似于mutation
  // Action提交的是mutation，而不是直接变更状态
  // Action可以包含任意异步操作
  actions: {
    reduceCountAsync ({ commit }, payload) {
      setTimeout(() => {
        commit('reduceCount', {
          reduceSize: payload.reduceSize
        })
      }, 1000)
    },
    loginAsync ({ commit }) {
      setTimeout(() => {
        commit('changeLoginState')
      }, 2000)
    }
    // 组合action
    // async actionA ({ commit }) {
    //   await test(3000)
    // },
    // async actionB ({ dispatch, commit }, payload) {
    //   await dispatch('actionA')
    //   await commit('mutationB', payload.index)
    // }
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
