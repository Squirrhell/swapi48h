import { createStore } from "vuex";

const store = createStore({
    state: {
      listQuiz: [
        /*
        {
          Q: 'laQuestion',
          R: ['reponse1','reponse2','reponse3','reponse4'],
          C: number, //en fonciton de R
          A: number, //reponse de la personne
        }
        */
      ],
      selectedTheme: 'planets',
      selectedItem: 'https://swapi.dev/api/planets/1/'

    },
    mutations: {
      addQuestionQuiz: (state, newQuestion) => {state.listQuiz.push(newQuestion)},
      throwQuestionQuiz: (state) => {state.listQuiz = []},
      setSelectedTheme: (state, newTheme) => {state.selectedTheme = newTheme},
      setSelectedItem: (state, newItem) => {state.selectedItem = newItem},

    }
})

export default store;

// npm install vuex@next -- save