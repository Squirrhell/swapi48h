<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

defineProps({
})
</script>

<template>
<body>

    <div class="home">
        <img class="logo" src="image/alijabba.png">
        <p class="description" > L'équipe de AliJabba est fière de vous présenter le projet du Challenge 48h. </p>
        <div class="Button">
            <p class="boutonQuiz" @click="router.push('quiz')"> Quiz </p>
        </div>
        
    </div>
    
</body>  
    
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');
body {
    margin: 0px;
    bottom: 0px;
    background-color: #182840;
    width: 100%;
    height: 100vh;
    /* bot: 0px; */
    overflow: hidden;
}

.logo {
    height: 8em;
}
.home {
    margin-top: 15em;
    text-align: center;
}
.boutonQuiz {
    font-size: 3em;
    text-decoration: none;
    font-family: Arial, Helvetica, sans-serif;
    color: #182840;
    transition: 0.5s;
}
.Button {
    cursor: pointer;
    margin-top: 2em;
    width: 8em;
    height: 4em;
    background-color: #FFF000;
    border-radius: 2em;
    text-align: center;
    transition: 0.5s;
    margin: auto;
}
.Button:hover {
    box-shadow: rgba(43, 12, 42, 0.2) 0 5px 14px;
    width: 8.2em;
    height: 4.2em;
    transition: 0.5s;
}
.Button:hover a{
    transition: 0.5s;
    color: #182840;
}
.title {
    font-family: 'Montserrat';
    color :#FFF000;
    font-size: 4.5em;
}
.description {
    font-family: 'Montserrat';
    color: #EEEEEE;
}

html {
    background-color: #182840;
}
</style>