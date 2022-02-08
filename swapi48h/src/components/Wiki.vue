<script setup>
    import {computed, ref} from 'vue';

    const props = defineProps({
        urlElement: {
            //type: String,
            //required: true
        }
    });
    
    const urlElement = "https://swapi.dev/api/people/1/";
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
                if(element.search(regex) != -1){
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

    <template v-for="(item, index) in varData" :key="item">
        <h1 v-if="!(banWord.includes(index))">{{ index }}: {{ item ? item:'' }}</h1>
    </template>
   <!-- 
     <div class="main">
        <div class="data">
            <h1 v-for="(item, index) in varData" :key="item">
                <template v-if="!(item in banWord)">
                    <h1>{{ index }}:</h1>
                    <dir v-if="(typeof item) == 'object' && index != 'films'">
                        <dir v-for="item in item" :key="item">{{ getApiData(item).name }}</dir>
                    </dir>
                    <dir v-else-if="(typeof item) == 'object' && index == 'films'"> 
                        <dir v-for="item in item" :key="item">{{ getApiData(item).title }}</dir>
                    </dir>
                    <dir v-else>{{ item }}</dir>
                </template>
            </h1>
        </div>
    </div> -->
</template>


<style scoped>
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