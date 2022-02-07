<script setup>
    import {ref} from 'vue';

    defineProps({
        urlElement: {
            type: String,
            required: true
        }
    })

    const banWord = ["created", "edited", "url", "opening_crawl"];

    async function getApiData(url){
        let reponse = await fetch(url);
        let data = await reponse.json();
        return data.result;
    }

</script>

<template>
    <div class="main">
        <img src="./icon/IconEcosystem.vue">
        <div class="data">
            <h1 v-for="(item, index) in getApiData(url)" :key="item">
                <template v-if="!(item in banWord)">
                    <h1>{{ index }}:</h1>
                    <dir v-if="(typeof item) == 'object' && index != 'films'">
                        
                    </dir>
                </template>
            </h1>
        </div>
    </div>
</template>


<style scoped>
.main{
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