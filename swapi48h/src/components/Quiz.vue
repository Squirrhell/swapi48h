<script setup>
const props = defineProps({

})
const actualQuestion = ref('');
const numberOfQuestions = ref(10);
const numberOfActualQuestion = ref(1);

</script>

<template>
    <div>
        <h1>QUIZ</h1>
        <h2>?/?</h2>
        <h2>Question ?</h2>
        <div class="answer">
            <input type="radio" id="choice1" value="answer1">     
            <input type="radio" id="choice2" value="answer2">     
            <input type="radio" id="choice3" value="answer3">     
            <input type="radio" id="choice4" value="answer4">  
        </div>
        <button>Validate</button>
    </div>
</template>

<style scoped>

</style>