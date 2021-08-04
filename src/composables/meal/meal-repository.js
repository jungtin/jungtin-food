import { mealsRef } from "@/scripts/firebase-config"


/* Method */
export const createMeal = (meal) =>  {
    delete meal.id;
    return mealsRef.add(meal);
}

export const updateMeal = (meal) =>  {
    const ref = mealsRef.doc(meal.id);
    
    delete meal.id;
    return ref.update(meal);
}

export const deleteMeal = (meal) => {
    return mealsRef.doc(meal.id).delete();
}

export const getMeal = mealId => {
    return mealsRef.doc(mealId).get();
}