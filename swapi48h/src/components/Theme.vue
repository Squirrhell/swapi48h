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
<div class="theme">
    <h1> {{store.state.selectedTheme}}:</h1>
</div>
    <div class="element">
    <ul>
    <template v-for ="element in elements" :key="element">
        <li v-if="store.state.selectedTheme == 'film'">{{ element.title }}</li>
        <li v-else>{{ element.name }}</li>
    </template>
    </ul>
    </div>
</template>


<style scoped>
.theme{
    left: 10em;
    position:absolute;
}
.element{
margin-top: 10em;
}
</style>