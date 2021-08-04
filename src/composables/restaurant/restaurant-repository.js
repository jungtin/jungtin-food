import { restaurantsRef } from "@/scripts/firebase-config"


/* Method */
export const createRestaurant = (restaurant) =>  {
    delete restaurant.id;
    return restaurantsRef.add(restaurant);
}

export const updateRestaurant = (restaurant) =>  {
    const ref = restaurantsRef.doc(restaurant.id);
    
    delete restaurant.id;
    return ref.update(restaurant);
}

export const deleteRestaurant = (restaurant) => {
    return restaurantsRef.doc(restaurant.id).delete();
}

export const getRestaurant = restaurantId => {
    return restaurantsRef.doc(restaurantId).get();
}