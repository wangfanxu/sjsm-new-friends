import { ref } from "vue";
import { projectFirestore } from "@/firebase/config.firebase";

const useCollection = (collection) => {
  const error = ref(null);
  const isPending = ref(false);
  //add a new document
  const addDoc = async (doc) => {
    error.value = null;
    isPending.value = true;

    const query = projectFirestore.collection(collection).add(doc);

    try {
      await query;
    } catch (err) {
      error.value = "could not add the document";
    } finally {
      isPending.value = false;
    }
  };

  return { error, addDoc, isPending };
};

export default useCollection;
