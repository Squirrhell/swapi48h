<script setup>
defineProps({
})
</script>

<template>
<body>

    <div class="home">
        <h1 class="title" > Alijabba </h1>
        <h4 class="description" > Description mais je sais pas quoi mettre </h4>
        <div class="Button">
            <a class="boutonQuiz" href=""> Quiz </a>
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
    margin-top: 2em;
    background-color: #FFF000;
    width: 6.5em;
    height: 4em;
    border-radius: 10px;
    text-align: center;
    transition: 0.5s;
    margin: auto;
}
.Button:hover {
    box-shadow: rgba(43, 12, 42, 0.2) 0 5px 14px;
    width: 7em;
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
    color: #EEEEEE;
    font-family: Arial, Helvetica, sans-serif;
}

html {
    background-color: #182840;
}
</style>