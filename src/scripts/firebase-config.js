import firebase from "firebase/app"

import "firebase/auth"
import 'firebase/firestore'

const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: "AIzaSyBtAAljWL0On1koIDLBqhyqcpN0g4RVN8Y",
  authDomain: "jungtin-food.firebaseapp.com",
  projectId: "jungtin-food",
  storageBucket: "jungtin-food.appspot.com",
  messagingSenderId: "143449108683",
  appId: "1:143449108683:web:d2c5c0e5e1662489376b4e",
  measurementId: "G-YKH7D5VZPX"
};

firebase.initializeApp(config);




// export const auth = firebase.auth();
export const db = firebase.firestore()


export const restaurantsRef = db.collection("restaurants");
export const mealsRef = function(restaurantId) {
  return db.collection("restaurants").doc(restaurantId).collection("meals");
}
// export const questionsRef = function(courseId, chapterId) {
//   return db.collection("courses").doc(courseId).collection("chapters").doc(chapterId).collection("questions");
// }


export const getSyncFirestore = (collection, data) => {

  const unsubscribe = collection.onSnapshot(ref => {
      ref.docChanges().forEach((change) => {
        const { newIndex, oldIndex, doc, type } = change;
        if (type === "added") {
          data.splice(newIndex, 0, { id: doc.id, ...doc.data() }); // add
        } else if (type === "modified") {
          data.splice(oldIndex, 1); // remove old
          data.splice(newIndex, 0, { id: doc.id, ...doc.data() }); // add new
        } else if (type === "removed") {
          data.splice(oldIndex, 1); // remove
        }
      });
    },
    function (err) {
      console.log(err);
    });
  return unsubscribe;
};