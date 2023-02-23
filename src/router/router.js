import Congratulation from "@/pages/Сongratulation";
import Exchanger from "@/pages/Exchanger";
import ErrorPath from "@/pages/ErrorPath";
import {createRouter, createWebHistory} from "vue-router";
import {ROUTES_NAME} from "@/constants/path-constants";


const routes = [
    {
        path: '/congratulation',
        name: ROUTES_NAME.congratulation,
        component: Congratulation
    },
    {
        path: '/',
        name: ROUTES_NAME.exchanger,
        component: Exchanger
    },
    {
        path: '/:pathMatch(.*)*',
        name: ROUTES_NAME.error,
        component: ErrorPath
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL),
})

export default router;
