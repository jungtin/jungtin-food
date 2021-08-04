import {
    computed,
    reactive,
    ref,
} from "vue";
import $ from "jquery"

// import { useToast, RESTAURANT } from "@/composables/toast"
import * as restaurantRepository from "@/composables/restaurant/restaurant-repository"
import { getSyncFirestore } from "@/scripts/firebase-config"

// const { addToast } = useToast();


// export const MODAL_STATE = {
//     CREATE: 'create',
//     UPDATE: 'update'
// }

/* STATE */
// const modalStatus = ref([MODAL_STATE.CREATE]);
const restaurants = ref([]);
const currentRestaurant = ref(null);

export const useRestaurantState = function() {
    return {
        currentRestaurant: computed(() => currentRestaurant.value),
        restaurants: computed(() => restaurants.value),
        // modalStatus: computed(() => modalStatus.value)
    }
}

// export const modalData = reactive({
//     id: null,
//     name: null,
//     description: null,
// });



// /* Computed */
// export const modalAttrs = computed(function () {
//     const title = {
//         [MODAL_STATE.CREATE]: "Create",
//         [MODAL_STATE.UPDATE]: "Update",
//     }

//     const classes = {
//         [MODAL_STATE.CREATE]: "btn-success",
//         [MODAL_STATE.UPDATE]: "btn-warning",
//     }

//     const clickEvent = {
//         [MODAL_STATE.CREATE]: handleCreateRestaurant,
//         [MODAL_STATE.UPDATE]: handleUpdateRestaurant,
//     }

//     return {
//         title: title[modalStatus.value],
//         classes: classes[modalStatus.value],
//         clickEvent: clickEvent[modalStatus.value],
//     }
// })

// /* Method */
// export const openModal = ({
//     restaurant,
//     state
// }) => {
//     if (state === MODAL_STATE.CREATE) {
//         modalData.id = null;
//         modalData.name = null;
//         modalData.description = null;
//     } else if (state === MODAL_STATE.UPDATE) {
//         modalData.id = restaurant.id;
//         modalData.name = restaurant.name;
//         modalData.description = restaurant.description;
//     }

//     modalStatus.value = state;
//     $('#modal-restaurant').modal('show')
// }


// export const handleCreateRestaurant = function() {
//     restaurantRepository.createRestaurant({...modalData}).then(res => {
//         addToast(RESTAURANT.CREATE.SUCCESS); // notify
//     }).catch(err => {
//         console.error(err);
//         addToast(RESTAURANT.CREATE.FAIL); // notify
//     })

//     $("#modal-restaurant").modal('hide')
// }

// export const handleUpdateRestaurant = function() {
//     restaurantRepository.updateRestaurant({...modalData}).then(res => {
//         addToast(RESTAURANT.UPDATE.SUCCESS); // notify
//     }).catch(err => {
//         console.error(err);
//         addToast(RESTAURANT.UPDATE.FAIL); // notify
//     })
    
//     $("#modal-restaurant").modal('hide')
// }

// export const handleDeleteRestaurant = function(restaurant) {
//     if(!confirm(`Are you really want to remove [${restaurant.name}] restaurant ?`))
//             return;

//     restaurantRepository.deleteRestaurant(restaurant).then(res => {
//         addToast(RESTAURANT.DELETE.SUCCESS); //notify
//     }).catch(err => {
//         console.error(err);
//         addToast(RESTAURANT.DELETE.FAIL); // notify
//     })
// }



export const fetchDetailRestaurant = async (id) => {
    try {
        
        const snap = await restaurantRepository.getRestaurant(id);
        const restaurant = {
            id: snap.id,
            ...snap.data()
        }

        currentRestaurant.value = restaurant;
    } catch(err) {
        console.log(err);
    }
}

export const fetchRestaurants = (ref) => {
    restaurants.value = [];
    getSyncFirestore(ref, restaurants.value);
}