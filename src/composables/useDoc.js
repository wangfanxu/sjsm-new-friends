import { ref } from "vue";
import { projectFirestore } from "@/firebase/config.firebase";

const useDocument = (doc) => {
  const error = ref(null);
  const isPending = ref(null);

  const updateDoc = async (fields) => {
    error.value = null;
    isPending.value = true;

    try {
      await projectFirestore.doc(doc).update(fields);
    } catch (err) {
      error.value = "could not update document";
    } finally {
      isPending.value = false;
    }
  };

  return { error, isPending, updateDoc };
};

export default useDocument;
