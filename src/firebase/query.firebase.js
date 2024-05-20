import { projectFirestore } from "./config.firebase";

export const getUserById = async (userId) => {
  const querySnapshot = await projectFirestore
    .collection("users")
    .where("userId", "==", userId)
    .get();

  if (!querySnapshot.empty) {
    return querySnapshot.docs[0].data();
  } else {
    return null;
  }
};
