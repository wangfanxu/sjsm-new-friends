import { projectFirestore } from "@/firebase/config.firebase";

const getDoc = async (docPath) => {
  //register the firestore collection reference
  try {
    const documentData = await projectFirestore.doc(docPath).get();
    return {
      id: documentData.id,
      ref: documentData.ref,
      ...documentData.data(),
    };
  } catch (e) {
    throw Error("error to get document", e);
  }
};

export default getDoc;
