<template>
  <div class="home">
    <div v-if="error" class="error">Could not fetch the data from system</div>

    <div v-if="documents">
      <h1>待接受慕道友</h1>
      <div v-for="doc in documents" :key="doc.id">
        <div class="single">
          <div class="thumbnail">
            <h3>{{ doc.displayName }}</h3>
          </div>
          <div class="info">
            <p>性别： {{ doc.gender === "male" ? "男" : "女" }}</p>
            <p>联系方式： {{ doc.contactNumber }}</p>
            <p>注册时间: {{ convertedTimestamp(doc.createdAt) }}</p>
          </div>
          <div class="accept">
            <button style="margin-left: 10px" @click="handleAccept(doc.id)">
              接收
            </button>
            <button v-if="isCancelAllowed(doc)" @click="handleCancel(doc.id)">
              撤销接受
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>所有慕道友均已被接受</div>
  </div>
</template>

<script>
import getCollection from "@/composables/getCollection";
import useDocument from "@/composables/useDoc";
import getUser from "@/composables/getUser";
import { timestamp } from "@/firebase/config.firebase";
export default {
  name: "Home",
  setup() {
    //if not login, redirect to login page
    const { user } = getUser();

    const convertedTimestamp = (firebaseTimestamp) => {
      return firebaseTimestamp.toDate().toLocaleDateString();
    };
    const { error, documents } = getCollection(
      "seekers",
      "receptionistId",
      null
    );

    const isCancelAllowed = ({ userName }) => {
      return user.value?.displayName === userName;
    };
    const handleAccept = async (documentId) => {
      const { updateDoc } = useDocument(`/seekers/${documentId}`);
      await updateDoc({
        receptionistId: user.value.uid,
        updatedAt: timestamp(),
        receptionistName: user.value.displayName,
      });
    };

    const handleCancel = async (documentId) => {
      const { updateDoc } = useDocument(`/seekers/${documentId}`);
      await updateDoc({
        receptionistId: null,
        updatedAt: timestamp(),
      });
    };

    return {
      error,
      documents,
      handleAccept,
      isCancelAllowed,
      handleCancel,
      convertedTimestamp,
    };
  },
};
</script>

<style scoped>
.single {
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  background: white;
  margin: 16px 0;
  transition: all ease 0.2s;
}
.single:hover {
  box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.05);
  transform: scale(1.02);
  transition: all ease 0.2s;
}
.thumbnail {
  max-width: 100px;
  max-height: 100px;
  overflow: hidden;
  border-radius: 10px;
}
img {
  max-width: 150%;
  max-height: 150%;
  display: block;
}
.info {
  margin: 0 30px;
}
.accept {
  display: flex;
  margin-left: auto;
}
</style>
