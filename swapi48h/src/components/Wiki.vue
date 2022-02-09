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
    const varData = ref({});
    const oui = ref([]);
    
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
                //console.log(temp)
                oui.value.push(temp)
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
                    //console.log(index)
                    let t=await callAPI(el, index)
                     temp.push(t);
              
                }
                //console.log(element);
            } else {
                if(typeof element == "string" && element.search(regex) != -1){
                    temp = await callAPI(element, index);
                    //console.log(element); 
                    //console.log( await callAPI(element, index))
                }else{
                    temp = element;
                    //console.log(element);
                }     
            }

         
            formatedVarData[index] = await temp;
        }
        return formatedVarData;
    }

    const gruge = computed (() => {
        let formatedVarData = {};
        let ii = 0;
        for (let [index, element] of Object.entries(varData.value)){
            
            let temp;
            //console.log('oui')
            //console.log(element);
            if(typeof element == 'object'){
                temp = [];
                console.log('object')
                element = JSON.parse(JSON.stringify(element))
                for(let el of element){
                    if(el === null){
                        console.log(oui.value[ii])
                        el = oui.value[ii];
                        ii++;
                        temp.push(el);
                    }              
                }
            } else {
                if(element === undefined){
                    console.log(oui.value[ii])
                    temp = oui.value[ii];
                    ii++;
                }else{
                    temp = element;
                }     
            }
            formatedVarData[index] = temp;
        }
        return formatedVarData;
    });


</script>

<template>
<div class="yoda">
    <img class="yoda" src="../../image/yoda.png">
</div>
    <table>
    <div class="wiki">
    <div v-for="(item, index) in varData" :key="item">
        <tr v-if="!(banWord.includes(index))">
            <td>{{ index }}:</td><th> {{ item ? item:'' }}</th></tr>
    </div>
    </div>
    </table>
</template>


<style scoped>

.wiki{
    font-family:Georgia, serif;
    width: 20em;
    height: auto;
    font-size: 1.5em;
    border:1px;
    border-style:dotted;
    border-color:black;
    margin-left: 120%;
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