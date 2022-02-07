<script setup>
import { ref } from 'vue';

const props = defineProps({

})
const actualQuestion = ref('This is the question?');
const numberOfQuestions = ref(10);
const numberOfActualQuestion = ref(1);

</script>

<template>
    <div class="quiz">
        <h1>QUIZ</h1>
        <h2>{{ numberOfActualQuestion }} / {{ numberOfQuestions }}</h2>
        <h2>{{ actualQuestion }}</h2>
        <form class="answer">
            <div class="answer-element">
                <input type="radio" id="choice1" name="quiz-answer" value="answer1">
                <label for="answer1">Answer 1</label>   
            </div>
            <div class="answer-element">
                <input type="radio" id="choice2" name="quiz-answer" value="answer2">   
                <label for="answer2">Answer 2</label>    
            </div>
            <div class="answer-element">
                <input type="radio" id="choice3" name="quiz-answer" value="answer3">
                <label for="answer3">Answer 3</label>  
            </div>
            <div class="answer-element">
                <input type="radio" id="choice4" name="quiz-answer" value="answer4"> 
                <label for="answer4">Answer 4</label>
            </div>  
        </form>
        <button class="button-validate">Validate</button>
    </div>
</template>

<style scoped>
div.quiz { 
    font-family: 'Montserrat';
    color: var(--main-dark-blue);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.answer-element label {
    font-size: 24px;
}

.answer-element {
    transition: all 0.5s ease-in-out;
}

.answer-element:hover {
    color: var(--main-yellow);
}

.button-validate {
    transition: all 0.5s ease-in-out;
    border: none;
    border-radius: 20px;
    padding: 5px;
    background: var(--main-dark-blue);
    color: var(--main-gray);
    font-size: 20px;
}

.button-validate:hover {
    color: var(--main-dark-blue);
    background: var(--main-yellow);
}

</style>