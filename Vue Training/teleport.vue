/* Teleport一般被翻译成瞬间移动组件,实际上是不好理解的.我们可以把他理解成"独立组件",
他可以让你写的组件挂载到任何你想挂载的DOM上,所以是很自由很独立的
以一个例子来看:一个弹窗组件 */


<template>
    <teleport to="#modal">  // to属性挂载节点
      <div id="center" v-if="isOpen">
        <h2><slot>this is a modal</slot></h2>
        <button @click="buttonClick">Close</button>
      </div>
    </teleport>
    </template>
    <script lang="ts">
    
    export default {
      props: {
        isOpen: Boolean,
      },
      emits: {
        'close-modal': null
      },
      setup(props, context) {
        const buttonClick = () => {
          context.emit('close-modal')
        }
        return {
          buttonClick
        }
      }
    }
    </script>
    <style>
      #center {
        width: 200px;
        height: 200px;
        border: 2px solid black;
        background: white;
        position: fixed;
        left: 50%;
        top: 50%;
        margin-left: -100px;
        margin-top: -100px;
      }
    </style>
    
    