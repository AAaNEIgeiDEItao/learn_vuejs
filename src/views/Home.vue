<template>
  <div class="home">
    <div>{{localComputed}}</div>
    <!-- <div>{{isLogin}}</div> -->
    <div>登陆状态:{{isNotLogin?'未登陆':'已登陆'}}</div>
    <button @click="login">登陆</button>
    <div>{{isNotLoginAlias}}</div>
    <ul>
      <li v-for="(user,index) in adults" :key="index">
        {{user.name}}:{{user.age}}
      </li>
    </ul>
    <div>{{getUserById(1)}}</div>
    <div>
      <button @click="changeCount">+10</button>
      {{count}}
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
  components: {
    HelloWorld
  },
  methods: {
    login () {
      this.$store.commit('changeLoginState')
    },
    changeCount () {
      this.$store.commit('changeCount', 10)
    }
  },
  computed: {
    localComputed () { return `this is local computed` },

    // 获取getters里的方法
    getUserById () {
      return this.$store.getters.getUserById
    },

    // 利用对象展开运算符将仓库中的状态混入到本地计算属性
    // ...mapState(['isLogin'])      计算属性的名称与state存储的状态名相同时可以使用一个数组参数

    ...mapState({
      count: (state) => state.count,
      isNotLogin: (state) => !state.isLogin,
      isNotLoginAlias: 'isNotLogin',
      // 获取getters里的属性
      adults: 'getAdults'
    })
  }

}
</script>
