// Vue2 
import Vue from  vue 
 
Vue.nextTick(() => {
  // 一些和DOM有关的东西
})

// Vue3
import { nextTick } from  vue 
 
nextTick(() => {
  // 一些和DOM有关的东西
})

/* 通过这一更改，只要模块绑定器支持tree-shaking，则 Vue 应用程序中未使用的api将从最终的捆绑包中消除，获得最佳文件大小。受此更改影响的全局API有如下。

Vue.nextTick

Vue.observable （用 Vue.reactive 替换）

Vue.version

Vue.compile （仅全构建）

Vue.set （仅兼容构建）

Vue.delete （仅兼容构建）*/