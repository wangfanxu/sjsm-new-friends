<template>
  <form @submit.prevent="handleSubmit">
    <h3>Sign up</h3>
    <input type="text" placeholder="姓名" v-model="displayName" />
    <select v-model="gender" placeholder="性别">
      <option value="male">男</option>
      <option value="female">女</option>
    </select>
    <input
      type="number"
      required
      placeholder="联系方式"
      v-model="contactNumber"
    />
    <input type="email" placeholder="邮箱" v-model="email" />
    <input type="password" placeholder="密码" v-model="password" />
    <input
      type="password"
      placeholder="推荐码（仅供SJSM内部人士填写）"
      v-model="referralCode"
    />

    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isPending">Sign up</button>
    <button v-if="isPending" disabled>Loading</button>
  </form>
</template>
<script>
import useSignup from "@/composables/useSignup";
import { ref } from "vue";
import { useRouter } from "vue-router";
import getDoc from "@/composables/getDoc";
export default {
  setup() {
    const { error, signup, isPending } = useSignup();

    const email = ref("");
    const password = ref("");
    const displayName = ref("");
    const gender = ref("male");
    const contactNumber = ref();
    const referralCode = ref("");

    const validateReferralCode = async () => {
      //validate referral code
      const documentData = await getDoc("/adminSettings/settings");
      console.log("documentData", documentData);
    };
    const handleSubmit = async () => {
      let isValidReferralCode = false;
      if (referralCode) await validateReferralCode();

      await signup(email.value, password.value, displayName.value);

      //success sign up
      if (!error.value) {
        console.log("user sign up success");
        const router = useRouter();
        router.push({ name: "home" });
      }
      //redirect to home page
    };
    return { email, password, displayName, isPending, error, handleSubmit };
  },
};
</script>
<style lang=""></style>
