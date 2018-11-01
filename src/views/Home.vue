<template>
  <div class="home">
    <div>{{localComputed}}</div>
    <!-- <div>{{isLogin}}</div> -->
    <div>登陆状态:{{isNotLogin?'未登陆':'已登陆'}}
      <p>
        <button @click="login">登陆</button>
        <button @click="loginAsync">异步登陆</button>
      </p>
    </div>
    <!-- <div>{{isNotLoginAlias?'未登陆':'已登陆'}}
        <p>计算属性别名并不会更新，只是一个副本</p>
    </div> -->
    <div>{{countAlias}}</div>
    <div>
      <ul>
        <li v-for="(user,index) in adults" :key="index">
          {{user.name}}:{{user.age}}
        </li>
      </ul>
    </div>
    <div>{{getUserById(1)}}</div>
    <div>
        <p>count:{{count}}</p>
        <p>
         <button @click="changeCount">增加10</button>
        </p>
        <p>
        设置减量:<input type="text" v-model="reduceSize" >
        <button @click="reduceCount">减少</button>
        <button @click="reduceCountAsync">异步减少</button>
       </p>
    </div>
    <div>
     <p>测试action组合</p>
     <p>{{currentUser}}</p>
     <button @click="testActionGroup">点击</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

// mapState 用于协助我们将仓库中的状态转换成计算属性
import { mapState } from 'vuex'

export default {
  name: 'home',
  data () {
    return {
      reduceSize: 2
    }
  },
  components: {
    HelloWorld
  },
  methods: {
    // 无参提交mutation
    login () {
      this.$store.commit('changeLoginState')
    },
    // 提交mutations的一种写法,附带参数,不推荐这样写
    changeCount () {
      this.$store.commit('changeCount', 10)
    },
    // 提交mutations的另一种写法 推荐
    reduceCount () {
      this.$store.commit({
        type: 'reduceCount',
        reduceSize: this.reduceSize
      })
    },
    loginAsync () {
      this.$store.dispatch('loginAsync')
    },
    reduceCountAsync () {
      this.$store.dispatch({
        type: 'reduceCountAsync',
        reduceSize: this.reduceSize
      })
    },
    testActionGroup () {
      this.$store.dispatch({
        type: 'actionB',
        index: 1
      })
    }
  },
  computed: {
    localComputed () { return `this is local computed` },
    // 获取getters中的属性
    adults () {
      return this.$store.getters.getAdults
    },
    // 获取getters里的方法
    getUserById () {
      return this.$store.getters.getUserById
    },

    // 利用对象展开运算符将仓库中的状态混入到本地计算属性
    // ...mapState(['isLogin'])      计算属性的名称与state存储的状态名相同时可以使用一个数组参数

    ...mapState({
      count: 'count',
      isNotLogin: (state) => !state.isLogin,
      countAlias: 'count',
      currentUser: 'currentUser'
    })
  }
}
</script>

<style scope>
  div{
    border: 1px solid;
    margin: 20px;
    border-radius: 20px;
    padding: 20px;
  }
</style>
