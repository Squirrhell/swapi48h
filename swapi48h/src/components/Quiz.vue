<script setup>
import { ref } from 'vue';
import store from "../store.js";
import QuizAnswers from "./QuizAnswer.vue";

import questionsJSON from "../assets/questions.json"

// const props = defineProps({

// })

store.commit("throwQuestionQuiz") //appel la "fonction" dans mutations du store

//actualQuestion.value pour recup une valeur

const actualQuestion = ref('This is the question?');
const numberOfQuestions = ref(10);
const numberOfActualQuestion = ref(0);
const pickedAnswer = ref('');
const numberOfPossibleAnswer = ref(4);

const newQuestion = {
    question: 'laQuestion',
    answers: ['reponse1','reponse2','reponse3','reponse4'],
    correctAnswer: 0, //en fonciton de R
    answer: 0, //reponse de la personne
}

// const newQuestion = new Vue({
//     data: {
//         question: 'laQuestion',
//         answers: ['reponse1','reponse2','reponse3','reponse4'],
//         correctAnswer: 0, //en fonciton de R
//         answer: 0, //reponse de la personne  
//     }
// })

function validateQuestion(indexOfChosenAnswer) {
    // console.log(newQuestion.question);

    // newQuestion.question = "HELLO BITCH";
    // console.log(newQuestion.question);

    console.log(indexOfChosenAnswer)
    newQuestion.answer = indexOfChosenAnswer; //on ajoute à "answer", l'index de la réponse choisi par l'utilisateur
    store.commit("addQuestionQuiz", newQuestion) // et on ajoute l'objet, au tableau d'objet du quiz.

    generateNewQuestion();

    console.log(newQuestion.answers[1]);
}

async function generateNewQuestion() {

    let randomQuestionID = Math.floor(Math.random() * questionsJSON.length)

    
    console.log(questionsJSON[randomQuestionID].question)

    // let questionFormat = getElementForQuestion(questionsJSON[randomQuestionID].missingWordType, questionsJSON[randomQuestionID].answerKey, questionsJSON[randomQuestionID].typeOfAnswer)
    let questionFormat = await getNewQuestionElements(questionsJSON[randomQuestionID].missingWordCategory, questionsJSON[randomQuestionID].missingWordType, questionsJSON[randomQuestionID].answerKey)

    newQuestion.question = questionsJSON[randomQuestionID].question + questionFormat.missingWordInQuestion;
    newQuestion.answers = questionFormat.finalAnswers;
    newQuestion.correctAnswer = questionFormat.rightAnswerIndex;

    // this.$set(this.$newQuestion, 'question', questionsJSON[randomQuestionID].question + questionFormat.missingWordInQuestion);
    // this.$set(this.$newQuestion, 'answers', questionFormat.finalAnswers);
    // this.$set(this.$newQuestion, 'correctAnswer', questionFormat.rightAnswerIndex);
}

async function getNewQuestionElements(missingWordCategory, missingWordType, answerKey) { //voir s'il y a deja une fonction comme celle-ci quelque part.
    const option = {
        method: "GET",
    };

    const allDataTheme = ref(""); //voir si on peut récupérer juste la valeur de la taille dans le store (pour éviter le rappel d'API ?)

    //Données d'une catégorie d'élément (celle mise dans missingWordType)
    const urlData = `https://swapi.dev/api/${missingWordCategory}`;
    const response = await fetch(urlData, option)
    if(response.status == 200) {
        const data = await response.json();
        allDataTheme.value = data;
    }
    
    //Nombre random entre 0 et le nombre de valeur dans une catégorie
    let randomRightID = Math.floor(Math.random() * allDataTheme.value.count);

    const missingWordInQuestion = await getCorrespondingInfo(urlData+`/${randomRightID}`, missingWordType)
    const rightAnswer = await getCorrespondingInfo(urlData+`/${randomRightID}`, answerKey);
    const wrongAnswers = [];
    
    //Boucle sur le nombre de réponse fausse que l'on veut ajouter au réponse possible.
    for(let i = 0; i < numberOfPossibleAnswer.value; i++) {
        console.log(i);
        let randomWrongID = Math.floor(Math.random() * allDataTheme.value.count);
        wrongAnswers.push(await getCorrespondingInfo(urlData+`/${randomWrongID}`, answerKey));
    }

    const finalAnswers = randomizeAnswer(rightAnswer, wrongAnswers);

    const newQuestionElements = {
        missingWordInQuestion: missingWordInQuestion,
        finalAnswers: finalAnswers,
        rightAnswerIndex: finalAnswers.indexOf(rightAnswer)
    }

    return newQuestionElements;

    // //Données d'un élément (récupérer via l'ID qui correspond au nombre aléatoire au dessus)
    // const responseOfID = await fetch(urlData+`/${randomID}`, option)
    // if(responseOfID.status == 200) {
    //     const data = await responseOfID.json();
    //     dataOfID.value = data;
    // }

    // console.log(dataOfID.value[answerKey])
    // //Rajouter une condition : si c'est une adresse URL
    // //Données de la réponse (récupérer via l'URL qui se trouvait dans l'adresse)
    // const responseForAnswer = await fetch(dataOfID.value[answerKey], option)
    // if(responseForAnswer.status == 200) {
    //     const data = await responseForAnswer.json();
    //     dataForAnswer.value = data;
    // }

    // console.log(dataForAnswer.value.name)



}

async function getCorrespondingInfo(urlToGet, keyOfElement) {
    const option = {
        method: "GET",
    };
    //Données d'un élément (récupérer via l'ID qui correspond au nombre aléatoire au dessus)
    const response = await fetch(urlToGet, option);
    const element = ref("");
    if(response.status == 200) {
        const data = await response.json();
        element.value = data;
    }
    // console.log(urlToGet+ " " +element.value[keyOfElement]);

    if(element.value[keyOfElement].match(/^https:\/\/swapi\.dev\/api\//g)) {
       return getCorrespondingInfo(element.value[keyOfElement], "name");
    } else {
        return element.value[keyOfElement];
    }
}

function randomizeAnswer(rightAnswer, wrongAnswers) {
    let finalAnswersArray = wrongAnswers.concat(rightAnswer);
    finalAnswersArray.sort(()=> Math.random() - 0.5);
    return finalAnswersArray;
}

</script>

<template>
    <div v-if="numberOfActualQuestion+1 < numberOfQuestions" class="quiz">
        <h1>QUIZ</h1>
        <h2>{{ numberOfActualQuestion+1 }} / {{ numberOfQuestions }}</h2>
        <h2>{{ newQuestion.question }}</h2>
        <div class="answer">
            <!-- <div class="answer-element">
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
            </div>   -->

            <!-- <div v-for="answer in store.state.listQuiz[numberOfActualQuestion].answers" :key="answer.id" class="answer-element">
                <input type="radio" id="choice4" name="quiz-answer" value="{{ answer }}"> 
                <label for="{{ answer }}">{{ answer }}</label>
            </div>
            <button class="button-validate" @click="validateQuestion()">Validate</button> -->

            <div v-for="(answer, index) in newQuestion.answers" :key="index" class="answer-element">
                <input type="radio" name="quiz-answer" :value="index" v-model="pickedAnswer"> 
                <label :for="index">{{ answer }}</label>
            </div>
            <button class="button-validate" @click="validateQuestion(pickedAnswer)">Validate</button>
        </div>     
    </div>
    <QuizAnswer v-else/>
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