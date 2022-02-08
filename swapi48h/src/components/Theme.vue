<script setup> 
    import { useRouter } from 'vue-router';
    import store from '../store.js'
    import { computed, ref, watch } from 'vue';

    const router = useRouter();

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

    function swapItem(item){
        store.commit('setSelectedItem', item);
        router.push('wiki');
    }


    watch(() => store.state.selectedTheme, () => {listEl=[];getDataFromTheme('https://swapi.dev/api/'+store.state.selectedTheme)})

    getDataFromTheme('https://swapi.dev/api/'+store.state.selectedTheme);
    const image = computed(() => {
        const list = ["planets", "spaceships", "vehicles", "people", "films", "species"];
        let index = list.findIndex( theme => theme === store.state.selectedTheme);
        console.log(index);
        index++;
        return index;
    })
</script>


<template>
<div class="theme">
    <h1> {{store.state.selectedTheme}}:</h1>
</div>
    <div class="element">
    <ul>
    <template v-for ="element in elements" :key="element">
        <li v-if="store.state.selectedTheme == 'film'" @click="swapItem(element.url)">{{ element.title }}</li>
        <li v-else @click="swapItem(element.url)">{{ element.name }}</li>
        
    </template>
    </ul>
    </div>
    <div class="galaxie"> 
        <img class="imageGalaxie" :src='"../../image/img"+image+".png"' alt="">
    </div>
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
    margin-top: -11em;
    margin-left: 43em;
    position: fixed;
}
.imageGalaxie {
    width: 49em;
    height: 37em;
}


@media screen and (max-width: 780px){
.imageGalaxie {
    width: 0%;
    height: 0%;
}

.theme{
    margin-left: 4em;
    margin-top: 3em;
    font-size: 2em;
}

.element{
    margin-top: -0.5em;
    margin-left: 8em;
    
}

}

@media screen and (max-width: 322px){

.imageGalaxie {
    width: 0%;
    height: 0%;
}

.theme{
    margin-left: 2em;
    margin-top: 3.5em;
    font-size: 1.5em;
}

.element{
    margin-top: -0.5em;
    margin-left: 2em;
    
}


}
</style>