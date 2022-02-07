<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
<body>  
    <div class="burgerDiv">
        <img class="menuBurger" src="image/menu.png" alt="">
    
    
        <div class="menu">
                    
            <ul>
                <li>
                    <a class="menuLien" href="/">Planets</a> 
                </li>
                <li>
                    <a class="menuLien" href="">Spaceships</a> 
                </li>
                <li>
                    <a class="menuLien" href="">Vehicles</a>  
                </li>
                <li>
                    <a class="menuLien" href="">People</a> 
                </li>
                <li>
                    <a class="menuLien" href="">Films</a> 
                </li>
                <li>
                    <a class="menuLien" href="">Species</a> 
                </li>
                <li>
                    <a class="menuLien" href="">Quiz</a> 
                </li>
            </ul>
        </div>
    </div> 
    <div>
        <a class="lienLogo" href="">
            <img class="logo" src="image/alijabba.png" alt="">
        </a>
    </div>
    </body>
</template>

<style scoped>
body {
    margin: 0px;
    bottom: 0px;
    background-color: #182840;
}

.burgerDiv {
    width: 50px;
    height: 50px;
    border-radius: 30px;
    background-color: #FFF000;
    margin-left: 15px;
    margin-top: 15px;
}

.menuBurger {
    width: 50px;
    height: 50px;

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
    height: 41.25;
    margin-left: 80%;
    /*934
    165*/
}

</style>
