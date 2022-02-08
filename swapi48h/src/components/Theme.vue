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
    <div class="galaxie"> <img class="imageGalaxie" src="../../image/Galaxymap_p1.jpg" alt=""></div>
</template>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');
.theme{
    margin-left: 5em;
    margin-top: 2em;
    color: #182840 ;
    font-size: 3em;
    font-family: 'Montserrat';
}
.element{
    margin-top: -0.5em;
    margin-left: 14em;
    float: left;
    
}
li {
    list-style: none;
    color: #182840;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 2.5em;
}

.galaxie {
    float: right;
    margin-top: -6em;
    margin-left: 50em;
    position: fixed;
}

.imageGalaxie {
    border-radius: 30em;
    width: 30em;
    height: 30em;
}

</style>