import { createRouter, createWebHistory } from 'vue-router'
import nProgress from 'nprogress'

import HomeView from '@/components/home/HomeView.vue';
import RestaurantView from '@/components/restaurant/RestaurantView.vue';
import MonanhView from '@/components/monanh/MonanhView.vue';

import * as restaurantService from "@/composables/restaurant/restaurant-service"
import * as mealService from "@/composables/meal/meal-service"
import { restaurantsRef, mealsRef } from "@/scripts/firebase-config"

const routes = [
    { 
        name: "home",
        path: '/', 
        component: HomeView,
        beforeEnter: (to, from, next) => {

            restaurantService.fetchRestaurants(restaurantsRef);
            next();
        },
        // alias: ["/"]
    },
    {
        name: "restaurant",
        path: "/restaurants/:id",
        component: RestaurantView,
        beforeEnter: async(to, from, next) => {
            const restaurantId = to.params.id;

            const ref = mealsRef(restaurantId);
            mealService.fetchMeals(ref);
            try {
                await restaurantService.fetchDetailRestaurant(restaurantId);
                next();
            } catch (err) {
                console.log(err);
            }
        }
    },
    {
        name: "mon-anh",
        path: "/mon-anh",
        component: MonanhView,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    nProgress.start();
    next();
})

router.afterEach((to, from, next) => {
    nProgress.done();
})

export default router