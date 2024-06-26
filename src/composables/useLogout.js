import { ref } from "vue";
import { projectAuth } from "@/firebase/config.firebase";

const error = ref(null);
const isPending = ref(false);
//logout function

const logout = async () => {
  error.value = null;

  isPending.value = true;
  try {
    await projectAuth.signOut();
  } catch (err) {
    error.value = err.message;
  } finally {
    isPending.value = false;
  }
};

const useLogout = () => {
  return { error, logout,isPending };
};

export default useLogout;
