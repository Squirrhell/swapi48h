<script setup>
import { ref } from 'vue';
import store from "../store.js";
import QuizAnswer from "./QuizAnswer.vue";

import questionsJSON from "../assets/questions.json"

// const props = defineProps({

// })

store.commit("throwQuestionQuiz") //appel la "fonction" dans mutations du store

//actualQuestion.value pour recup une valeur
const isLoading = ref(false);
const actualQuestion = ref('This is the question?');
const numberOfQuestions = ref(10);
let numberOfActualQuestion = ref(0);
const pickedAnswer = ref('');
const numberOfPossibleAnswer = ref(3);

const newQuestion = {
    question: ref(''),
    answers: ref(['reponse1','reponse2','reponse3','reponse4']),
    correctAnswer: ref(0), //en fonciton de R
    answer: ref(0), //reponse de la personne
}

validateQuestion();

async function validateQuestion(indexOfChosenAnswer) {
    isLoading.value = true;

    console.log(indexOfChosenAnswer)
    newQuestion.answer = indexOfChosenAnswer; //on ajoute à "answer", l'index de la réponse choisi par l'utilisateur

    let finalNewQuestion = {
        question: newQuestion.question.value,
        answers: newQuestion.answers.value,
        correctAnswer: newQuestion.correctAnswer.value,
        answer: newQuestion.answer
    }

    store.commit("addQuestionQuiz", finalNewQuestion) // et on ajoute l'objet, au tableau d'objet du quiz.

    await generateNewQuestion();

    console.log(store.state.listQuiz)

    console.log(newQuestion.answers[1]);

    numberOfActualQuestion.value += 1;

    isLoading.value = false;
}

async function generateNewQuestion() {

    let randomQuestionID = Math.floor(Math.random() * questionsJSON.length)

    
    console.log(questionsJSON[randomQuestionID].question)

    let questionFormat = await getNewQuestionElements(questionsJSON[randomQuestionID].missingWordCategory, questionsJSON[randomQuestionID].missingWordType, questionsJSON[randomQuestionID].answerKey)

    newQuestion.question.value = questionsJSON[randomQuestionID].question + questionFormat.missingWordInQuestion;
    newQuestion.answers.value = questionFormat.finalAnswers;
    newQuestion.correctAnswer.value = questionFormat.rightAnswerIndex;
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
    // let randomRightID = Math.floor(Math.random() * allDataTheme.value.count);
    //------------------
    //ca risque de planter, certaines entrées sont vides (ex: vehicles/1, le premier est le 4 puis ça passe à 11)

    // const missingWordInQuestion = await getCorrespondingInfo(urlData+`/${randomRightID}`, missingWordType)
    // const rightAnswer = await getCorrespondingInfo(urlData+`/${randomRightID}`, answerKey);
    const [missingWordInQuestion, rightAnswer] = await getCorrespondingInfo(urlData, allDataTheme.value.count, missingWordType, answerKey)
    const wrongAnswers = [];
    
    //Boucle sur le nombre de réponse fausse que l'on veut ajouter au réponse possible.
    for(let i = 0; i < numberOfPossibleAnswer.value; i++) {
        console.log(i);
        // let randomWrongID = Math.floor(Math.random() * allDataTheme.value.count);
        wrongAnswers.push(...await getCorrespondingInfo(urlData, allDataTheme.value.count, answerKey));
    }

    const finalAnswers = randomizeAnswer(rightAnswer, wrongAnswers);

    const newQuestionElements = {
        missingWordInQuestion: missingWordInQuestion,
        finalAnswers: finalAnswers,
        rightAnswerIndex: finalAnswers.indexOf(rightAnswer)
    }

    return newQuestionElements;
}

async function getCorrespondingInfo(urlToGet, nbrOfElements, ...keysOfElement) {
    let newUrlToGet = '';
    if(!urlToGet.match(/[1-9]/g)) {
        let newRandomID = Math.floor(Math.random() * nbrOfElements);
        newUrlToGet = `${urlToGet}/${newRandomID}`; 
    } else {
       newUrlToGet = urlToGet; 
    }


    const option = {
        method: "GET",
    };
    //Données d'un élément (récupérer via l'ID qui correspond au nombre aléatoire au dessus)
    const response = await fetch(newUrlToGet, option);
    const element = ref("");
    if(response.status == 200) {
        const data = await response.json();
        element.value = data;
    } else {
        return getCorrespondingInfo(urlToGet, nbrOfElements, keysOfElement)
    }

    let finalValues = [];

    for(let key of keysOfElement) {
        if(element.value[key].match(/^https:\/\/swapi\.dev\/api\//g)) {
           finalValues.push(...await getCorrespondingInfo(element.value[key], nbrOfElements, "name"));
        } else {
            finalValues.push(element.value[key]);
        }
    }

    return finalValues;

}

function randomizeAnswer(rightAnswer, wrongAnswers) {
    let finalAnswersArray = wrongAnswers.concat(rightAnswer);
    finalAnswersArray.sort(()=> Math.random() - 0.5);
    return finalAnswersArray;
}

</script>

<template>
    <div v-if="isLoading" class="quiz">
        <h1>QUIZ</h1>
        <h2>Is Loading...</h2>
    </div>
    <div v-else-if="numberOfActualQuestion < numberOfQuestions" class="quiz">
        <h1>QUIZ</h1>
        <h2>{{ numberOfActualQuestion }} / {{ numberOfQuestions }}</h2>
        <h2>{{ newQuestion.question.value }}</h2>
        <div class="answer">
            <div v-for="(answer, index) in newQuestion.answers.value" :key="index" class="answer-element">
                <input type="radio" name="quiz-answer" :value="index" v-model="pickedAnswer"> 
                <label :for="index">{{ answer }}</label>
            </div>
        </div>  
        <button class="button-validate" @click="validateQuestion(pickedAnswer)">Validate</button>
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
    color: var(--second-yellow);
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