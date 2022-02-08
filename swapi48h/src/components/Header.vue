<script setup>
defineProps({

})
const liste = ["Planets", "Spaceships", "Vehicles", "People", "Films", "Species"];
</script>

<template>
<body>  
    <div class="Header">
        <div class="burgerDiv">
            <img class="menuBurger" src="image/menu.png" alt="">
                <div class="menu">        
                    <ul>
                        <li v-for="element in liste" :key="element">
                            <a class="menuLien" href="">{{element}}</a> 
                        </li>
                        <li>
                            <a class="menuLien" href="">Quiz</a> 
                        </li>
                    </ul>
                </div>
        </div> 
        <div class="divLogo">
            <a class="lienLogo" href="">
                <img class="logo" src="image/alijabba.png" alt="">
            </a>
        </div>
    </div>
</body>
</template>

<style scoped>
body {
    margin: 0px;
    bottom: 0px;
    /*background-color: #182840;*/
    width: 100%;
    height: 100%;
}

.burgerDiv {
    width: 50px;
    height: 50px;
    border-radius: 30px;
    background-color: #FFF000;
    margin-left: 10px;
    margin-top: 15px;
}

.menuBurger {
    width:  50px;
}

li {
    font-size: 35px;
    list-style: none;
    line-height: 70px;
    visibility: hidden;
    opacity: 0;
    transition: 0.5s;
}

.menuLien {
    color: #182840;
    text-decoration: none;
    visibility: hidden;
    font-family: Arial, Helvetica, sans-serif;
    opacity: 0;
    transition: 0.5s;
}

.burgerDiv:hover .menuLien {
    color: #182840;
    visibility: visible;
    font-family: Arial, Helvetica, sans-serif;
    opacity: 1;
    transition: 0.5s;
}

.menu {
    position: fixed;
    left: 0px;
    bottom: 0px;
    background-color: #FFF000;
    height: 100%;
    width: 240px;
    opacity: 0;
    visibility: hidden;
    transition: 0.5s;
    box-shadow: rgba(12,43, 30, 0.2) 0 5px 14px;
}

.burgerDiv:hover .menu{
    position: fixed;
    opacity: 1;
    visibility: visible;
    left: 0px;
    bottom: 0px;
    background-color: #FFF000;
    height: 100%;
    width: 240px;
    transition: 0.5s;

}

.burgerDiv:hover li {
    font-size: 35px;
    list-style: none;
    line-height: 70px;
    visibility: visible;
    opacity: 1;
    transition: 0.5s;
}

.logo {
    position: fixed;
    
    top: 30px;
    width: 233.75px;
    height: 41.25px;
    /*934
    165*/
}

.divLogo {
    width: 233.75px;
    float: right;
}


.Header {
    background-color: #182840;
    width: 100%;
    height: 5em;
    position: fixed;
    margin-top: -6em;
    z-index: -7;
}

</style>
