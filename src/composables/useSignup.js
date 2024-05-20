import { ref } from "vue";
import { projectAuth } from "@/firebase/config.firebase";
import useCollection from "./useCollection";
import { timestamp } from "@/firebase/config.firebase";

const error = ref(null);
const isPending = ref(false);
const signup = async (email, password, data, roleType) => {
  error.value = null;
  isPending.value = true;
  try {
    const res = await projectAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    if (!res) {
      throw new Error("Could not complete signup");
    }

    const promises = [
      res.user.updateProfile({ displayName: data.displayName }),
      useCollection("users").addDoc({
        email,
        ...data,
        createdAt: timestamp(),
      }),
      useCollection(`${roleType}`).addDoc({
        ...data,
        email,
        createdAt: timestamp(),
      }),
    ];

    await Promise.all(promises);

    error.value = null;
    return res;
  } catch (err) {
    console.log(err.message);
    error.value = err.message;
  } finally {
   isPending.value = false;
  }
};

const useSignup = () => {
  return { error, signup, isPending };
};

export default useSignup;
