<script setup> 
    import store from '../store.js'
    import { ref, watch } from 'vue';

    const elements = ref([]);
    let listEl = [];

    async function getDataFromTheme(next) {

        const option = {
            method: "GET",
        };

        const response = await fetch(next, option);
        if(response.status == 200) {
            response.json().then(data => {
                listEl = listEl.concat(data.results); 
                if(data.next){
                    getDataFromTheme(data.next);
                }
                elements.value = listEl;

            });
        }
        //await console.log(element.value);
    }

    watch(() => store.state.selectedTheme, () => {getDataFromTheme('https://swapi.dev/api/'+store.state.selectedTheme)})
    getDataFromTheme('https://swapi.dev/api/'+store.state.selectedTheme);

</script>


<template>
</template>


<style scoped>
</style>