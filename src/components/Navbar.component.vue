<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/SJSM_logo.png" />
      <h1><router-link :to="{ name: 'home' }">SJSM</router-link></h1>
      <div class="links">
        <div v-if="user">
          <button @click="handleClick()">登出</button>
          <router-link class="btn" :to="{ name: 'CreateNewFriend' }"
            >添加慕道友</router-link
          >
          <router-link class="btn" :to="{ name: 'ManageNewFriend' }"
            >管理员</router-link
          >
        </div>
        <div v-else>
          <router-link class="btn" :to="{ name: 'Signup' }">创建</router-link>
          <router-link class="btn" :to="{ name: 'Login' }">登录</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
import useLogout from "@/composables/useLogout";
import getUser from "@/composables/getUser";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { logout } = useLogout();
    const { user } = getUser();
    const router = useRouter();

    const handleClick = async () => {
      await logout();
      router.push({ name: "Login" });
    };

    return { handleClick, user };
  },
};
</script>
<style scoped>
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background: white;
}
nav {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

nav h1 {
  margin-left: 20px;
}

/* push all the items in the link to the right */
nav .links {
  margin-left: auto;
}

nav .links a,
button {
  margin-left: 16px;
  font-size: 14px;
}

nav img {
  max-height: 60px;
}
</style>
