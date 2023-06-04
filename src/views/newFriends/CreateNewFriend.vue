<template>
  <form @submit.prevent="handleSubmit()">
    <h4>新朋友信息</h4>
    <input type="text" required placeholder="姓名" v-model="name" />
    <select v-model="gender">
      <option value="male">男</option>
      <option value="female">女</option>
    </select>
    <input type="number" required placeholder="联系方式" v-model="contact" />
    <input type="text" placeholder="介绍人" v-model="recommender" />
    <textarea placeholder="额外讯息" v-model="extraInformation"></textarea>
    <div class="error"></div>
    <button>创建</button>
  </form>
</template>
<script>
import { ref } from "vue";
import useCollection from "@/composables/useCollection";
import { timestamp } from "@/firebase/config";
import { useRouter } from "vue-router";
export default {
  setup() {
    const { error, addDoc } = useCollection("newfriends");

    const router = useRouter();

    const name = ref("");
    const gender = ref("");
    const contact = ref("");
    const recommender = ref("");
    const extraInformation = ref("");
    const isCreationSuccess = ref(false);

    const handleSubmit = async () => {
      await addDoc({
        name: name.value,
        gender: gender.value,
        contact: contact.value,
        recommender: recommender.value,
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
