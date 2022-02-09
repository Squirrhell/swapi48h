<script setup>
    import store from '../store.js';
    import {computed, ref} from 'vue';

    const props = defineProps({
    });

    const listTest = ref([
        {
            Q: "question",
            R: ["1","2","3","4"],
            C: 1,
            A: 1
        }
    ]);



</script>

<template>
    <div class="list-quiz-answer">
        <div v-for="question in store.state.listQuiz" class="quiz-answer">
        <!-- <div v-for="question in listTest"> -->
            <h2>{{ question.question }}</h2>
            <div class="answers">
                <template v-for="(reponse, index) in question.answers">
                <h3 :class="{green: index==question.correctAnswer, red: index==question.answer&&question.correctAnswer!=question.answer}" class="answer">{{ reponse }}</h3>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .answer {
        border: 2px solid var(--main-dark-blue);
        background-color: var(--main-gray);
        color: var(--main-dark-blue);
    }

.question{
    margin-top: 5em;
}

    .green {
        background-color: green;
    }

    .red {
        background-color: red;
    }

    div.list-quiz-answer {
        font-family: 'Montserrat';
        margin-top: 5em;
        color: var(--main-dark-blue);

    }

    .list-quiz-answer {
        width: 98vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .quiz-answer h3{
        font-weight: normal;
        padding: 0.5em;
        border-radius: 10em;
    }

    .quiz-answer h2 {
        font-weight: normal;
        text-transform: uppercase;
    }   

    .answers{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

</style>
