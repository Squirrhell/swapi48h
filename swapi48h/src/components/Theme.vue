<script setup> 
import store from '../store'
import { ref, watch } from 'vue';
    const elements = ref([]);
    async function getDataFromTheme() {
        let next;
        elements.value = [];
        const option = {
            method: "GET",
        };
        next = 'https://swapi.dev/api/'+store.state.selectedTheme;
        while(next){
            const response = await fetch(next, option);
            if(response.status == 200) {
                response.json().then(data => {
                    elements.value.concat(data.results); 
                    next = data.next;
            });
        }
    }
}
watch(() => store.state.selectedTheme, () => {getDataFromTheme()})
</script>


<template>
</template>


<style scoped>
</style>