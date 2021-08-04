<template>
	<HomeNavbar />
	<HomeCarousel />
	<HomeCategory />

	<AppPageBreaker />
	<HomeRestaurantList />

	<!-- <HomeModal v-if="isNew"></HomeModal> -->
</template>

<script>
import HomeModal from "@/components/home/HomeModal.vue";
import HomeNavbar from "@/components/home/HomeNavbar.vue";
import HomeCarousel from "@/components/home/HomeCarousel.vue";
import HomeCategory from "@/components/home/HomeCategory.vue";
import HomeRestaurantList from "@/components/home/HomeRestaurantList.vue";
import AppPageBreaker from "@/components/ui/AppPageBreaker.vue";

import { isNew } from "@/composables/category";

export default {
	components: {
		HomeModal,
		HomeNavbar,
		HomeCarousel,
		HomeCategory,
		HomeRestaurantList,
		AppPageBreaker,
	},
	setup() {
		return {
			isNew,
		};
	},
};
</script>

<style></style>
