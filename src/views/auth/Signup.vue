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
    <input placeholder="推荐码" v-model="inputReferralCode" required />

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
    const inputReferralCode = ref("");

    const getReferralCode = async () => {
      //validate referral code
      return await getDoc("/adminSettings/settings");
    };
    const handleSubmit = async () => {
      let roleType = "receptionists";

      const { adminReferralCode, referralCode } = await getReferralCode();
      console.log(adminReferralCode, referralCode);
      if (
        inputReferralCode.value !== adminReferralCode &&
        inputReferralCode.value !== referralCode
      ) {
        alert("invalid code");
        return;
      }
      roleType =
        inputReferralCode.value === adminReferralCode
          ? "admins"
          : "receptionists";

      console.log("roleTYpe", roleType);
      await signup(
        email.value,
        password.value,
        {
          displayName: displayName.value,
          gender: gender.value,
          contactNumber: contactNumber.value,
          userType: roleType,
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
      inputReferralCode,
      gender,
      contactNumber,
    };
  },
};
</script>
<style lang=""></style>
