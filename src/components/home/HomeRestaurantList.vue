<template>
<div class="container">
    <div class="row">
        <div class="col-12">
            <h4>Sài gòn, hôm nay ăn gì?</h4>
            <p class="text-muted">Chọn đi anh ship?</p>
            <div v-for="(res, i) in restaurants" 
                :key="i" 
                class="restaurant-container"
                @click="chooseRestaurant(res.id)"    
            >
                <img :src="res.image_url" class="rounded restaurant-img" />
                <div class="restaurant-content">
                    <h6>{{ res.name }}</h6>
                    <small class="text-muted">{{ res.description }}</small>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    ref
} from 'vue';

import * as restaurantService from "@/composables/restaurant/restaurant-service"
import { useRoute, useRouter } from 'vue-router';


export default {
    setup() {
        const router = useRouter();
        const route = useRoute();

        const {
            restaurants
        } = restaurantService.useRestaurantState();

        const chooseRestaurant = function (id) {
            router.push({ name: "restaurant", params: {id: id}});
        };

        return {
            restaurants,

            chooseRestaurant,
        };
    },
};
</script>

<style scoped>
.restaurant-container {
    border-top: 3px solid #f8f9fa;
    padding: 14px 0;

    display: flex;
    flex-direction: row;

    cursor: pointer;
}

.restaurant-img {
    width: 100px;
}

.restaurant-content {
    padding-left: 11px;
}

.restaurant-content h6 {
    margin-bottom: 2px !important;
}
</style>
