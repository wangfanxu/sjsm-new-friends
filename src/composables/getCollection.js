import { ref, watchEffect } from "vue";
import { projectFirestore } from "@/firebase/config.firebase";

const getCollection = (collection, filter = "", value = "") => {
  const documents = ref(null);
  const error = ref(null);

  //register the firestore collection reference
  let collectionRef = projectFirestore.collection(collection);

  if (filter) {
    collectionRef = collectionRef.where(filter, "==", value);
  }
  collectionRef = collectionRef.orderBy("createdAt");

  const unsub = collectionRef.onSnapshot(
    (snap) => {
      let results = [];

      //must wait for teh server to create the timestamp & send it back
      snap.docs.forEach((doc) => {
        doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
      });
      documents.value = results;
      error.value = null;
    },
    (err) => {
      document.value = null;
      error.value = "could not fetch the data";
    }
  );

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { error, documents };
};

export default getCollection;
