// main.vue
// Case by mouse position
<template>
  <span>mouse position {{x}} {{y}}</span>
</template>
 
<script setup>
import { ref } from  vue ,
//import {useMousePosition} from ./useMousePosition,
 
const {x, y} = useMousePosition()

</script>