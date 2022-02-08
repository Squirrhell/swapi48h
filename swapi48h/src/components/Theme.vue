<script setup> 
<<<<<<< HEAD
 import store from '../store.js'
    import { ref, watch } from 'vue';
    const elements = ref([]);
    let listEl = [];
    async function getDataFromTheme(next) {
        const option = {
            method: "GET",
        };
=======
    import store from '../store.js'
    import { ref, watch } from 'vue';

    const elements = ref([]);
    let listEl = [];

    async function getDataFromTheme(next) {

        const option = {
            method: "GET",
        };

>>>>>>> 344134f5c46ab0132690ad67bb11ff0939525391
        const response = await fetch(next, option);
        if(response.status == 200) {
            response.json().then(data => {
                listEl = listEl.concat(data.results); 
                if(data.next){
                    getDataFromTheme(data.next);
                }
                elements.value = listEl;
<<<<<<< HEAD
=======

>>>>>>> 344134f5c46ab0132690ad67bb11ff0939525391
            });
        }
        //await console.log(element.value);
    }
<<<<<<< HEAD
    watch(() => store.state.selectedTheme, () => {getDataFromTheme('https://swapi.dev/api/'+store.state.selectedTheme)})
    getDataFromTheme('https://swapi.dev/api/'+store.state.selectedTheme);
=======

    watch(() => store.state.selectedTheme, () => {getDataFromTheme('https://swapi.dev/api/'+store.state.selectedTheme)})
    getDataFromTheme('https://swapi.dev/api/'+store.state.selectedTheme);

>>>>>>> 344134f5c46ab0132690ad67bb11ff0939525391
</script>


<template>
<div class="theme">
    <h1> {{store.state.selectedTheme}}:</h1>
</div>
    <div class="element">
    <ul>
    <template v-for ="element in elements" :key="element">
        <li v-if="store.state.selectedTheme == film">{{ element.title }}</li>
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