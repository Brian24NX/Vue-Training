// vue3
<script setup>     
import { onMounted } from vue 
import { onUpdated, ref} from vue

const count = ref(0)
console.log(count.value)



onMounted(() => {
  //....
});

onMounted(() => {
  //....
});

// Logic completion can be resolved by dissecting multiple onMounted, follows as an order without coverage.

onUpdated(() => {
  //....
})
</script>

// vue2
<script>     
   export default {         
      mounted() {             
        // ....     
      },           
   }
</script> 
 