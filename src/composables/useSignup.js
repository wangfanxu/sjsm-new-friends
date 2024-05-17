import { ref } from "vue";
import { projectAuth } from "@/firebase/config.firebase";
import useCollection from "./useCollection";

const error = ref(null);
const isPending = ref(false);
const signup = async (email, password, displayName) => {
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
      res.user.updateProfile({ displayName }),
      useCollection("users").addDoc({
        name: displayName,
        email,
        userType: "seeker",
        createdAt: Date.now(),
        //contactNumber
        //gender
      }),
      useCollection("seekers").addDoc({
        name: displayName,
        email,
        createdAt: Date.now(),
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
