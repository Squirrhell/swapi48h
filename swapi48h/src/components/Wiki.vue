<script setup>
    import {computed, ref} from 'vue';
    import store from '../store.js';

    const props = defineProps({
        urlElement: {
            //type: String,
            //required: true
        }
    });
    
    const urlElement = store.state.selectedItem;
    const banWord = ["created", "edited", "url", "opening_crawl"];
    const varData = ref(null);
    
    async function getApiData(url){
        
        const response = await fetch(url);
        if(response.status == 200){
            response.json().then(async data => {
                console.log(data);
                varData.value = await formatData(data);
            });
        }
        //return {};
    }

    getApiData(urlElement);

    async function callAPI(url, index){

        let temp;

        const response = await fetch(url);
        
        if(response.status == 200){
            response.json().then(data => {
              
                if(index != 'films'){
                    temp = data.name;
                      
                } else {
                    temp = data.title;
                }
                console.log(temp)
                return temp;
            });
        }
    }

    async function formatData(data) {
        let formatedVarData = {};
        //console.log(Object.entries(varData.value))

        for (let [index, element] of Object.entries(data)){
            let temp;

            //console.log(element);

            const regex = '^https:\/\/swapi\.dev\/api\/';
            if(Array.isArray(element)){
                temp = [];
                for(let el of element){
                    console.log(index)
                    let t=await callAPI(el, index)
                     temp.push(t);
              
                }
                console.log(element);
            } else {
                if(typeof element == "string" && element.search(regex) != -1){
                    temp = await callAPI(element, index);
                    console.log(element); 
                    console.log( await callAPI(element, index))
                }else{
                    temp = element;
                    console.log(element);
                }     
            }

         
            formatedVarData[index] = await temp;
        }
        return formatedVarData;
    }
</script>

<template>
    <table>
        <th>
            <div class="vador">
                <img class="vadorr" src="../../image/vador.png" alt="">
            </div>
        </th>
        <th>
<div class="yoda">
    <img class="yodaa" src="../../image/yoda.png" alt="">
</div></th>
    <div class="wiki">
    <div v-for="(item, index) in varData" :key="item">
        <tr v-if="!(banWord.includes(index))">
            <td>{{ index }}:</td><th> {{ item ? item:'' }}</th></tr>
    </div>
    </div>
    </table>
</template>


<style scoped>
.yodaa{
    margin-right: 100%;
}
.wiki{
    font-family:Georgia, serif;
    width: 20em;
    height: auto;
    font-size: 1.5em;
    border:1px;
    border-style:dotted;
    border-color:black;
    margin-left: 40%;
    z-index: -1;
    margin-top: 5em;
}
template {
    background-color: aquamarine;
    margin: 0%;
    padding: 0%;
}
img {
    position: absolute;
    width: 500px;
    height: 500px;
    left: 68%;
    top: 20%;
}
</style>