import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import Theme from "./components/Theme.vue";
import Wiki from "./components/Wiki.vue";
import Quiz from "./components/Quiz.vue";

const notFound = { template: '<div>Error 404</div>' };

const routes = [
    { 
        path: '/Home' , 
        name: 'Home', 
        component: Home
    },
    { 
        path: '/Theme', 
        name: 'Theme', 
        component: Theme
    },
    {
        path: '/Wiki',
        name: 'Wiki',
        component: Wiki
    },
    {
        path: '/Quiz',
        name: 'Quiz',
        component: Quiz
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

// npm install vue-router@4