// useMousePosition.js
import { ref, onMounted, onUnmounted } from  vue 
 
export default function useMousePosition() {
  let x = ref(0)
  let y = ref(0)
  
  function update(e) {
    x.value = e.pageX
    y.value = e.pageY
  }
  
  onMounted(() => {
    window.addEventListener( mousemove , update)
  })
  
  onUnmounted(() => {
    window.removeEventListener( mousemove , update)
  })
  
  return {
    x,
    y
  }
}
