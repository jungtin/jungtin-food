import {
    computed,
    reactive,
    ref,
} from "vue";
import $ from "jquery"

// import { useToast, MEAL } from "@/composables/toast"
import * as mealRepository from "@/composables/meal/meal-repository"
import { getSyncFirestore } from "@/scripts/firebase-config"

// const { addToast } = useToast();


// export const MODAL_STATE = {
//     CREATE: 'create',
//     UPDATE: 'update'
// }

/* STATE */
// const modalStatus = ref([MODAL_STATE.CREATE]);
const meals = ref([]);
// const currentMeal = ref(null);

export const useMealState = function() {
    return {
        // currentMeal: computed(() => currentMeal.value),
        meals: computed(() => meals.value),
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
//         [MODAL_STATE.CREATE]: handleCreateMeal,
//         [MODAL_STATE.UPDATE]: handleUpdateMeal,
//     }

//     return {
//         title: title[modalStatus.value],
//         classes: classes[modalStatus.value],
//         clickEvent: clickEvent[modalStatus.value],
//     }
// })

// /* Method */
// export const openModal = ({
//     meal,
//     state
// }) => {
//     if (state === MODAL_STATE.CREATE) {
//         modalData.id = null;
//         modalData.name = null;
//         modalData.description = null;
//     } else if (state === MODAL_STATE.UPDATE) {
//         modalData.id = meal.id;
//         modalData.name = meal.name;
//         modalData.description = meal.description;
//     }

//     modalStatus.value = state;
//     $('#modal-meal').modal('show')
// }


// export const handleCreateMeal = function() {
//     mealRepository.createMeal({...modalData}).then(res => {
//         addToast(MEAL.CREATE.SUCCESS); // notify
//     }).catch(err => {
//         console.error(err);
//         addToast(MEAL.CREATE.FAIL); // notify
//     })

//     $("#modal-meal").modal('hide')
// }

// export const handleUpdateMeal = function() {
//     mealRepository.updateMeal({...modalData}).then(res => {
//         addToast(MEAL.UPDATE.SUCCESS); // notify
//     }).catch(err => {
//         console.error(err);
//         addToast(MEAL.UPDATE.FAIL); // notify
//     })
    
//     $("#modal-meal").modal('hide')
// }

// export const handleDeleteMeal = function(meal) {
//     if(!confirm(`Are you really want to remove [${meal.name}] meal ?`))
//             return;

//     mealRepository.deleteMeal(meal).then(res => {
//         addToast(MEAL.DELETE.SUCCESS); //notify
//     }).catch(err => {
//         console.error(err);
//         addToast(MEAL.DELETE.FAIL); // notify
//     })
// }



// export const fetchDetailMeal = async (id) => {
//     try {
        
//         const snap = await mealRepository.getMeal(id);
//         const meal = {
//             id: snap.id,
//             ...snap.data()
//         }

//         currentMeal.value = meal;
//     } catch(err) {
//         console.log(err);
//     }
// }

export const fetchMeals = (ref) => {
    meals.value = [];
    getSyncFirestore(ref, meals.value);
}