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
<<<<<<< HEAD
      selectedTheme: "planets",
=======
      selectedTheme: 'planets',
>>>>>>> 344134f5c46ab0132690ad67bb11ff0939525391

    },
    mutations: {
      addQuestionQuiz: (state, newQuestion) => {state.listQuiz.push(newQuestion)},
      throwQuestionQuiz: (state) => {state.listQuiz = []},
      setSelectedTheme: (state, newTheme) => {state.selectedTheme = newTheme},

    }
})

export default store;

// npm install vuex@next -- save