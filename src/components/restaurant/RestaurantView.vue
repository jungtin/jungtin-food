<template>
  <div class="container">
    <div class="row">
      <img :src="currentRestaurant.image_url" class="res-thumbnail" />
    </div>
    <div class="row" style="margin-top: -50px">
      <div class="res-info-container">
        <h6 class="text-uppercase res-info-badge">Đối tác của JUNGTIN</h6>
        <h2 class="res-info-name">{{ currentRestaurant.name }}</h2>
        <small class="text-muted">{{ currentRestaurant.description }}</small>
        <small class="mt-2 text-success"
          >Luôn luôn mở cửa nhưng chỉ bán tùy người</small
        >
      </div>
    </div>

    <div class="row mt-5">
      <h2 class="meal-section">{{ currentRestaurant.description }}</h2>

      <div class="col-12">
        <div
          v-for="(meal, i) in meals"
          :key="i"
          class="meal-container"
          @click="makeOrder(meal)"
        >
          <div class="meal-content">
            <h6>{{ meal.name }}</h6>
            <small>{{ priceFormatter(meal.price) }}đ</small>
          </div>
          <img :src="meal.image_url" class="rounded meal-img" />
        </div> <!-- end meal -->
      </div>
    </div>
  </div>
  <!-- Order Modal -->
  <RestaurantModal :meal="modalOrder"
    @closeOrderModal="modalOrder = null"
    v-if="modalOrder"/>
</template>

<script>
import * as restaurantService from "@/composables/restaurant/restaurant-service";
import * as mealService from "@/composables/meal/meal-service";

import RestaurantModal from '@/components/restaurant/RestaurantModal.vue';

import numeral from "numeral"
import { computed, ref } from 'vue';

export default {
  components: {
    RestaurantModal
  },
  setup() {
    const { currentRestaurant } = restaurantService.useRestaurantState();
    const { meals } = mealService.useMealState();

    const modalOrder = ref(null);

    const priceFormatter = (price) => {
      return numeral(price).format("0,0");
    }

    const makeOrder = function(meal) {
      this.modalOrder = meal;
    }

    return {
      currentRestaurant,
      meals,
      modalOrder,

      priceFormatter,
      makeOrder
    };
  },
};
</script>

<style scoped>
.res-thumbnail {
  width: 100%;
  height: 270px;
  object-fit: cover;
  object-position: center;
}
.res-info-container {
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  box-shadow: 5px 8px 22px -5px rgba(0, 0, 0, 0.5);
  border-radius: 7px;

  background: white;
  margin: auto;
}

.res-info-badge {
  color: #3ac5c9;
  font-weight: 700;
}

/* meal */
.meal-section {
  font-size: 1.5rem;
  padding-left: 10px;
}
.meal-container {
    border-top: 3px solid #f8f9fa;
    padding: 14px 0;

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    cursor: pointer;
}

.meal-img {
  width: 100px;
}

.meal-content {
    padding-left: 11px;
}

.meal-content h6 {
    margin-bottom: 2px !important;
}
</style>
