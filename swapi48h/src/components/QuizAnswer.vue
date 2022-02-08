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
<div class="question">
  <div v-for="question in store.state.listQuiz">
  <!-- <div v-for="question in listTest"> -->
    <h2>{{ question.question }}</h2>
    <template v-for="(reponse, index) in question.answers">
    <h3 :class="{green: index==question.correctAnswer, red: index==question.answer&&question.correctAnswer!=question.answer}">{{ reponse }}</h3>
    </template>
  </div>
</div>
</template>

<style scoped>

.question{
    margin-top: 5em;
}

    .green {
        background-color: green;
    }

    .red {
        background-color: red;
    }
</style>
