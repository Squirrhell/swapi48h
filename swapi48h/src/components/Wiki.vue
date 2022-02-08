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
    const varData = ref("");
    
    async function getApiData(url){
        
        const response = await fetch(url);
        if(response.status == 200){
            response.json().then(data => {
                console.log(data);
                varData.value = data;
            });
        }
        return {};
    }

    getApiData(urlElement);

    async function callAPI(url){

        let temp = ref("");

        const response = await fetch(url);
        if(response.status == 200){
            response.json().then(data => {
                console.log(data);
                temp.value = data;
                return temp;
            });
        }
    }

    const formatData = computed (() => {
        let formatedVarData = ref("");

        for (let [key, element] of varData.value){
            if(typeof element == "object" && key != "films" ){
                let emptyArray = [];
                for(let url in element){
                    emptyArray.push(callAPI(element).name);
                }
                formatedVarData.key.value = emptyArray;

            }else if (typeof element == 'object' && key == "films" ){
                let emptyArray = [];
                for(let url in element){
                    emptyArray.push(callAPI(url).title);
                }

                formatedVarData.key.value = emptyArray;
            }else if (element.match('^\https:\/\/+')){
                formatedVarData.key.value = callAPI(element).name;
            }else{
                formatedVarData.key.value = element
            }
        }
        console.log(formatedVarData)
    })

    console.log(formatData.value)
    

</script>

<template>

    <template v-for="(item, index) in formatedVarData" :key="item">
        <h1 v-if="!(banWord.includes(index))">{{ index }}: {{ item }}</h1>

    </template>
    <!--div class="main">
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
    </div-->
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