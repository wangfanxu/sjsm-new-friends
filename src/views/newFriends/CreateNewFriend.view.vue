<template>
  <form @submit.prevent="handleSubmit()">
    <h4>新朋友信息</h4>
    <input type="text" placeholder="姓名" v-model="name" required />
    <select v-model="gender" placeholder="性别" required>
      <option value="male">男</option>
      <option value="female">女</option>
    </select>
    <input type="text" placeholder="联系方式" v-model="contact" required />
    <textarea placeholder="额外讯息" v-model="extraInformation"></textarea>
    <div class="error"></div>
    <button>创建</button>
  </form>
</template>
<script>
import { ref } from "vue";
import useCollection from "@/composables/useCollection";
import { timestamp } from "@/firebase/config.firebase";
import { useRouter } from "vue-router";
export default {
  setup() {
    const { error, addDoc } = useCollection("seekers");

    const router = useRouter();

    const name = ref("");
    const gender = ref("");
    const contact = ref("");
    const recommender = ref("");
    const extraInformation = ref("");

    const handleSubmit = async () => {
      await addDoc({
        displayName: name.value,
        gender: gender.value,
        contactNumber: contact.value,
        extraInformation: extraInformation.value,
        createdAt: timestamp(),
      });
      if (!error.value) {
        alert("creation success!");
        router.push({ name: "home" });
      }
    };

    return {
      name,
      gender,
      contact,
      recommender,
      extraInformation,
      handleSubmit,
    };
  },
};
</script>
<style lang=""></style>
