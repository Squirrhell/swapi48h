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
  <!--div v-for="question in store.state.listQuiz"-->
  <div v-for="question in listTest">
    <h2>{{ question.Q }}</h2>
    <template v-for="(reponse, index) in question.R">
    <h3 :class="{green: index==question.C, red: index==question.A&&question.C!=question.A}">{{ reponse }}</h3>
    </template>

  </div>
</template>

<style scoped>

    .green {
        background-color: green;
    }

    .red {
        background-color: red;
    }
</style>
