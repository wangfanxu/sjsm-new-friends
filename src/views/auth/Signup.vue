<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <!-- 输入框等其他表单元素 -->
      <input type="text" placeholder="Display Name" v-model="displayName" />
      <input type="email" placeholder="Email Address" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" />
      <div v-if="error" class="error">{{ error }}</div>
      <button v-if="!isPending">Sign up</button>
      <button v-if="isPending" disabled>Loading</button>
    </form>

    <!-- Google 注册按钮 -->
    <button v-on:click.prevent="handleGoogleSignUp" v-if="!isPending">Sign up with Google</button>
  </div>
</template>

<script>
import useSignup from "@/composables/useSignup";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { ref } from "vue";

export default {
  setup() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const { error, signup, isPending } = useSignup();

    const email = ref("");
    const password = ref("");
    const displayName = ref("");

    const handleSubmit = async () => {
      const res = await signup(email.value, password.value, displayName.value);

      // 处理成功注册逻辑
      if (!error.value) {
        console.log("User sign up success");
      }
    };

    const handleGoogleSignUp = async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log("Google sign up success:", user);
      } catch (error) {
        console.error("Google sign up error:", error.message);
      }
    };

    return { email, password, displayName, isPending, error, handleSubmit, handleGoogleSignUp };
  },
};
</script>

<style>
/* Add your CSS styles here */
</style>
