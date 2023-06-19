
// 在app.vue中使用的时候跟普通组件调用是一样的

<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js App" />
        <HooksDemo></HooksDemo>
        <button @click="openModal">Open Modal</button><br />
        <modal :isOpen="modalIsOpen" @close-modal="onModalClose"> My Modal !!!!</modal> // 调用modal组件
    </div>
</template>
<script>
import HelloWorld from './components/HelloWorld.vue'
import HooksDemo from './components/HooksDemo.vue'
import Modal from './components/Modal.vue'
import { ref } from 'vue'
export default {
    name: 'App',
    components: {
        HelloWorld,
        HooksDemo,
        Modal
    },
    setup() {
        const modalIsOpen = ref(false)
        const openModal = () => {
            modalIsOpen.value = true
        }
        const onModalClose = () => {
            modalIsOpen.value = false
        }
        return {
            modalIsOpen,
            openModal,
            onModalClose
        }
    }
}
</script>
    
<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
    
    
    