// Vue2
export default {
    props: {
      title: String
    },
    data () {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      login () {
        // 登陆方法
      }
    },
    components:{
              "buttonComponent":btnComponent
          },
    computed:{
        fullName(){
          return this.firstName+" "+this.lastName;     
        }
  }
},

// Vue3
// 旧的选项型API在代码里分割了不同的属性: data,computed属性，methods，等等。
// 新的合成型API能让我们用方法（function）来分割，相比于旧的API使用属性来分组，这样代码会更加简便和整洁。
/ export default {
  props: {
    title: String
  },
  
  setup () {
    const state = reactive({ //数据
      username: '',
      password: '',
      lowerCaseUsername: computed(() => state.username.toLowerCase()) //计算属性
    })
     //方法
    const login = () => {
      // 登陆方法
    }
    return { 
      login,
      state
    }
  }
},



  
  