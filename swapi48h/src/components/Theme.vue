<script setup> 
new Vue({
    el: '#app',
    data () {
        return{
            info:null
        }
    },
    mounted (){
        axios
        .get('https://swapi.dev/api/')
        .then(reponse =>(this.info = reponse))
    }
})
</script>

<template>
<div id="app">
    {{ info }}
</div>

</template>


<style scoped>
</style>
