import {RouteRecordRaw} from "vue-router"

const routes: Array<RouteRecordRaw> = [{
    path: "/",
    name: "default",
    redirect: "/date_calc"
},

    {
        path: "/date_calc",
        name: "date_calc",
        component: () => import("@/views/date_calc/index.vue"),

    },




    {
        path: "/:pathMatch(.*)*",
        redirect: {name: "error_page"}
    },

]

export default routes
