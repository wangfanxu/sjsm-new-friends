<template>
  <form @submit.prevent="handleSubmit">
    <h3>Sign up</h3>
    <input type="text" placeholder="姓名" v-model="displayName" required />
    <select v-model="gender" placeholder="性别" required>
      <option value="male">男</option>
      <option value="female">女</option>
    </select>
    <input required placeholder="联系方式" v-model="contactNumber" />
    <input type="email" placeholder="邮箱" v-model="email" required />
    <input type="password" placeholder="密码" v-model="password" required />
    <input placeholder="推荐码" v-model="referralCode" required />
    {{ referralCode }} test

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
    const router = useRouter();

    const { error, signup, isPending } = useSignup();

    const email = ref("");
    const password = ref("");
    const displayName = ref("");
    const gender = ref("male");
    const contactNumber = ref();
    const referralCode = ref("");

    const getReferralCode = async () => {
      //validate referral code
      return (await getDoc("/adminSettings/settings")).referralCode;
    };
    const handleSubmit = async () => {
      let roleType = "seekers";
      if (referralCode) {
        console.log("referralCode", referralCode);
        const { adminReferralCode, referralCode } = await getReferralCode();
        console.log("code", code);
        console.log("input", referralCode);
        if (code !== adminReferralCode && code !== referralCode) {
          alert("invalid code");
          return;
        }
        roleType = code === adminReferralCode ? "admin" : "receptionists";
      }

      await signup(
        email.value,
        password.value,
        {
          displayName: displayName.value,
          gender: gender.value,
          contactNumber: contactNumber.value,
        },
        roleType
      );

      //success sign up
      if (!error.value) {
        router.push({ name: "home" });
      }
    };
    return {
      email,
      password,
      displayName,
      isPending,
      error,
      handleSubmit,
      referralCode,
      gender,
      contactNumber,
    };
  },
};
</script>
<style lang=""></style>
